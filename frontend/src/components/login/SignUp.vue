<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <form name="form" @submit.prevent="handleRegister">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="Name">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="name"
                            v-model="account.name"
                            v-validate="'required'"
                        />
                        <div
                            class="alert-danger"
                            v-if="submitted && errors.has('name')"
                        >{{errors.first('name')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="ID">ID</label>
                        <input
                            type="text"
                            class="form-control"
                            name="ID"
                            v-model="account.id"
                            v-validate="'required|min:4|max:15'"
                        />
                        <div
                            class="alert-danger"
                            v-if="submitted && errors.has('ID')"
                        >{{errors.first('ID')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            name="password"
                            v-model="account.password"
                            v-validate="'required|min:4|max:15'"
                        />
                        <div
                            class="alert-danger"
                            v-if="submitted && errors.has('password')"
                        >{{errors.first('password')}}</div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-dark btn-block">Sign Up</button>
                    </div>
                </div>
            </form>
            <div
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
                v-if="message"
            >{{message}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'signUp',
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    },
    data: function () {
        return {
            account: {
                id: '',
                password: '',
                name: ''
            },
            submitted: false,
            successful: false,
            message: ''
        }
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push('/')
        }
    },
    methods: {
        handleRegister() {
            this.message = ''
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.$store.dispatch('auth/signUp', this.account).then(
                        () => {
                            this.successful = true
                            this.$router.push('/profile')
                        },
                        error => {
                            this.message = error.message
                            this.successful = false;
                        }
                    )
                }
            })
        }
    }
}
</script>

<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>