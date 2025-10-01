<template>
    <div>
      <h2>Courses</h2>
      <ul>
        <li v-for="course in courses" :key="course.id">
          {{ course.name }}
        </li>
      </ul>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted } from "vue";
    import api from "../services/api.js"; // <- fixed path

    const courses = ref([]);

    onMounted(async () => {
    try {
        const res = await api.get("/courses");
        courses.value = res.data;
    } catch (err) {
        console.error("Error fetching courses:", err);
    }
    });
</script>
  