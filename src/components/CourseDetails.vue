<template>
  <div v-if="showDetails" class="details-overlay">
    <div class="details-content">
      <button class="close-btn" @click="$emit('close')">X</button>
      <h2>Course Details</h2>
      <div class="details">
        <p><strong>ID:</strong> {{ course.id }}</p>
        <p><strong>Name:</strong> {{ course.name }}</p>
        <p><strong>Department:</strong> {{ course.dept }}</p>
        <p><strong>Course Number:</strong> {{ course.courseNum }}</p>
        <p><strong>Description:</strong> {{ course.description }}</p>
        <p><strong>Level:</strong> {{ course.courseLevel }}</p>
        <p><strong>Credit Hours:</strong> {{ course.hours }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showDetails: Boolean,
  course: Object
});

defineEmits(["close"]);
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
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.details p {
  margin: 6px 0;
}
</style>
