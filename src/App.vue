<script setup>
import ViewCoursesList from "./views/view-courses-list.vue"; 
</script>

<template>
  <div id="app">
    <h1>My App</h1>
    <router-view />   <!-- ✅ this displays your view -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
