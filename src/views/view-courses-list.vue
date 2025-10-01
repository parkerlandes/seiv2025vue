<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-3xl font-bold mb-6">Courses List</h2>

    <p v-if="loading" class="text-gray-500">Loading courses...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="courses.length" class="space-y-4">
      <div
        v-for="course in courses"
        :key="course.courseNumber"
        class="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
      >
        <h3 class="text-xl font-semibold mb-2">{{ course.courseNumber }} - {{ course.courseName }}</h3>
        <p class="text-gray-700 mb-1"><strong>Hours:</strong> {{ course.hours }}</p>
        <p class="text-gray-700 mb-1"><strong>Level:</strong> {{ course.level }}</p>
        <p class="text-gray-700 mb-1"><strong>Description:</strong> {{ course.description }}</p>
        <p class="text-gray-700 mb-1"><strong>Department:</strong> {{ course.department }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourses } from '../services/api';

export default {
  data() {
    return {
      courses: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    getCourses()
      .then(res => {
        this.courses = res.data;
      })
      .catch(err => {
        console.error(err);
        this.error = 'Failed to load courses';
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>








  