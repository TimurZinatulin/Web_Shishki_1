<template>
  <header class="header">
    <div class="container">
      <div class="flex">
        <router-link to="/" class="header__logo"
          ><img src="@/assets/images/logo.svg" alt="" class="header__logo-img"
        /></router-link>
        <label for="search" class="header__search">
          <input
            type="text"
            id="search"
            class="header__search-input"
            placeholder="Найти..."
            autocomplete="off"
          />
          <img
            src="@/assets/images/search-icon.svg"
            alt=""
            class="header__search-icon"
          />
        </label>
      </div>
      <nav class="header__nav">
        <ul v-if="isAuth" class="header__nav-list">
          <li class="header__nav-item">
            <router-link to="/favourites" class="header__nav-link"
              >Избранное</router-link
            >
          </li>
          <li class="header__nav-item">
            <router-link to="/profile/projects" class="header__nav-link"
              >Мои проекты</router-link
            >
          </li>
          <li class="header__nav-item">
            <router-link to="/profile/edit" class="header__nav-link"
              >Редактировать профиль</router-link
            >
          </li>
        </ul>
        <Button v-if="isAuth" @click="logout">Выйти</Button>
        <Button v-else to="/login">Войти</Button>
      </nav>
    </div>
  </header>
</template>

<script>
import { supabase } from "@/utils/supabase";

import Button from "./UI/Button.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Button,
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    async logout() {
      this.$router.push("/");
      this.setUser(null);
      await supabase.auth.signOut();
    },
  },
};
</script>

<style lang="scss">
.header {
  background: $purple;
  position: sticky;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;

  .container {
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__search {
    position: relative;

    &-icon {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &-input {
      padding: 10px 40px 10px 20px;
      background: $light-purple;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      border: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #fff;
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 40px;

    &-list {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 40px;
    }

    &-link {
      font-weight: 600;
      color: #fff;
      text-decoration: none;
    }

    &-item {
      position: relative;
      padding: 0 10px;

      &:hover::after {
        transform: scaleX(1);
      }

      &::after {
        content: "";
        width: 100%;
        height: 2px;
        background: #fff;
        transform: scaleX(0);
        transition: all 0.4s;
        position: absolute;
        bottom: -5px;
        left: 0;
      }
    }
  }
}
</style>
