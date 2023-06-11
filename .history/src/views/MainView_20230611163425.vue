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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
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