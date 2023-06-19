<template>
  <section class="projects">
    <div class="container">
      <h2 class="title">Избранные проекты</h2>
      <div class="projects__items" v-if="projects.length">
        <ProjectItem
          v-for="(item, i) of projects"
          :key="i"
          :edit="true"
          :data="item"
          @triggerFetch="fetchUserProjects"
        />
      </div>
      <p class="projects__empty" v-else>На данный момент у вас нет проектов</p>
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
        .from("favourites")
        .select("project_id, id")
        .eq("user_id", user.id);

      const projects = [];

      for (const el of data) {
        const { project_id, id } = el;

        const { data: projectData } = await supabase
          .from("projects")
          .select(
            "title, description, id, preview_img_url, rating, main_img_url"
          )
          .order("id", { ascending: false })
          .eq("id", project_id);

        projects.push({
          ...projectData[0],
          favourite_id: id,
        });
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
