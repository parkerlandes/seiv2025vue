import { createRouter, createWebHistory } from 'vue-router'
import ViewCoursesList from '../views/view-courses-list.vue'

const routes = [
  { path: '/courses', component: ViewCoursesList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
