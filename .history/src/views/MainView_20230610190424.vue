<template>
    <div id="app1">
        <div id="article">
            <h1 id="h1">Digital<br>
            portfolio</h1><br>
            <p>Уникальный сервис для<br>размещения своих проектов и<br>наработок</p><br>
            <a href="http://localhost:8080/create_project" class="btn">Создать проект</a>
            <img id="logo2" src="../assets/chelik.png">
            <h2 id="h2">Популярные проекты</h2>
        </div>
    
        <div id="projects" style="left: -10px;">
            <div id="content">
                <div class="block" style="left: 151px;">
                    <h3>Sleepy</h3>
                    <img class="pic" src="../assets/bot.jpg" alt="">
                    <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">1280</div>
                    <div class="text">Телеграмм-бот для налаживания и поддержания здорового режима сна</div>
                </div>
                <div class="block" style="left: 600px;">
                    <h3>Gnoosic</h3>
                    <img class="pic" src="../assets/og_logo.png" alt="">
                    <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0761</div>
                    <div class="text">Нейросеть, рекомендующая новых исполнителей, основываясь на вашем музыкальном вкусе</div>
                </div>
                <div class="block" style="left: 1049px;">
                    <h3>Modeus</h3>
                    <a href="http://localhost:8080/project"><img class="pic" src="../assets/modeus.png" alt=""></a>
                    <div class="like"><img src="../assets/Serdtse.png" alt="" class="pic2">0001</div>
                    <div class="text" style="top: 40px; position: relative;">Тренажер реакции с иллюзией выбора</div>
                </div>
                <button 
                    href="" 
                    class="link btn btn-primary btn__first" 
                    data-toggle="collapse"
                    data-target=".collapse"
                    data-text="Collapse" 
                    style="position: absolute; border: none; top: 650px; left: 685px;">ПОКАЗАТЬ ЕЩЁ</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'

export default {
    metaInfo: {
        title: 'Vue App',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOriginIsolated },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap' },
        ]
    },
    components: {
        HeaderComp,
    }
};

const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', (ev) => {
  const elm = ev.target;
  if (triggers.includes(elm)) {
    const selector = elm.getAttribute('data-target');
    collapse(selector, 'toggle');
  }
}, false);

const fnmap = {
  'toggle': 'toggle',
  'show': 'add',
  'hide': 'remove'
};

const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[cmd]]('show');
  });
}

</script>

<style>

</style>