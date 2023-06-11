<template>
    <div id="app1">
        <div id="article">
            <h1 id="h1">Digital<br>
            portfolio</h1><br>
            <p>Уникальный сервис для<br>размещения своих проектов и<br>наработок</p><br>
            <router-link to="/create_project" class="btn">Создать проект</router-link>
            <!-- <img id="logo2" src="../assets/chelik.png"> -->
            <h2 id="h2">Популярные проекты</h2>
        </div>
    
        <div id="root"></div>

        <div class="block collapse first">
            <div class="block__content">
                I'm the first content!
            </div>
        </div>
        <div class="block collapse second">
            <div class="block__content">
                I'm the second content!
            </div>
        </div>

        <button 
            class="btn btn-primary btn__first" 
            data-toggle="collapse"
            data-target=".collapse.first"
            data-text="Collapse"
        >
            Toggle First
        </button>
        <button 
            class="btn btn-primary btn__first" 
            data-toggle="collapse"
            data-target=".collapse.second"
            data-text="Collapse"
        >
            Toggle Second
        </button>
        <button 
            class="btn btn-primary btn__first" 
            data-toggle="collapse"
            data-target=".collapse"
            data-text="Collapse"
        >
            Toggle All
        </button>

    </div>
    
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import { router } from 'websocket';

export default {
    // metaInfo: {
    //     title: 'Vue App',
    //     meta: [
    //         { charset: 'utf-8' },
    //         { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    //     ],
    //     link: [
    //         { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    //         { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOriginIsolated },
    //         { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap' },
    //     ]
    // },
    components: {
        HeaderComp,
        router
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
.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>