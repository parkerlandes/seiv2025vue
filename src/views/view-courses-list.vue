<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h2 class="text-4xl font-bold mb-8 text-center text-gray-800">Courses List</h2>

    <p v-if="loading" class="text-gray-500 text-center">Loading courses...</p>
    <p v-if="error" class="text-red-500 text-center">{{ error }}</p>

    <div v-if="courses.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="course in courses"
        :key="course.courseNumber"
        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
      >
        <h3 class="text-xl font-semibold mb-2 text-gray-900">
          {{ course.courseNumber }} - {{ course.courseName }}
        </h3>
        <div class="text-gray-700 space-y-1">
          <p><span class="font-medium">Hours:</span> {{ course.hours }}</p>
          <p><span class="font-medium">Level:</span> {{ course.level }}</p>
          <p><span class="font-medium">Department:</span> {{ course.department }}</p>
          <p v-if="course.description"><span class="font-medium">Description:</span> {{ course.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseServices from '../services/courses';

export default {
  data() {
    return {
      courses: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    CourseServices.getAll()
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










  