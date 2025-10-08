<template>
  <div class="courses-container">

    <MenuBar
      @open-add-course="showAddDialog = true"
      @search="handleSearch"
    />

    <h2>Courses List</h2>

    <div v-if="loading" class="loading">Loading courses...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="filteredCourses.length" class="courses-grid">
      <div
        v-for="course in filteredCourses"
        :key="course.courseNum"
        class="course-card"
      >
        <div>
          <h3>{{ course.courseNum }} - {{ course.name }}</h3>
          <div class="course-info">
            <p><span>Hours:</span> {{ course.hours }}</p>
            <p><span>Level:</span> {{ course.courseLevel }}</p>
            <p><span>Department:</span> {{ course.dept }}</p>
            <p v-if="course.description"><span>Description:</span> {{ course.description }}</p>
          </div>
        </div>

        <div class="card-footer">
          <input
            type="checkbox"
            :value="course.courseNum"
            v-model="selectedCourses"
          />
          <button>View Details</button>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && !error" class="no-courses">
      No courses found.
    </div>

    <!-- Add Course Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Add New Course</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newCourse.name"
            label="Course Name"
            outlined
            dense
            required
          />
          <v-text-field
            v-model="newCourse.courseNum"
            label="Course Number"
            outlined
            dense
            required
          />
          <v-text-field
            v-model="newCourse.hours"
            label="Credit Hours"
            outlined
            dense
            type="number"
          />
          <v-text-field
            v-model="newCourse.courseLevel"
            label="Course Level"
            outlined
            dense
          />
          <v-text-field
            v-model="newCourse.dept"
            label="Department"
            outlined
            dense
          />
          <v-textarea
            v-model="newCourse.description"
            label="Description"
            outlined
            dense
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addCourse">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

//import { getCourses } from "../services/api";
<script>
import { getCourses } from "../services/api";
import coursesApi from "../services/courses.js";
import MenuBar from "../components/MenuBar.vue";

export default {
  components: { MenuBar },

  data() {
    return {
      courses: [],
      loading: true,
      error: null,
      selectedCourses: [],
      searchQuery: "",
      showAddDialog: false,
      newCourse: {
        name: "",
        courseNum: "",
        hours: "",
        courseLevel: "",
        dept: "",
        description: "",
      },
    };
  },

  computed: {
    filteredCourses() {
      if (!this.searchQuery) return this.courses;
      const query = this.searchQuery.toLowerCase();
      return this.courses.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.courseNum.toLowerCase().includes(query) ||
          (c.description && c.description.toLowerCase().includes(query)) ||
          (c.dept && c.dept.toLowerCase().includes(query))
      );
    },
  },

  mounted() {
    this.loadCourses();
  },

  methods: {
    async loadCourses(search = "") {
      try {
        const res = await coursesApi.getAll(search);
        this.courses = res.data;
      } catch (err) {
        console.error(err);
        this.error = "Failed to load courses.";
      } finally {
        this.loading = false;
      }
    },

    handleSearch(query) {
      this.searchQuery = query;
    },

    async addCourse() {
      try {
        await coursesApi.create(this.newCourse);
        this.showAddDialog = false;
        this.newCourse = {
          name: "",
          courseNum: "",
          hours: "",
          courseLevel: "",
          dept: "",
          description: "",
        };
        this.loadCourses();
      } catch (err) {
        console.error("Error adding course:", err);
      }
    },
  },
};
</script>

<style scoped>
/* ======= Course Header with Checkbox ======= */
.course-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.course-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* ======= Existing styles remain unchanged ======= */
.courses-container {
  min-height: 100vh;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #f9fafb, #e5e7eb);
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
  color: #333;
}

.courses-container h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 2.5rem;
}

.loading {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  animation: pulse 1.5s infinite ease-in-out;
}

.error {
  text-align: center;
  color: #d33;
  font-weight: 600;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.course-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  border-color: #bbb;
}

.course-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #111;
  transition: color 0.25s ease;
}

.course-card:hover h3 {
  color: #444;
}

.course-info p {
  margin: 0.25rem 0;
  color: #555;
  font-size: 0.95rem;
}

.course-info span {
  font-weight: 600;
  color: #222;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.course-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

button:hover {
  background-color: #555;
  transform: scale(1.03);
}

.no-courses {
  text-align: center;
  margin-top: 2rem;
  color: #777;
  font-size: 1.1rem;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
</style>


