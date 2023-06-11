<template>
    <div style="display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 30px 60px;
        gap: 30px;
        width: 100%;
        height: 280px;
        position: relative;
        top: -15px;
        background: linear-gradient(180deg, #CEA8FF 0%, #6F00FF 100%);
        flex: none;
        order: 0;
        flex-grow: 0;">
        <div style="position: relative; top: 20px; left: -465px;"><img style="width: 200px; height: 200px; border-radius: 100%;" src="../assets/shadrin.png" alt="">
            <p style="position: relative; top: -185px; left: 220px; color: white; font-size: 64px;">Denis Shadrin</p>
            <h5 style="color: white; position: relative; top: -150px; left: 225px;">Разработчик на Python</h5>
            <div class="like" style="background: none; border: 2px solid white; font-size: 25px; padding: 30px 10px; width: 140px; left: 1060px; top: 80px;"><img src="../assets/Serdtse.png" style="width: 40px; height: 40px;" alt="" class="pic2">0001</div>
        </div>
        
    </div>
    <div id="content" style="position: relative; left: -110px; top: 20px; height: 1200px;">
        <h1 id="h2" style="top: 0px; left: 560px;">Проекты пользователя</h1>
        <div class="block" style="left: 100px;">
            <h3>Modeus</h3>
            <a href="http://localhost:8080/project"><img class="pic" src="../assets/modeus.png" alt=""></a>
            <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">1280</div>
            <div class="text" style="top: 40px; position: relative;">Тренажер реакции с иллюзией выбора</div>
        </div>
        <div class="block" style="left: 650px;">
            <h3>Проект 1</h3>
            <img class="pic" src="../assets/ShishkiD.png" alt="">
            <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0761</div>
            <div class="text" style="top: 40px; position: relative;">Очень интересный проект</div>
        </div>
        <div class="block" style="left: 1200px;">
            <h3>Проект 2</h3>
            <img class="pic" src="../assets/ShishkiD.png" alt="">
            <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0001</div>
            <div class="text" style="top: 40px; position: relative;">Очень талантливый проект</div>
        </div>
        <div class="block" style="left: 370px; top: 600px;">
            <h3>Проект 3</h3>
            <img class="pic" src="../assets/ShishkiD.png" alt="">
            <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0761</div>
            <div class="text" style="top: 40px; position: relative;">Инновационный проект</div>
        </div>
        <div class="block" style="left: 920px; top: 600px;">
            <h3>Проект 4</h3>
            <img class="pic" src="../assets/ShishkiD.png" alt="">
            <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0001</div>
            <div class="text" style="top: 40px; position: relative;">Инновационный проект</div>
        </div>
        <button @click="signOut" class="btn2">Выйти</button>
    </div>
</template>

<script>

</script>

<style>

</style>