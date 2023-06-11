<template>
  <!-- Проверка доступности пользователя в хранилище; при недоступности - показываем компонент авторизации-->
  <Auth v-if="!store.state.user" />
  <!-- Если пользователь доступен, показываем компонент Hello World -->
  <HelloWorld v-else msg="Hello Vue 3 + Vite" />
</template>
  
<script>
import Auth from "@/components/Auth.vue";
import HelloWorld from "@/components/HelloWorld.vue";
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
    HelloWorld,
    Auth, EmptyLayout, MainLayout, ExtraLayout
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>