<template>
  <div class="courses-container">

    <MenuBar
      @open-add-course="showAddDialog = true"
      @search="handleSearch"
    />

    <h2>Courses</h2>

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
            :value="course.id"
            v-model="selectedCourses"
          />

          <div class="button-group">
            <button @click="openCourseDetails(course)">View Details</button>
            <button @click="openCourseEdit(course)">Edit</button>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && !error"
        class="text-center text-gray-500 mt-8 text-lg"
      >
        No courses available.
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

    <CourseDetails
      v-if="showDetails"
      :course="selectedCourse"
      :showDetails="showDetails"
      @close="showDetails = false"
    />

    <CourseEdit
      v-if="showEdit"
      :showEdit="showEdit"
      :course="selectedCourse"
      @save="updateCourse"
      @close="showEdit = false"
    />


    <!-- ✅ FooterBar listens for delete event -->
    <FooterBar @delete-selected="deleteSelectedCourses" />

  </div>
</template>

<script>
//import { getCourses } from "../services/api";
import coursesApi from "../services/courses.js";
import MenuBar from "../components/MenuBar.vue";
import FooterBar from "../components/FooterBar.vue";
import CourseDetails from "../components/CourseDetails.vue";
import CourseEdit from "../components/CourseEdit.vue";


export default {
  components: { FooterBar, MenuBar, CourseDetails, CourseEdit },

  data() {
    return {
      courses: [],
      loading: true,
      error: null,
      selectedCourses: [],
      searchQuery: "",
      showAddDialog: false,
      selectedCourse: null,
      showDetails: false,
      showEdit: false,
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
    openCourseDetails(course) {
      this.selectedCourse = course;
      this.showDetails = true;
    },

    openCourseEdit(course) {
      this.selectedCourse = { ...course }; // clone so edits don’t immediately apply
      this.showEdit = true;
    },

    async updateCourse(updatedCourse) {
      try {
        await coursesApi.update(updatedCourse.id, updatedCourse);

        // update locally since backend doesn’t return new data
        const index = this.courses.findIndex(c => c.id === updatedCourse.id);
        if (index !== -1) {
          this.courses[index] = { ...updatedCourse };
          this.courses = [...this.courses]; // force reactivity
        }

        this.showEdit = false;
        alert("Course updated successfully!");
      } catch (error) {
        console.error("Error updating course:", error);
        alert("Failed to update course.");
      }
    },


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
        const res = await coursesApi.create(this.newCourse); // send to backend
        const addedCourse = res.data; // get the created course returned by backend

        // Immediately show it in the list:
        this.courses.push(addedCourse);

        // Close the dialog and reset form
        this.showAddDialog = false;
        this.newCourse = {
          name: "",
          courseNum: "",
          hours: "",
          courseLevel: "",
          dept: "",
          description: "",
        };

        // Optionally: clear any search query to make it visible
        this.searchQuery = "";
      } catch (err) {
        console.error("Error adding course:", err);
        alert("Failed to add course.");
      }
    },

    async deleteSelectedCourses() {
      if (this.selectedCourses.length === 0) {
        alert("Please select at least one course to delete.");
        return;
      }

      try {
        const confirmed = confirm("Are you sure you want to delete the selected courses?");
        if (!confirmed) return;

        await coursesApi.deleteMany(this.selectedCourses);

        // Remove deleted courses from the list immediately
        this.courses = this.courses.filter(
          c => !this.selectedCourses.includes(c.id)
        );

        this.selectedCourses = [];
        alert("Courses deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete courses.");
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

.button-group {
  display: flex;
  gap: 8px;
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