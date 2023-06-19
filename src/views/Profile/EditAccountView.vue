<template>
  <section class="create">
    <div class="container">
      <div class="create__info">
        <div class="create__info-image">
          <label for="file-input" class="image__input">
            <input
              ref="fileInput"
              @change="onFileChange($event)"
              type="file"
              id="file-input"
            />
            <img
              v-if="profile.avatar_image_url || file"
              :src="file ? getImageUrl(file) : profile.avatar_image_url"
              alt=""
            />
            <img v-else src="../../assets/images/camera-icon.svg" alt="" />
          </label>
          <Button class="create__info-btn" @click="$refs.fileInput.click()"
            >сменить фото</Button
          >
        </div>
        <div class="create__info-content">
          <div class="create__info-item">
            <h2 class="create__info-title">Имя пользователя</h2>
            <input
              v-model="profile.full_name"
              type="text"
              class="create__info-input"
            />
          </div>
          <div class="create__info-item">
            <h2 class="create__info-title">Логин</h2>
            <input
              v-model="profile.email"
              type="text"
              class="create__info-input"
            />
          </div>
          <div class="create__info-item">
            <h2 class="create__info-title">О себе</h2>
            <textarea
              v-model="profile.description"
              class="create__info-textarea"
              cols="30"
              rows="10"
            />
          </div>
          <div class="create__info-item">
            <h2 class="create__info-title">Новый пароль</h2>
            <input
              v-model="newPassword"
              type="password"
              class="create__info-input"
            />
          </div>
          <div class="create__info-item">
            <h2 class="create__info-title">Повторите пароль</h2>
            <input
              v-model="repeatPassword"
              type="password"
              class="create__info-input"
            />
          </div>
          <Button @click="updateProfile" class="create__btn">Сохранить</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "@/components/UI/Button.vue";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue3-toastify";

export default {
  async mounted() {
    await this.fetchUserProfile();
  },
  components: {
    Button,
  },
  data() {
    return {
      profile: {
        avatar_image_url: null,
        full_name: "",
        email: "",
        description: "",
      },

      file: null,
      newPassword: "",
      repeatPassword: "",
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
    },
    getImageUrl(file) {
      return URL.createObjectURL(file);
    },
    async changePassword() {
      if (this.newPassword && this.repeatPassword) {
        if (this.newPassword !== this.repeatPassword) {
          toast.error("Пароли отличаются!");
          return;
        }

        const { user, error } = await supabase.auth.update({
          password: this.newPassword,
        });
      } else {
        toast.error("Поля должны быть заполнены!");
      }
    },
    async updateProfile() {
      const user = this.$store.state.user;

      const profile = { ...this.profile };

      if (this.newPassword) {
        await this.changePassword();
      }

      if (this.file) {
        const imageUrl = `private/${user.id}.${this.file.type}`;

        const { error } = await supabase.storage
          .from("avatars")
          .upload(imageUrl, this.file, {
            cacheControl: "3600",
            upsert: false,
          });

        const {
          data: { publicURL },
        } = supabase.storage.from("avatars").getPublicUrl(imageUrl);

        profile.avatar_image_url = publicURL;
      }

      await supabase.from("profiles").update(profile).eq("email", user.email);
    },
    async fetchUserProfile() {
      const user = this.$store.state.user;

      const { data } = await supabase
        .from("profiles")
        .select("email, full_name, description, avatar_image_url")
        .eq("email", user.email)
        .single();

      this.profile = data;
      console.log(data);
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
    max-width: 330px;
    margin: 0 auto;

    &-title {
      font-size: 14px;
      color: $blue;
    }

    &-content {
      width: 100%;
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
      display: flex;
      gap: 25px;
      align-items: center;
      margin-bottom: 30px;

      .image__input {
        width: 100px;
        height: 100px;
        display: block;
        aspect-ratio: 1;
        position: relative;
        border: 3px solid $purple;
        border-radius: 50%;
        overflow: hidden;

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
