<template>
    <div class="container">
        <header class="jumbotron">
            <h2>Hi, {{name}}!</h2>
            <h1 class="display-4">Welcome:)</h1>
            <hr class="my-4">
            <h5>What is your favorites?</h5>

            <h5>You can change your information.</h5>
            <form name="form" @submit.prevent="changePassword">
                <div class="from-group">
                    <label for="currentPW">current PW</label>
                    <input
                        type="password"
                        class="form-control"
                        name="currentPW"
                        v-model="account.currentPassword"
                        v-validate="'required'"
                    />
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="errors.has('currentPW')"
                    >Password is required!</div>
                </div>
                <div class="form-group">
                    <label for="changePW">change PW</label>
                    <input
                        type="password"
                        class="form-control"
                        name="changePW"
                        v-model="account.changePassword"
                        v-validate="'required'"
                    />
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="errors.has('changePW')"
                    >Password is required!</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-dark btn-block" :disables="pwChangeLoading">
                        <span class="spinner-border spinner-border-sm" v-show="pwChangeLoading"></span>
                        <span>Change Password</span>
                    </button>
                </div>
                <div class="form-group">
                    <div class="alert alert-danger" role="alert" v-if="changeMessage">{{changeMessage}}</div>
                </div>
            </form>
            <form name="form" @submit.prevent="withdrawal">
                <div class="from-group">
                    <label for="PW">PW</label>
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        v-model="account.password"
                        v-validate="'required'"
                    />
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="errors.has('password')"
                    >Password is required!</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-dark btn-block" :disables="withdrawalLoading">
                        <span class="spinner-border spinner-border-sm" v-show="withdrawalLoading"></span>
                        <span>Withdrawal</span>
                    </button>
                </div>
                <div class="form-group">
                    <div class="alert alert-danger" role="alert" v-if="withdrawalMessage">{{withdrawalMessage}}</div>
                </div>
            </form>
        </header>
    </div>
</template>

<script>
import UserService from '../../services/user-service'

export default {
    name: 'profile',
    data() {
        return {
            name: '',
            account: {
                currentPassword: '',
                changePassword: '',
                password: '',
            },
            pwChangeLoading: false,
            withdrawalLoading: false,
            changeMessage: '',
            withdrawalMessage: '',
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
    },
    methods: {
        changePassword() {
            this.pwChangeLoading = true
            this.$validator.validate('changePW')
            this.$validator.validate('currentPW')

            if (this.errors.any()) {
                this.pwChangeLoading = false
                return
            }

            if (this.account.currentPassword && this.account.changePassword) {
                console.log('debug')
                this.$store.dispatch('auth/changePW', this.account).then(
                    () => {
                        console.log('debug')
                        alert('success')
                        this.$router.push('/')
                    },
                    error => {
                        console.log('debug')
                        this.pwChangeLoading = false
                        this.changeMessage = error.message
                    }
                )
            }
        },
        withdrawal() {
            this.withdrawalLoading = true
            this.$validator.validate('password')

            if (this.errors.any()) {
                this.withdrawalLoading = false
                return
            }

            if (this.account.password) {
                this.$store.dispatch('auth/withdrawal', this.account).then(
                    () => {
                        alert('success')
                        this.$router.push('/')
                    },
                    error => {
                        this.withdrawalLoading = false
                        console.log(error)
                        this.withdrawalMessage = error.message
                    }
                )
            } else {
                this.withdrawalLoading = false
                return
            }
        }
    }

}
</script>