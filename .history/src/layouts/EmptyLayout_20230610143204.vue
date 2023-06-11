<template>
    <div id="header" class="wrapper">
        <div id="head-cont">
            <a style="position: relative; left: -280px;" href="http://localhost:8080/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></a>
            <input class="input" type="text" placeholder="Найти...">
            <ul>
                <li><a class="btn2" href="http://localhost:8080/favs">Избранное</a></li>
                <li><a class="btn2" href="http://localhost:8080/create_project">Новый проект</a></li>
                <li><a href="http://localhost:8080/login" class="link">Войти</a></li>
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