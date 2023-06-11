<template>
  <!-- <div id="header" class="wrapper"> -->
    <div id="head-cont">
      <a style="position: relative; left: -280px;" href="http://localhost:8080/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></a>
      <input class="input" type="text" placeholder="Найти...">
      <ul>
        <li><a class="btn2" href="http://localhost:8080/favs">Избранное</a></li>
        <li><a class="btn2" href="http://localhost:8080/create_project">Новый проект</a></li>
        <li><a href="http://localhost:8080/login" class="link">Войти</a></li>
      </ul>
    </div>  
  <!-- </div> -->
  <div id="article">
    <h1 id="h1">Digital<br>
    portfolio</h1><br>
    <p>Уникальный сервис для<br>размещения своих проектов и<br>наработок</p><br>
    <a href="http://localhost:8080/create_project" class="btn">Создать проект</a>
    <img id="logo2" src="../assets/chelik.png">
    <h2 id="h2">Популярные проекты</h2>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Vue App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap' },
    ]
  },
};
</script>
