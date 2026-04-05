<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.checkLoginStatus()
})
</script>

<template>
  <RouterView />
</template>

<style>
@import './assets/styles/globals.css';
</style>
