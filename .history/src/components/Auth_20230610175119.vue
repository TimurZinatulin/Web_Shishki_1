<template>
    <div>
        <register-view v-if="isSignUp" />
        <login-view v-else />
        <button @click="isSignUp = !isSignUp">
            {{
                isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Sign Up"
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