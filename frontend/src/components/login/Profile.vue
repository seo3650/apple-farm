<template>
    <div class="container">
        <header class="jumbotron">
            <h2>Hi, {{name}}!</h2>
            <h1 class="display-4">Welcome:)</h1>
            <hr class="my-4">
        </header>
            <h5>What are your favorite products?</h5>
            <ul class="proudct-list list">
                <li v-for="item in items" :key="item.name">
                    <div v-if="item.selected" class="selected">
                        <img :src="getImgUrl(item)" alt="product image" v-on:click="cancelSelect(item.name)">
                    </div>
                    <div v-else class="unselected">
                        <img :src="getImgUrl(item)" alt="product image" v-on:click="select(item.name)">
                    </div>
                </li>
            </ul>
            <div class="form-group">
                <button class="btn btn-dark btn-block" :disables="favoriteLoading" v-on:click="apply">
                    <span class="spinner-border spinner-border-sm" v-show="favoriteLoading"></span>
                    <span>Apply</span>
                </button>
            </div>
            <div class="form-group">
                <div class="alert alert-danger" role="alert" v-if="favoritemessage">{{favoritemessage}}</div>
            </div>
            <div class="copyright">아이콘 제작자 
                <a href="https://www.flaticon.com/kr/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon">www.flaticon.com</a>
            </div>
        <body class="jumbotron">
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
        </body>
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
            favoriteLoading: false,
            favoritemessage: '',
            Airpod: require('../../assets/Airpod.jpg'),
            iMac: require('../../assets/iMac.jpg'),
            iPad: require('../../assets/iPad.jpg'),
            iPhone: require('../../assets/iPhone.jpg'),
            Macbook: require('../../assets/Macbook.jpg'),
            MacPro: require('../../assets/MacPro.jpg'),
            Watch: require('../../assets/Watch.jpg'),
            items: [],
        }
    },
    async created() {
        this.items = await this.$store.dispatch('favorite/getItems').then(
            (favorites) => { 
                return favorites
            },
            error => {
                this.favoriteLoading = false
                this.favoriteMessage = error.message
            }
        )
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
                this.$store.dispatch('auth/changePW', this.account).then(
                    () => {
                        alert('success')
                        this.$router.push('/')
                    },
                    error => {
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
                        this.withdrawalMessage = error.message
                    }
                )
            } else {
                this.withdrawalLoading = false
                return
            }
        },
        getImgUrl(item) {
            var images = require.context('../../assets/')
            return images('./' + item.name + "_icon" + ".png")
        },
        select(name) {
            this.items.filter(function(obj) {
                return obj.name === name
            })[0].selected = true
        },
        cancelSelect(name) {
            this.items.filter(function(obj) {
                return obj.name === name
            })[0].selected = false
        },
        apply() {
            this.items = this.$store.dispatch('favorite/setItems', this.items).then(
                () => {
                    this.favoriteMessage = "success"
                },
                error => {
                    this.favoriteLoading = false
                    this.favoriteMessage = error.message
                }
            )
            this.$router.push('/')
        },
    },
}
</script>

<style scoped>
.copyright {
    font-size: 0.1em;
    float: right;
}
img {
    width: 100px;
}
ul li{
    list-style:none;
    float: left;
    /* display: inline; */
    outline: 1px;
    margin: 10px 10px 10px 10px;
}
.unselected .selected {
    width: 30%;
}
.unselected:hover {
    opacity: 0.5;
}
.selected {
    opacity: 0.5;
}
.proudct-list:after {
    content: "";
    clear: both;
    display: block;
}
</style>