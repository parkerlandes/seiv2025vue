<template>
    <div v-if="showDetails" class="details-overlay">
      <div class="details-content">
        <!-- Close Button -->
        <button class="close-btn" @click="$emit('close')">X</button>
  
        <h2>Edit Course Details</h2>
  
        <div class="details">
          <label><strong>ID:</strong> {{ editableCourse.id }}</label>
  
          <label>
            <strong>Name:</strong>
            <input v-model="editableCourse.name" type="text" />
          </label>
  
          <label>
            <strong>Department:</strong>
            <input v-model="editableCourse.dept" type="text" />
          </label>
  
          <label>
            <strong>Course Number:</strong>
            <input v-model="editableCourse.courseNum" type="text" />
          </label>
  
          <label>
            <strong>Description:</strong>
            <textarea v-model="editableCourse.description" rows="3"></textarea>
          </label>
  
          <label>
            <strong>Level:</strong>
            <input v-model="editableCourse.courseLevel" type="text" />
          </label>
  
          <label>
            <strong>Credit Hours:</strong>
            <input v-model.number="editableCourse.hours" type="number" min="0" />
          </label>
        </div>
  
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="save-btn" @click="confirmSave">Save</button>
          <button class="cancel-btn" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch } from "vue";
  
  const props = defineProps({
    showDetails: Boolean,
    course: Object,
  });
  
  const emit = defineEmits(["close", "save"]);
  
  // Create a local copy of the course object for editing
  const editableCourse = reactive({
    id: "",
    name: "",
    dept: "",
    courseNum: "",
    description: "",
    courseLevel: "",
    hours: 0,
  });
  
  // Update editableCourse whenever a new course is passed in
  watch(
    () => props.course,
    (newCourse) => {
      if (newCourse) Object.assign(editableCourse, newCourse);
    },
    { immediate: true }
  );
  
  // Confirm and emit the save action
  function confirmSave() {
    if (confirm("Are you sure you want to save changes to this course?")) {
      emit("save", { ...editableCourse });
    }
  }
  </script>
  
  <style scoped>
  .details-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .details-content {
    background: white;
    padding: 24px;
    border-radius: 12px;
    width: 420px;
    max-width: 90%;
    position: relative;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
  
  .close-btn {
    position: absolute;
    right: 12px;
    top: 12px;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
  }
  
  .details label {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    font-size: 0.95rem;
    color: #333;
  }
  
  .details input,
  .details textarea {
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-top: 4px;
    font-size: 0.9rem;
    width: 100%;
    transition: border-color 0.2s ease;
  }
  
  .details input:focus,
  .details textarea:focus {
    border-color: #1976d2;
    outline: none;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    gap: 10px;
  }
  
  .save-btn {
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .save-btn:hover {
    background-color: #125ea2;
  }
  
  .cancel-btn {
    background-color: #eee;
    color: #333;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .cancel-btn:hover {
    background-color: #ddd;
  }
  </style>
  