<template>
  <div class="relative">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{
      title
    }}</label>
    <input
      :name="name"
      type="text"
      v-model="searchQuery"
      @focus="isOpen = true"
      class="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      :placeholder="title"
    />
    <div
      v-if="isOpen && filteredOptions.length"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
    >
      <ul>
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <div v-if="error" class="text-sm text-red-800">{{error}}</div>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, watch, computed } from "vue";
import type { IComponentProps, IFormField } from "../DynamicForm.vue";

export interface ISelectBoxConfig  {
    options: Array<{ label: string; value: string }>, 
}
type ISelectBoxData = string;
type ISelectBoxError = string;
export type ISelectBoxField = IFormField<ISelectBoxData, ISelectBoxConfig, ISelectBoxError>
const props = defineProps<IComponentProps<ISelectBoxData, ISelectBoxError> & ISelectBoxConfig>();

// Define emits
const emit = defineEmits(["update:modelValue", "update:error"]);

// Reactive state
const searchQuery = ref(getSelectedOptionFromValue(props.modelValue));
const isOpen = ref(false);

// Computed property for filtered options
const filteredOptions = computed(() => {
  if (!searchQuery.value || getSelectedOptionFromValue(searchQuery.value) == searchQuery.value) return props.options;
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Select option method
const selectOption = (option: { label: string; value: string }) => {
  emit("update:modelValue", option.value);
  emit("update:error", props.validate?.(option.value));
  searchQuery.value = option.label;
  isOpen.value = false;
};

function getSelectedOptionFromValue(value: string): string {
  return props.options.find((option) => option.value === value)?.label ?? "";
}

// Watch modelValue for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = getSelectedOptionFromValue(newValue);
  }
);
</script>
  
  <style>
/* Add additional styles if needed */
</style>
  