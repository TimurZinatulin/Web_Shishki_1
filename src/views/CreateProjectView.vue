<template>
  <section class="create">
    <div class="container">
      <h2 class="title" v-if="title.length">{{ title }}</h2>
      <h2 class="title" v-else>Название проекта</h2>
      <div class="create__info">
        <div class="create__info-image">
          <label for="file-input" class="image__input">
            <input
              ref="fileInput"
              @change="onFileChange($event)"
              type="file"
              id="file-input"
            />
            <img v-if="file" :src="getImageUrl(file)" alt="" />
            <img v-else src="../assets/images/camera-icon.svg" alt="" />
          </label>
          <Button class="create__info-btn" @click="$refs.fileInput.click()"
            >Загрузить изображение</Button
          >
        </div>
        <div class="create__info-content">
          <h2 class="create__info-title">Название проекта</h2>
          <input v-model="title" type="text" class="create__info-input" />
          <h2 class="create__info-title">Описание</h2>
          <textarea
            v-model="description"
            class="create__info-textarea"
            cols="30"
            rows="10"
          />
          <h2 class="create__info-title">Ссылка</h2>
          <input v-model="link" type="text" class="create__info-input" />
        </div>
      </div>
      <div class="create__images">
        <label for="multiple-file-input" class="create__images-items">
          <input
            ref="multipleFileInput"
            @change="onFilesChange($event)"
            multiple
            type="file"
            id="multiple-file-input"
          />
          <p v-if="!files.length" class="create__images-empty">
            Добавьте изображения
          </p>
          <img
            v-for="(item, i) of files"
            :key="i"
            class="create__images-item"
            :src="getImageUrl(item)"
            alt=""
          />
        </label>
        <Button
          class="create__images-btn"
          @click="$refs.multipleFileInput.click()"
          >Добавить фото</Button
        >
      </div>
      <Button @click="createProject" class="create__btn">Сохранить</Button>
    </div>
  </section>
</template>

<script>
import Button from "@/components/UI/Button.vue";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    Button,
  },
  data() {
    return {
      file: null,
      title: "",
      description: "",
      link: "",
      files: [],
    };
  },
  methods: {
    onFilesChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.files = files;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
    },
    getImageUrl(file) {
      return URL.createObjectURL(file);
    },
    async createProject() {
      const user = this.$store.state.user;

      const uuid = uuidv4();

      const imageUrl = `preview_img/${user.id}-${uuid}.${this.file.type}`;

      const { error } = await supabase.storage
        .from("portfolio_images")
        .upload(imageUrl, this.file, {
          cacheControl: "3600",
          upsert: false,
        });

      const {
        data: { publicURL },
      } = supabase.storage.from("portfolio_images").getPublicUrl(imageUrl);

      let imageUrlMain = [];

      for (let i = 0; i < this.files.length; i++) {
        const url = `main_img/${user.id}-${uuid}-${i + 1}.${
          this.files[i].type
        }`;
        // imageUrlMain.push(url);
        await supabase.storage
          .from("portfolio_images")
          .upload(url, this.files[i], {
            cacheControl: "3600",
            upsert: false,
          });

        const {
          data: { publicURL: finalURL },
        } = supabase.storage.from("portfolio_images").getPublicUrl(url);
        imageUrlMain.push(finalURL);
      }
      await supabase.from("projects").insert({
        title: this.title,
        description: this.description,
        link: this.link,
        preview_img_url: publicURL,
        user_id: user.id,
        main_img_url: imageUrlMain.join(";"),
        id: uuid,
        rating: 0,
      });

      this.$router.push({
        name: "ProfileProjects",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create {
  &__btn {
    display: flex;
    margin: 0 auto;
  }
  &__images {
    width: 100%;

    &-btn {
      display: flex;
      margin: 0 auto 60px;
    }

    &-items {
      border: 3px solid $purple;
      display: grid;
      padding: 20px;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      min-height: 200px;

      input {
        display: none;
      }
    }

    &-item {
      height: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
      border: 3px solid $purple;
    }
  }
  .container {
    padding: 30px 20px 50px;
    max-width: 900px;

    & > .title {
      margin-bottom: 60px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    &-title {
      font-size: 14px;
      color: $blue;
    }

    &-content {
      width: 340px;
    }

    &-input,
    &-textarea {
      width: 100%;
      padding: 10px;
      border: 2px solid $blue;
      font-size: 14px;
      font-weight: 600;

      &:focus {
        outline: none;
      }
    }

    &-textarea {
      resize: none;
      margin-bottom: 40px;
    }

    &-input {
      &:first-of-type {
        margin-bottom: 40px;
      }
    }

    &-btn {
      display: flex;
      margin: 0 auto;
    }

    &-image {
      .image__input {
        width: 340px;
        display: block;
        aspect-ratio: 1;
        position: relative;
        border: 3px solid $purple;
        border-radius: 30px;
        overflow: hidden;
        margin-bottom: 20px;

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          object-fit: cover;
          object-position: center;
        }

        input {
          display: none;
        }
      }
    }
  }
}
</style>
