<template>
  <v-app-bar app flat height="64" class="menu-bar">
    <v-toolbar-title class="menu-title">Project 2</v-toolbar-title>

    <v-spacer />

    <!-- Courses Button -->
    <v-btn class="menu-link" text to="/courses">
      Courses
    </v-btn>

    <!-- Square Plus Button -->
    <v-btn class="plus-btn" @click="addCourse">
      +
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "MenuBar",
  methods: {
    addCourse() {
      console.log("Plus button clicked!");
      // Add your course-adding logic here
    },
  },
};
</script>

<style scoped>
/* ======= Menu Bar Styling ======= */
.menu-bar {
  background: linear-gradient(90deg, #f8f9fa, #e9ecef, #dee2e6);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #222;
  transition: background 0.3s ease;
}

/* ======= Title ======= */
.menu-title {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  color: #222;
}

/* ======= Nav Buttons ======= */
.menu-link {
  font-weight: 500;
  color: #333 !important;
  text-transform: none;
  transition: color 0.3s ease, transform 0.2s ease;
}

/* Hover effect for nav buttons */
.menu-link:hover {
  color: #000 !important;
  transform: translateY(-2px);
}

/* ======= Square Plus Button ======= */
.plus-btn {
  margin-left: 8px;
  width: 36px;
  height: 36px;
  min-width: 36px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);

  /* Center content */
  display: grid;           /* use grid for perfect centering */
  place-items: center;     /* centers both horizontally and vertically */

  font-size: 24px;         /* larger plus sign */
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.plus-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-1px);
}

/* Active state (if using router-link-active) */
.router-link-active {
  font-weight: 600;
  color: #000 !important;
  border-bottom: 2px solid #000;
}

/* ======= Responsive tweak ======= */
@media (max-width: 600px) {
  .menu-title {
    font-size: 1.1rem;
  }
}
</style>



