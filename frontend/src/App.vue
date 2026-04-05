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
  <div class="sm:bg-gray-100 sm:min-h-[100dvh] flex justify-center sm:py-8 sm:items-center">
    <div class="w-full h-[100dvh] sm:w-[400px] sm:h-[800px] sm:max-h-[90dvh] bg-white sm:rounded-[2.5rem] sm:border-[14px] sm:border-gray-900 overflow-hidden relative sm:shadow-2xl flex flex-col">
      <div class="flex-1 overflow-y-auto overflow-x-hidden relative h-full w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/styles/globals.css';
</style>
