<template>
  <div class="edit-overlay">
    <div class="edit-content">
      <button class="close-btn" @click="$emit('close')">X</button>
      <h2>Edit Course</h2>

      <form @submit.prevent="saveChanges">
        <label>
          Name:
          <input v-model="editedCourse.name" />
        </label>
        <label>
          Department:
          <input v-model="editedCourse.dept" />
        </label>
        <label>
          Course Number:
          <input v-model="editedCourse.courseNum" />
        </label>
        <label>
          Description:
          <textarea v-model="editedCourse.description"></textarea>
        </label>
        <label>
          Level:
          <input v-model="editedCourse.courseLevel" />
        </label>
        <label>
          Credit Hours:
          <input v-model="editedCourse.hours" type="number" />
        </label>

        <div class="buttons">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  showEdit: Boolean,
  course: Object
});

const emit = defineEmits(["save", "close"]);

const editedCourse = ref({ ...props.course });

watch(
  () => props.course,
  (newCourse) => {
    editedCourse.value = { ...newCourse };
  },
  { immediate: true }
);

const saveChanges = () => {
  emit("save", { ...editedCourse.value });
};

</script>

<style scoped>
.edit-overlay {
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

.edit-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 10px;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  margin-top: 4px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.save-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
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
</style>