import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/login/SignUp'
import Login from '@/components/login/Login'
import Profile from '@/components/login/Profile'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
})

export default router