<template>
    <div id="header" class="wrapper">
        <div id="head-cont">
            <a style="position: relative; left: -280px;" href="http://localhost:8080/main"><img id="logo" src="../assets/ShishkiD.png" style="width: 70px; height: 70px;"></a>
            <input class="input" style="position: relative; left: -250px;" type="text" placeholder="Найти...">
            <ul>
                <li><router-link to="/login" class="btn2">Избранное</router-link></li>
                <li><router-link to="/login" class="btn2">Новый проект</router-link></li>
                <li><router-link to="/login" class="link">Войти</router-link></li>
            </ul>
        </div>  
    </div>
    <div id="log_card">
        <h1 id="log_name" style="position: relative; top: -30px; left: -10px;">Зарегистрироваться</h1>
        <form @submit.prevent="handleSignup">
            <p class="p">Логин</p>
            <input class="input1" style="top: -75px;" type="email" v-model="email">
            <p class="p">Пароль</p>
            <input class="input1" style="top: -75px;" type="password" v-model="password">
            <p class="p" style="display:inline; position:relative; left: 0px;">Повторите пароль</p>
            <input class="input1" style="top: -70px;" type="password" v-model="password">
            <button type="submit" id="log_btn" style="width: 250px;">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
    
export default {
    setup() {
        const email = ref("");
        const password = ref("");
    
        const handleSignup = async () => {
            try {
                // Задействуем предоставленный Supabase метод для обработки регистрации
                const { error } = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                });
                if (error) throw error;
            } catch (error) {
                alert(error.error_description || error.message);
            }
        };
    
        return {
            email,
            password,
            handleSignup,
        };
    },
};
</script>