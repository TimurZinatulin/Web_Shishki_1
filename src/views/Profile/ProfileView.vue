<template>
  <div class="profile">
    <div class="profile__intro">
      <div class="container">
        <div class="profile__intro-user">
          <img
            class="profile__intro-image"
            :src="user.avatar_image_url"
            alt=""
          />
          <div class="profile__intro-info">
            <h1>{{ user.full_name || user.email }}</h1>
            <p>{{ user.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="profile__projects">
      <div class="container">
        <h2 class="profile__projects-title">Проекты пользователя</h2>
        <div class="profile__projects-list" v-if="projects.length">
          <ProjectItem
            v-for="item of projects"
            :key="item.id"
            :data="item"
            @triggerFetch="fetchUserProjects"
          />
        </div>
        <p class="profile__projects-empty" v-else>
          На данный момент у пользователя нет проектов
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/utils/supabase";
import Button from "@/components/UI/Button.vue";
import { toast } from "vue3-toastify";
import ProjectItem from "@/components/ProjectItem.vue";

export default {
  async mounted() {
    const user = this.$store.state.user;

    await this.fetchUserProjects();
    await this.getOwner();
  },
  components: {
    Button,
    ProjectItem,
  },
  data() {
    return {
      projects: {},
      user: {},
      isFavourite: false,
    };
  },
  methods: {
    getLocalUrl(path) {
      if (path.startsWith("/")) path = path.substring(1);
      return new URL(path, import.meta.url).href;
    },
    async fetchUserProjects() {
      const { data } = await supabase
        .from("projects")
        .select("title, description, id, preview_img_url, main_img_url, rating")
        .order("id", { ascending: false })
        .eq("user_id", this.$route.params.id);

      const projects = [];
      console.log(data);

      for (const el of data) {
        const { id } = el;
        const { data: favouriteData } = await supabase
          .from("favourites")
          .select("project_id, id")
          .eq("project_id", id);

        if (favouriteData.length) {
          el.favourite_id = favouriteData[0].id;
        }
        projects.push(el);
      }

      this.projects = [...projects];
    },
    async getOwner() {
      const { data } = await supabase
        .from("profiles")
        .select("id, description, avatar_image_url, email, full_name")
        .eq("id", this.$route.params.id)
        .single();

      this.user = data;
    },
  },
};
</script>

<style lang="scss">
.profile {
  &__intro {
    background: linear-gradient(180deg, #cea8ff 0%, #6f00ff 100%);
    margin-bottom: 30px;

    .container {
      padding: 40px 20px;
    }

    &-user {
      display: flex;
      gap: 15px;
      color: #fff;

      h1 {
        margin-bottom: 30px;
        font-size: 64px;
      }
    }

    &-image {
      width: 200px;
      aspect-ratio: 1;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__projects {
    margin-bottom: 60px;

    .container {
      padding: 0 20px;
    }

    &-title {
      font-size: 48px;
      color: $blue;
      text-align: center;
      margin-bottom: 60px;
    }

    &-empty {
      text-align: center;
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
  }
}
</style>
