<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h2
        class="text-5xl font-extrabold mb-10 text-center text-gray-800 tracking-tight"
      >
        Courses List
      </h2>

      <p v-if="loading" class="text-gray-500 text-center text-lg animate-pulse">
        Loading courses...
      </p>
      <p v-if="error" class="text-red-500 text-center text-lg">
        {{ error }}
      </p>

      <div
        v-if="courses.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="course in courses"
          :key="course.courseNumber"
          class="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-6 flex flex-col justify-between"
        >
          <div>
            <h3
              class="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors"
            >
              {{ course.courseNum }} - {{ course.name }}
            </h3>

            <div class="text-gray-700 space-y-1">
              <p>
                <span class="font-medium text-gray-800">Hours:</span>
                {{ course.hours }}
              </p>
              <p>
                <span class="font-medium text-gray-800">Level:</span>
                {{ course.courseLevel }}
              </p>
              <p>
                <span class="font-medium text-gray-800">Department:</span>
                {{ course.dept }}
              </p>
              <p v-if="course.description">
                <span class="font-medium text-gray-800">Description:</span>
                <span class="text-gray-600">{{ course.description }}</span>
              </p>
            </div>
          </div>

          <div class="mt-5 text-right">
            <button
              class="mt-3 px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <div
        v-else-if="!loading && !error"
        class="text-center text-gray-500 mt-8 text-lg"
      >
        No courses available.
      </div>
    </div>
  </div>
</template>

<script>
import { getCourses } from "../services/api";

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
      .then((res) => {
        this.courses = res.data;
      })
      .catch((err) => {
        console.error(err);
        this.error = "Failed to load courses";
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
  /* Extra polish for professional look */
  .group {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .group:hover {
    transform: translateY(-6px);
  }

  button {
    letter-spacing: 0.02em;
  }

  /* Add a soft fade-in for the page */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  div[max-w-6xl] {
    animation: fadeIn 0.5s ease forwards;
  }
</style>
