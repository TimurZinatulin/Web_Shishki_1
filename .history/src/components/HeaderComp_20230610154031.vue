<template>
    <div id="header" class="wrapper">
        <div id="head-cont">
            <a style="position: relative; left: -280px;" href="http://localhost:8080/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></a>
            <input class="input" type="text" placeholder="Найти...">
            <ul style="left: 400px;">
                <li><router-link to="/favs" class="btn2">Избранное</router-link></li>
                <li><a class="btn2" href="http://localhost:8080/my_projects">Мои проекты</a></li>
                <li><a class="btn2" href="http://localhost:8080/edit">Редактировать профиль</a></li>
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