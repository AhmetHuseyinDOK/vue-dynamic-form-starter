<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{
      title
    }}</label>
    <input
      :id="name"
      :value="modelValue"
      @input="updateValue"
      class="px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>
</template>
  
  <script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

// Define props with types
const props = defineProps({
  modelValue: String,
  title: String,
  name: String,
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Method to emit value update
const updateValue = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
};
</script>
  
  <style scoped>
/* Add your CSS styling here */
</style>
  