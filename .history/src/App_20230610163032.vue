<template>
  <!-- Проверка доступности пользователя в хранилище; при недоступности - показываем компонент авторизации-->
  <Auth v-if="!store.state.user" />
  <!-- Если пользователь доступен, показываем компонент Hello World -->
  <RegisterView v-else msg="Hello Vue 3 + Vite" />
</template>
  
<script>
import Auth from './components/Auth.vue';
import HelloWorld from './components/HelloWorld.vue';
import HeaderComp from './components/HeaderComp.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import ExtraLayout from './layouts/ExtraLayout.vue';
import RegisterView from './views/RegisterView.vue';

import store from "./store.js";
import { supabase } from "./supabase";
  
export default {
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout';
    }
  },
  components: {
    HelloWorld, Auth, HeaderComp, EmptyLayout, MainLayout, ExtraLayout, RegisterView
  },
  setup() {
    // сначала проверяем, вошел ли пользователь в систему с помощью Supabase
    store.state.user = supabase.auth.user;
    // затем настраиваем слушатель для обновления хранилища, если меняется пользователь - выходит из системы или входит
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        store.state.user = null;
      } else {
        store.state.user = session.user;
      }
    });
  
    return {
      store,
    };
  },
};
</script>
  
<style>
@import '@/templates/main_page.css';
</style>