<template>
    <div>
        <register-view v-if="isSignUp" />
        <login-view v-else />
        <button id="log_btn" @click="isSignUp = !isSignUp">
            {{
                isSignUp
                ? "Войти"
                : "Зарегистрироваться"
            }}
        </button>
    </div>
</template>
    
<script>
import { ref } from "vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

export default {
    components: { RegisterView, LoginView },
    setup() {
        const isSignUp = ref(true);
        return {
            isSignUp,
        };
    },
};
</script>
    
<style scoped>
</style>