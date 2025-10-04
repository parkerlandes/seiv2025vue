import { createRouter, createWebHistory } from "vue-router";
// Only register routes for views that exist in this project snapshot.
import ViewCoursesList from "./views/view-courses-list.vue";

const routes = [
  { path: "/", redirect: "/courses" },
  { path: "/courses", name: "courses", component: ViewCoursesList },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;