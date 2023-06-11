<template>
    <div id="log_card">
        <h1 id="log_name" style="position: relative; top: -30px; left: -10px;">Зарегистрироваться</h1>
        <form @submit.prevent="handleSignup">
            <p class="p">Логин</p>
            <input class="input1" style="top: -75px;" type="email" v-model="email">
            <p class="p">Пароль</p>
            <input class="input1" style="top: -75px;" type="password" v-model="password">
            <p class="p" style="display:inline; position:relative; left: 0px;">Повторите пароль</p>
            <input class="input1" style="top: -70px;" type="password" v-model="password">
            <button type="submit" id="reg_btn">Зарегистрироваться</button>
            <a href="http://localhost:8080/login" id="reg_btn" style="left: 50px; position: relative;">Войти</a>
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