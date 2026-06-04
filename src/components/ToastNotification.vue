<script setup lang="ts">
import { useToast } from '../composables/useToast';
const { message, type } = useToast();
</script>

<template>
  <div v-if="message" class="toast" :class="type">
    {{ message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
}
.success { background-color: #4caf50; }
.error { background-color: #f44336; }

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>
