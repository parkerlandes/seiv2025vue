<template>
  <div>
    <h2>Courses</h2>

    <p v-if="loading">Loading courses...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <ul v-if="courses.length">
      <li v-for="course in courses" :key="course.courseNumber">
        <strong>{{ course.courseNumber }}</strong> - {{ course.courseName }}  
        ({{ course.hours }} hrs, Level {{ course.level }}, Dept: {{ course.department }})
      </li>
    </ul>
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


  