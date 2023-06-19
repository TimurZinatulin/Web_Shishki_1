<template>
  <section class="project">
    <div class="project__intro">
      <div class="container">
        <img
          :src="project.preview_img_url"
          alt=""
          class="project__intro-image"
        />
        <div class="project__intro-content">
          <div class="project__intro-info">
            <h1>{{ project.title }}</h1>
            <p>{{ project.description }}</p>
            <router-link
              :to="`/profiles/${user.id}`"
              class="project__intro-user"
            >
              <img :src="user.avatar_image_url" alt="" />
              <span>{{ user.full_name || user.email }}</span>
            </router-link>
          </div>
          <div class="project__intro-controls">
            <div
              class="project__intro-rating"
              @click="isFavourite ? removeFromFavourite() : addToFavourite()"
            >
              <img
                :src="
                  getLocalUrl(
                    `../assets/images/like-icon${
                      isFavourite ? '-green' : ''
                    }.svg`
                  )
                "
                alt=""
                class="image__rating-icon"
              />
              <span>{{ formattedRating }}</span>
            </div>
            <Button :to="project.link">Перейти</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="project__images">
      <div class="container">
        <img
          :src="item"
          alt=""
          class="project__images-item"
          v-for="(item, i) of project.main_img_url"
          :key="i"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { supabase } from "@/utils/supabase";
import Button from "@/components/UI/Button.vue";
import { toast } from "vue3-toastify";
import { v4 as uuidv4 } from "uuid";

export default {
  async mounted() {
    const user = this.$store.state.user;

    console.log(user.id);
    await this.fetchProject();
    await this.getOwner();

    if (user) {
      await this.fetchFavourite();
    }
  },
  computed: {
    formattedRating() {
      return this.project.rating
        ? "0".repeat(4 - this.project.rating.toString().length) +
            this.project.rating
        : "0000";
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      project: {},
      user: {},
      isFavourite: false,
    };
  },
  methods: {
    getLocalUrl(path) {
      if (path.startsWith("/")) path = path.substring(1);
      return new URL(path, import.meta.url).href;
    },
    async fetchFavourite() {
      const { data } = await supabase
        .from("favourites")
        .select("project_id")
        .eq("project_id", this.$route.params.id)
        .eq("user_id", this.$store.state.user.id);

      this.isFavourite = !!data.length;
    },
    async fetchProject() {
      try {
        const { data } = await supabase
          .from("projects")
          .select(
            "title, description, user_id, id, preview_img_url, main_img_url, rating, link"
          )
          .eq("id", this.$route.params.id)
          .single();

        data.main_img_url = data.main_img_url.split(";");

        this.project = data;
      } catch (e) {
        this.$router.push({
          path: "/login",
        });
      }
    },
    async getOwner() {
      const id = this.project.user_id;

      const { data } = await supabase
        .from("profiles")
        .select("id, avatar_image_url, email, full_name")
        .eq("id", id)
        .single();

      console.log(data);

      this.user = data;
    },
    async addToFavourite() {
      const id = this.$route.params.id;
      const user = this.$store.state.user;

      const uuid = uuidv4();

      if (!user)
        this.$router.push({
          path: "/login",
        });

      const { data: favouriteData } = await supabase
        .from("favourites")
        .select("id")
        .eq("project_id", id)
        .eq("user_id", user.id);

      if (favouriteData.length) {
        throw "error";
      }

      const { error } = await supabase.from("favourites").insert({
        project_id: id,
        user_id: user.id,
      });

      console.log(error);

      await supabase
        .from("projects")
        .update({
          rating: this.project.rating + 1,
        })
        .eq("id", id);

      await this.fetchFavourite();
      await this.fetchProject();

      toast.success("Проект успешно добавлен в избранное!");
    },
    async removeFromFavourite() {
      const user = this.$store.state.user;

      if (!user)
        this.$router.push({
          path: "/login",
        });

      await supabase
        .from("favourites")
        .delete()
        .eq("project_id", this.$route.params.id);

      await supabase
        .from("projects")
        .update({
          rating: Math.max(this.project.rating - 1, 0),
        })
        .eq("id", this.$route.params.id);

      await this.fetchFavourite();
      await this.fetchProject();
      toast.success("Проект успешно удален из избранного!");
    },
  },
};
</script>

<style lang="scss">
.project {
  &__intro {
    background: linear-gradient(180deg, #cea8ff 0%, #3d008c 100%);
    margin-bottom: 30px;

    &-content {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
    }

    &-controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    &-rating {
      padding: 10px;
      align-items: center;
      display: flex;
      gap: 10px;
      border: 2px solid #ffffff;
      border-radius: 30px;
      justify-content: center;
      color: #fff;
      font-size: 28px;
      cursor: pointer;

      img {
        width: 30px;
        aspect-ratio: 1;
      }
    }

    &-info {
      h1 {
        font-size: 64px;
        margin-bottom: 30px;
        color: #fff;
      }
      p {
        font-size: 14px;
        margin-bottom: 30px;
        color: #fff;
      }
    }

    .container {
      display: flex;
      padding: 60px 20px 40px;
      gap: 45px;
    }

    &-image {
      width: 340px;
      aspect-ratio: 1;
      object-fit: cover;
      object-position: center;
      border: 3px solid #ffffff;
      border-radius: 30px;
    }

    &-user {
      display: flex;
      align-items: center;
      gap: 15px;
      text-decoration: none;

      img {
        width: 50px;
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        border: 1px solid #ffffff;
      }

      span {
        color: #fff;
      }
    }
  }

  &__images {
    margin-bottom: 60px;

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 20px;
      border: 3px solid #9747ff;
      border-radius: 30px;
    }

    &-item {
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: center;
      border: 3px solid #9747ff;
      border-radius: 30px;
    }
  }
}
</style>
