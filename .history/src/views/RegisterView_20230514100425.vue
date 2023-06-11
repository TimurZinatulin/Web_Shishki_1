<template>
    <div id="log_card">
        <h1 id="log_name" style="position: relative; top: -30px; left: -10px;">Зарегистрироваться</h1>
        <form>
            <p class="p">Логин</p>
            <input class="input1" style="top: -75px;" type="text">
            <p class="p">Пароль</p>
            <input class="input1" style="top: -75px;" type="password">
            <p class="p" style="display:inline; position:relative; left: 0px;">Повторите пароль</p>
            <input class="input1" style="top: -70px;" type="password">
            <a href="" id="log_btn" style="width: 300px;">Зарегистрироваться</a>
            <a href="http://localhost:8080/login" id="reg_btn" style="left: 50px; position: relative;">Войти</a>
        </form>
    </div>
</template>