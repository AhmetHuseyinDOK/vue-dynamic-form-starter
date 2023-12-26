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
    <div v-if="err" class="text-sm text-red-800">{{err}}</div>
  </div>
</template>
  
  <script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import type { IComponentProps } from "../DynamicForm.vue";

// Define props with types
const props = defineProps<IComponentProps<string>>();

// Define emits
const emit = defineEmits(["update:modelValue"]);

const err = ref()

// Method to emit value update
const updateValue = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const val = inputElement.value;
  err.value = props.validate?.(val)
  emit("update:modelValue", val);
};


</script>
  
  <style scoped>
/* Add your CSS styling here */
</style>
  