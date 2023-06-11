<template>
    <HeaderComp />
    <router-view />
</template>

<script>
import HeaderComp from '@/components/HeaderComp'

export default {
    components: {
        HeaderComp,
    }
}
</script>

<style>
@import './templates/login.css';
@import './templates/main_page.css';
@import './templates/reg.css';
</style>