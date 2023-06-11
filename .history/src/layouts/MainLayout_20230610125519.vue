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
            <router-view />
        </div>
    </div>
    
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
@import './src/templates/login.css';
@import './src/templates/main_page.css';
@import './src/templates/reg.css';
</style>