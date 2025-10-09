<template>
    <v-footer app height="64" class="footer-bar">
      <v-spacer />

      <!-- Delete Button -->
      <v-btn class="footer-btn delete-btn" @click="deleteAction">
        Delete
      </v-btn>
    </v-footer>
  </template>
  
  <script>
    export default {
      name: "FooterBar",
      methods: {
        deleteAction() {
          this.$emit("delete-selected");
        },
      },
    };
</script>

  
  <style scoped>
  /* ======= Footer Bar Styling ======= */
  .footer-bar {
    position: fixed;        /* stick to bottom */
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(90deg, #f8f9fa, #e9ecef, #dee2e6);
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1); /* negative Y for bottom shadow */
    display: flex;
    align-items: center;
    padding: 0 16px;
    z-index: 1000;          /* ensure it stays on top */
  }
  
  /* ======= Buttons Styling (match MenuBar) ======= */
  .footer-btn {
    font-weight: 500;
    color: #333 !important;
    text-transform: none;
    margin-left: 8px;
    transition: color 0.3s ease, transform 0.2s ease, background 0.2s ease;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    padding: 8px 16px;
  }
  
  .footer-btn:hover {
    color: #000 !important;
    background-color: #e0e0e0;
    transform: translateY(-1px);
  }
  
  /* Delete button can have red tint */
  .delete-btn {
    color: #c00 !important;
  }
  
  .delete-btn:hover {
    color: #800 !important;
  }
  
  /* Responsive tweak */
  @media (max-width: 600px) {
    .footer-btn {
      padding: 6px 12px;
      font-size: 0.9rem;
    }
  }
  </style>
  