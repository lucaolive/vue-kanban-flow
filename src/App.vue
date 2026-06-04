<script setup lang="ts">
import {RouterView} from 'vue-router'
import ToastNotification from './components/ToastNotification.vue';
</script>

<template>
  <div>
    <RouterView />
    <ToastNotification />
  </div>
</template>
