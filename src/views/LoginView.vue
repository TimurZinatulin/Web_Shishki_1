<template>
  <div class="container login-page">
    <login-form
      v-model:email="email"
      v-model:password="password"
      v-model:repeatPassword="repeatPassword"
      @formChange="onChange"
      @onSubmit="submit"
      :isLogin="isLogin"
    />
  </div>
</template>

<script>
import { toast } from "vue3-toastify";

import LoginForm from "@/components/Auth/LoginForm.vue";
import { mapMutations } from "vuex";

import { supabase } from "@/utils/supabase";
import { setLoading } from "@/utils/loading";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      isLogin: true,
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    onChange() {
      this.isLogin = !this.isLogin;
    },
    async submit() {
      if (this.isLogin) {
        await this.login();
      } else {
        await this.register();
      }
    },
    async login() {
      try {
        setLoading(true);

        const { error, user } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        this.setUser(user);

        await this.$router.push("/");

        toast.success("Успешный вход!");
      } catch (e) {
        console.log(e);
        toast.error("Ошибка авторизации!!!");
      } finally {
        setLoading(false);
      }
    },
    async register() {
      try {
        setLoading(true);

        const { data } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", this.email)
          .single();

        if (data) {
          throw Error("Этот аккаунт уже зарегистрирован!");
        }

        if (this.password && this.repeatPassword) {
          if (this.password !== this.repeatPassword) {
            toast.error("Пароли отличаются!");
            return;
          }

          const { user, error } = await supabase.auth.update({
            password: this.password,
          });
        } else {
          toast.error("Поля должны быть заполнены!");
        }

        const { error, user } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
        });

        if (error) throw error;
        // ok
        // await router.push("/profile");

        toast.success("Письмо отправлено на вашу почту");
        this.onChange();
      } catch (e) {
        console.log(e);
        toast.error("Ошибка!");
      } finally {
        setLoading(false);
      }
    },
  },
  // setup() {
  //   const router = useRouter();

  //   const email = ref("");
  //   const password = ref("");
  //   const repeatPassword = ref("");
  //   const isLogin = ref(true);

  //   const onChange = (loginValue) => {
  //     console.log("prredc");
  //     email.value = "";
  //     password.value = "";
  //     repeatPassword.value = "";

  //     isLogin.value = loginValue;
  //   };

  //   const login = async () => {
  //     try {
  //       setLoading(true);

  //       const { error } = await supabase.auth.signIn({
  //         email: email.value,
  //         password: password.value,
  //       });

  //       if (error) throw error;

  //       await router.push("/profile");

  //       setNotification({
  //         title: "¡Bienvenid@",
  //         message: "¡Hola de nuevo!",
  //       });
  //     } catch (e) {
  //       setNotification({
  //         title: "Error autenticando",
  //         message: e.message,
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   return {
  //     email,
  //     password,
  //     login,
  //   };
  // },
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;

  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    &-title {
      color: $blue;
      margin-bottom: 20px;
      font-size: 24px;
    }

    & form > button {
      text-transform: uppercase;
      outline: 0;
      background: $purple;
      width: 100%;
      border: 0;
      padding: 15px;
      color: #ffffff;
      font-size: 14px;
      transition: all 0.4s;
      cursor: pointer;

      &:hover,
      &:active,
      &:focus {
        background: $blue;
      }
    }
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }
  .form .message button {
    color: $blue;
    text-decoration: none;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>
