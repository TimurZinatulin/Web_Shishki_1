<template>
    <div id="header" class="wrapper">
        <div id="head-cont">
            <router-link style="position: relative; left: -280px;" href="http://localhost:8080/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></a>
            <input class="input" type="text" placeholder="Найти...">
            <ul>
                <li><router-link to="/favs" class="btn2">Избранное</router-link></li>
                <li><router-link to="/create_project" class="btn2">Новый проект</router-link></li>
                <li><router-link to="/login" class="link">Войти</router-link></li>
            </ul>
        </div>  
    </div>
    <RouterView />
</template>

<script>

</script>

<style>
@import '@/templates/login.css';
@import '@/templates/main_page.css';
@import '@/templates/reg.css';
</style>