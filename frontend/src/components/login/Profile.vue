<template>
    <div class="container">
        <header class="jumbotron">
            <h3>Hi, {{name}}!</h3>
        </header>
    </div>
</template>

<script>
import UserService from '../../services/user-service'

export default {
    name: 'profile',
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        UserService.getUserContent().then(
            res => {
                this.name = res.data.user
            },
            error => {
                this.name = error.response.data.message
            }
        )
    }
}
</script>