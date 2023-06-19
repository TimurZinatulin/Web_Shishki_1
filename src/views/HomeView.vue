<template>
  <div class="home">
    <section class="home__intro">
      <div class="container">
        <div class="home__intro-content">
          <h1 class="home__intro-title">
            Digital <br />
            portfolio
          </h1>
          <p class="home__intro-text">
            Уникальный сервис для размещения своих проектов и наработок
          </p>
          <Button class="home__intro-btn">Создать проект</Button>
        </div>
        <img src="@/assets/images/intro.png" alt="" class="home__intro-image" />
      </div>
    </section>
    <section class="home__popular">
      <h2 class="home__popular-title">Популярные проекты</h2>
      <div class="home__popular-content">
        <div class="container">
          <TransitionGroup tag="div" name="list" class="home__popular-items">
            <ProjectItem
              v-for="item of projects.slice(0, projectsLimit)"
              :key="item.id"
              :data="item"
              @trigger-fetch="fetchProjects"
            />
          </TransitionGroup>
          <Button
            v-if="projects.length > projectsLimit"
            @click="showMore"
            class="home__popular-btn"
            >Показать ещё</Button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "@/components/UI/Button.vue";
import ProjectItem from "@/components/ProjectItem.vue";
import { supabase } from "@/utils/supabase";

export default {
  async mounted() {
    await this.fetchProjects();
  },
  components: {
    Button,
    ProjectItem,
  },
  data() {
    return {
      projects: [],
      projectsLimit: 4,
    };
  },
  methods: {
    showMore() {
      this.projectsLimit += 4;
    },
    async fetchProjects() {
      const user = this.$store.state.user;

      const { data } = await supabase
        .from("projects")
        .select("title, description, id, preview_img_url, main_img_url, rating")
        .order("id", { ascending: false });

      console.log(data);

      const projects = [];

      for (const el of data) {
        if (!user) {
          projects.push(el);
          continue;
        }

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
  },
};
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.home {
  &__intro {
    &-content {
      width: 33%;
    }

    &-title {
      font-size: 96px;
      font-weight: 700;
      margin-bottom: 15px;
      color: $blue;
    }

    &-text {
      font-size: 32px;
      color: $blue;
      margin-bottom: 30px;
    }

    &-btn {
      background: linear-gradient(180deg, #ff6856 0%, #9747ff 100%);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }

    &-image {
      position: absolute;
      right: 0;
      bottom: 0;
      height: calc(100% - 50px);
      object-fit: contain;
    }

    & .container {
      position: relative;
      padding: 50px 20px 100px;
    }
  }

  &__popular {
    height: 100vh;
    &-title {
      font-size: 48px;
      font-weight: 600;
      color: $blue;
      margin-bottom: 30px;
      text-align: center;
    }

    &-btn {
      text-transform: uppercase;
      font-weight: 400;
      display: flex;
      margin: 0 auto;
    }

    &-content {
      background: linear-gradient(180deg, #3d008c 0%, #14002f 100%);

      & .container {
        padding: 60px 20px 30px;
      }
    }

    &-items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 80px;
      gap: 30px;
    }
  }
}
</style>
