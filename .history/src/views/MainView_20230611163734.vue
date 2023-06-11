<template>
    <div id="app1">
        <div id="article">
            <h1 id="h1">Digital<br>
            portfolio</h1><br>
            <p>Уникальный сервис для<br>размещения своих проектов и<br>наработок</p><br>
            <router-link to="/create_project" class="btn">Создать проект</router-link>
            <img id="logo2" src="../assets/chelik.png">
            <h2 id="h2">Популярные проекты</h2>
        </div>
    
        <div id="projects" style="left: -10px;">
            <div id="content">
                <h2>Collapsibles</h2>

                <p>A Collapsible:</p>
                <button type="button" class="collapsible">Open Collapsible</button>
                <div class="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <p>Collapsible Set:</p>
                <button type="button" class="collapsible">Open Section 1</button>
                <div class="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <button type="button" class="collapsible">Open Section 2</button>
                <div class="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <button type="button" class="collapsible">Open Section 3</button>
                <div class="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import { router } from 'websocket';

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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Encode+Sans+Expanded');

html,body {
  font-family: 'Encode Sans Expanded', sans-serif; 
  height: 100%;
  margin: 15px;
}

*, ::after, ::before {
    box-sizing: border-box;
}

.collapse {
  display: block;
  max-height: 0px;
  overflow: hidden;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1);; 

  &.show {
    max-height: 99em;
    transition: max-height .5s ease-in-out;
  }
}

.block {
  margin-top: 10px;
  background: #f5f5f5;
  padding: 0;
  // height: 250px;
  
  &__content {
    border: 1px solid #ccc;
    padding: 1.5em;
    height: 100%;
  }
}
</style>