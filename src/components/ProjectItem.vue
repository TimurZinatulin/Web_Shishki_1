<template>
  <div class="project-item">
    <h3 class="title">{{ data.title }}</h3>
    <div class="close" v-if="edit" @click="$emit('deleteItem', data.id)">
      <svg
        fill="white"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 460.775 460.775"
        xml:space="preserve"
      >
        <path
          d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
        />
      </svg>
    </div>
    <div class="image">
      <div
        class="image__rating"
        @click="
          isFavourite ? removeFromFavourite(data.id) : addToFavourite(data.id)
        "
      >
        <img
          :src="
            getLocalUrl(
              `../assets/images/like-icon${isFavourite ? '-green' : ''}.svg`
            )
          "
          alt=""
          class="image__rating-icon"
        />
        <span class="image__rating-count">{{ formattedRating }}</span>
      </div>
      <router-link :to="`/projects/${data.id}`">
        <img
          :src="
            getLocalUrl(
              data.preview_img_url
                ? data.preview_img_url
                : `../assets/images/no-image.jpg`
            )
          "
          alt=""
        />
      </router-link>
    </div>
    <p class="text">{{ data.description }}</p>
  </div>
</template>

<script>
import Button from "@/components/UI/Button.vue";
import { supabase } from "@/utils/supabase";
import { toast } from "vue3-toastify";

export default {
  props: ["data", "edit"],
  components: {
    Button,
  },
  mounted() {
    console.log(this.data);
  },
  data() {
    return {};
  },
  computed: {
    formattedRating() {
      return this.data.rating
        ? "0".repeat(4 - this.data.rating.toString().length) + this.data.rating
        : "0000";
    },
    isFavourite() {
      return !!this.data?.favourite_id;
    },
  },
  emits: ["triggerFetch", "deleteItem"],
  methods: {
    getLocalUrl(path) {
      if (path.startsWith("/")) path = path.substring(1);
      return new URL(path, import.meta.url).href;
    },
    async addToFavourite(id) {
      const user = this.$store.state.user;

      if (!user)
        this.$router.push({
          path: "/login",
        });

      const { data: favouriteData } = await supabase
        .from("favourites")
        .select("id")
        .eq("project_id", id);

      if (favouriteData.length) {
        throw "error";
      }

      await supabase.from("favourites").insert({
        project_id: id,
        user_id: user.id,
      });

      await supabase
        .from("projects")
        .update({
          rating: this.data.rating + 1,
        })
        .eq("id", id);

      // const { data } = await supabase
      //   .from("projects")
      //   .select("rating")
      //   .eq("id", id)
      //   .single();

      // console.log(data, rating);

      this.$emit("triggerFetch");

      toast.success("Проект успешно добавлен в избранное!");
    },
    async removeFromFavourite(id) {
      const user = this.$store.state.user;

      if (!user)
        this.$router.push({
          path: "/login",
        });

      await supabase.from("favourites").delete().eq("project_id", id);

      await supabase
        .from("projects")
        .update({
          rating: Math.max(this.data.rating - 1, 0),
        })
        .eq("id", id);

      this.$emit("triggerFetch");
      toast.success("Проект успешно удален из избранного!");
    },
  },
};
</script>

<style lang="scss" scoped>
.project-item {
  background: linear-gradient(148.66deg, #ff6856 0%, #6f00ff 100%);
  border-radius: 30px;
  padding: 10px;
  position: relative;

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }

  .title {
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
  }

  .text {
    font-weight: 600;
    color: #fff;
    text-align: center;
  }

  .image {
    position: relative;
    margin-bottom: 10px;

    a {
      display: inline-block;
      width: 100%;

      img {
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
        border-radius: 30px;
        width: 100%;
      }
    }

    &__rating {
      position: absolute;
      top: 20px;
      left: 20px;
      border-radius: 30px;
      background: $orange;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      &-count {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
}
</style>
