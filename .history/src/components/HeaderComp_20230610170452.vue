<template>
    <div id="header" class="wrapper">
        <div id="head-cont">
            <li><router-link to="/main" style="position: relative; left: -280px;" href="http://localhost:5173/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></router-link></li>
            <input class="input" type="text" placeholder="Найти...">
            <ul style="left: 400px;">
                <li><router-link to="/favs" class="btn2">Избранное</router-link></li>
                <li><router-link to="/my_projects" class="btn2">Мои проекты</router-link></li>
                <li><router-link to="/edit" class="btn2">Редактировать профиль</router-link></li>
                <li><router-link to="/create_project" class="btn2">Новый проект</router-link></li>
            </ul>
        </div>  
    </div>
</template>

<script>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
</style>