<template>
    <div id="Login">
        <div> Login </div>
        <input v-model="user.id" placeholder="ID"> <br/>
        <input v-model="user.password" type="password" placeholder="password">
        <button v-on:click="login" >login</button>
        <a v-bind:href="url.signUpUrl" > Sign up </a>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: ''
            },
            url: {
                signUpUrl: '/login/signUp'
            }
        }
    },
    methods: {
        login: function () {
            this.$http.post('/api/login/checkLogin', {
                user: this.user
            })
            .then(
                () => {
                    alert('success login')
                },
                (error) => {
                    alert(error.response.data.error)
                }
            )
            .catch(error => {
                alert(error)
            })
        }
    }
}
</script>