<template>
    <form style="top: 10px; ">
        <p class="p" style="top: 95px;">Имя пользователя</p>
        <input class="input1" type="text" style="top: 100px;">
        <p class="p" style="top: 100px">Логин</p>
        <input class="input1" type="text" style="top: 100px;">
        <p class="p" style="top: 100px; width: 100px; left: -115px;">О себе</p>
        <textarea name="text" id="area" cols="29" rows="3">
        </textarea>
        <p class="p" style="top: 120px;">Пароль</p>
        <input class="input1" type="password" style="top: 120px;">
        <p class="p" style="top: 115px; width: 200px; left: -65px;">Новый пароль</p>
        <input class="input1" type="password" style="top: 115px;">
        <p class="p" style="top: 105px; width: 200px; left: -65px;">Повторите пароль</p>
        <input class="input1" type="password" style="top: 105px; bottom: 100px;">
    </form>
    <div id="chphoto">
        <img id="photo" src="../assets/default_photo.png" alt="">
        <a href="" class="link" style="position: inherit; border: 2px solid rgba(151, 71, 255, 1);">СМЕНИТЬ ФОТО</a>
    </div>
    <button @click="signOut" class="btn2">Выйти</button>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

defineProps({
  msg: String,
});

async function signOut() {
  const { error } = await supabase.auth.signOut();
}
</script>

<style>

</style>