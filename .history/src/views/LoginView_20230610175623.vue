<template>
    <div id="log_card">
        <h1 id="log_name">Войти</h1>
        <form>
            <p class="p">Логин</p>
            <input class="input1" style="top: -75px;" type="text">
            <p class="p">Пароль</p>
            <input class="input1" style="top: -75px;" type="password">
            <button type="submit" class="log_btn">Sign in</button>
            <a href="http://localhost:8080/register" style="left: -1px;" id="reg_btn">Зарегистрироваться</a>

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
    
        const handleSignin = async () => {
            try {
                // Задействуем предоставленный Supabase метод для обработки входа
                const { error } = await supabase.auth.signInWithPassword({
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
            handleSignin,
        };
    },
};
</script>

<style>

</style>