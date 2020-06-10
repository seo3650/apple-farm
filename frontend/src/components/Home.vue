<template>
    <div id="home">
        <h1>사과농장 만들기</h1>
        <div class="login">
            <input v-model="user.id" placeholder="ID" class="id"> <br/>
            <input v-model="user.password" type="password" placeholder="password" class="pw"> 
            <button v-on:click="login" >login</button> <br/>
            <a v-bind:href="url.signUpUrl" > Sign up </a>
        </div>
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
                signUpUrl: '/signUp'
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
<style scoped>
    /* .id{
        position: absolute; 
        margin: 0 auto;
        top: 100px;
        right: 80px;
        width: 110px;
        height: 15px;
    }
    .pw{
        position: absolute;
        top: 120px;
        right: 80px;
        width: 110px;
        height: 15px;
    } */
    .login{
        position: absolute;
        top: 120px;
        right: 80px;
        width: 110px;
        height: 15px;
    }
</style>