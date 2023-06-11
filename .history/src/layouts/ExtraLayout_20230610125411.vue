<template>
    <HeaderComp />
    <router-view />
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'

export default {
    components: {
        HeaderComp,
    }
}
</script>

<style>
@import './src/templates/login.css';
@import './src/templates/main_page.css';
@import './src/templates/reg.css';
</style>