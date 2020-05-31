import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/components/login/SignUp'
import Home from '@/components/Home'
import Login from '@/components/login/Login'

Vue.use(VueRouter);

const NotFound = { template: '<div>Not Found</div>' }

// export default new VueRouter({
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login/signUp',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        { 
            path: '*',
            component: NotFound 
        }
    ]
})

export default router