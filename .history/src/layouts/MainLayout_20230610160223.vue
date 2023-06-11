<template>
    <div id="app1">
        <HeaderComp />
        <div id="article">
            <h1 id="h1">Digital<br>
            portfolio</h1><br>
            <p>Уникальный сервис для<br>размещения своих проектов и<br>наработок</p><br>
            <a href="http://localhost:8080/create_project" class="btn">Создать проект</a>
            <img id="logo2" src="../assets/chelik.png">
            <h2 id="h2">Популярные проекты</h2>
        </div>
        <div id="projects" style="left: -10px;">
            <MainView />
        </div>
    </div>
    
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import MainView from '@/views/MainView.vue'

export default {
    components: {
        HeaderComp, MainView
    }
}
</script>

<style>
@import '@/templates/login.css';
@import '@/templates/main_page.css';
@import '@/templates/reg.css';
</style>