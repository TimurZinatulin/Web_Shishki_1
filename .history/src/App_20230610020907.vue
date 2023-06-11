<template>
  <!-- Проверка доступности пользователя в хранилище; при недоступности - показываем компонент авторизации-->
  <Auth v-if="!store.state.user" />
  <!-- Если пользователь доступен, показываем компонент Hello World -->
  <HelloWorld v-else msg="Hello Vue 3 + Vite" />
</template>
  
<script>
import Auth from '@/components/Auth';
import HelloWorld from '@/components/HelloWorld';
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';
import ExtraLayout from '@/layouts/ExtraLayout';
  
import { store } from "./store";
import { supabase } from "./supabase";
  
export default {
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout';
    }
  },
  components: {
    HelloWorld, Auth, EmptyLayout, MainLayout, ExtraLayout
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
@import 'templates/main_page.css';
</style>