<template>
    <div ref="dropdownRef" class="relative">
      
        <slot name="activator" :toggle="toggleDropdown"></slot>
      
      <div v-if="isOpen" class="absolute mt-2 py-2 bg-white shadow-lg rounded z-50">
        <slot :toggle="toggleDropdown"></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const dropdownRef = ref<HTMLElement | null>(null);
  const isOpen = ref(false);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  