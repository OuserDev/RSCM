import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ManagePage from '../views/ManagePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManagePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router