<template>
    <div>
        <h2>Sign up for an account</h2>
        <form @submit.prevent="handleSignup">
            <div>
                <label for="email">Email</label>
                <input id="email" type="email" v-model="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" />
            </div>
            <div>
                <button type="submit">Sign up</button>
            </div>
        </form>
    </div>
</template>