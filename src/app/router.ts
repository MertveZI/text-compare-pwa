import { createRouter, createWebHistory } from 'vue-router'
import ComparePage from '@/pages/ComparePage.vue'

const routes = [
  {
    path: '/',
    name: 'compare',
    component: ComparePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
