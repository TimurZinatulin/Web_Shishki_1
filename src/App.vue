<script>
import "vue3-toastify/dist/index.css";

import GuestNavigation from "@/components/Navigations/GuestNavigation.vue";
import Notification from "@/components/Global/Notification.vue";
import Loading from "@/components/Global/Loading.vue";
import Header from "@/components/Header.vue";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

export default {
  components: {
    Loading,
    Notification,
    GuestNavigation,
    Header,
  },
  setup() {
    // retrieve a user of supabase
    store.user = supabase.auth.user();
    // listen to auth events of supabase
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        store.user = session.user;
      } else {
        store.user = null;
      }
    });

    return {
      store,
    };
  },
};
</script>

<template>
  <Header />
  <!-- <loading /> -->
  <!-- <auth-navigation v-if="store.user" :user="store.user" /> -->
  <!-- <guest-navigation v-else /> -->
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Roboto:wght@400;500;700&display=swap");
</style>
