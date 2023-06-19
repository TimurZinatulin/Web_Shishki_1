<template>
  <section class="projects">
    <div class="container">
      <h2 class="title">Мои проекты</h2>
      <div class="projects__items" v-if="projects.length">
        <ProjectItem
          v-for="item of projects"
          :key="item.id"
          :edit="true"
          :data="item"
          @triggerFetch="fetchUserProjects"
          @deleteItem="deleteProject"
        />
      </div>
      <p class="projects__empty" v-else>На данный момент у вас нет проектов</p>
      <Button to="/create-project" class="projects__btn">Создать проект</Button>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/ProjectItem.vue";
import Button from "@/components/UI/Button.vue";
import { supabase } from "@/utils/supabase";

export default {
  components: {
    ProjectItem,
    Button,
  },
  async mounted() {
    await this.fetchUserProjects();
  },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    async fetchUserProjects() {
      const user = this.$store.state.user;

      const { data } = await supabase
        .from("projects")
        .select("title, description, id, preview_img_url, main_img_url, rating")
        .order("id", { ascending: false })
        .eq("user_id", user.id);

      const projects = [];

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
    async deleteProject(id) {
      const shouldDelete = confirm("Вы точно хотите удалить проект?");
      if (shouldDelete) {
        const data = await supabase.from("projects").delete().eq("id", id);
        await this.fetchUserProjects();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  .container {
    padding: 30px 20px 50px;

    & > .title {
      margin-bottom: 60px;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  &__btn {
    margin: 60px auto 0;
    display: flex;
  }

  &__empty {
    text-align: center;
    font-size: 28px;
  }
}
</style>
