import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'
import Newsfeed from '../views/Newsfeed.vue'
import About from '../views/About.vue'
import ForgotPassword from "@/views/ForgotPassword";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/newsfeed',
    name: 'Newsfeed',
    component: Newsfeed
  },
  {
    path: '/forgotpw',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
]

const router = new VueRouter({
  routes
})

export default router
