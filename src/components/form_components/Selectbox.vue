<template>
  <div class="relative">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{
      title
    }}</label>
    <input
      :name="name"
      type="text"
      v-model="searchQuery"
      @keypress="search"
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
import { ref, watch, computed, onMounted } from "vue";
import type { IComponentProps, IFormField } from "../DynamicComponent.vue";

type SelectBoxOption = { label: string; value: string };

export interface ISelectBoxConfig  {
    options?: Array<SelectBoxOption>, 
    query?: (q: string) => Promise<Array<SelectBoxOption>> 
}

type ISelectBoxData = string;
type ISelectBoxError = string;
export type ISelectBoxField = IFormField<ISelectBoxData, ISelectBoxConfig, ISelectBoxError>
const props = defineProps<IComponentProps<ISelectBoxData, ISelectBoxError> & ISelectBoxConfig>();

// Define emits
const emit = defineEmits(["update:modelValue", "update:error"]);

// Computed property for filtered options
const filteredOptions =  ref<SelectBoxOption[]>(props.options ?? []);

// Reactive state
const searchQuery = ref();
onMounted(() => {
  search().then(() => {
    searchQuery.value =  getSelectedOptionFromValue(props.modelValue) ?? ""
  });
})

const isOpen = ref(false);

 async function search(){
  if(props.options){
    if (!searchQuery.value){
      filteredOptions.value = props.options;
    }else{
      filteredOptions.value =  props.options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    }
  } else if(props.query) {
    filteredOptions.value = await props.query(searchQuery.value);
  } else{
    throw "query or options must be defined"
  }
 }

// Select option method
const selectOption = (option: { label: string; value: string }) => {
  emit("update:modelValue", option.value);
  emit("update:error", props.validate?.(option.value));
  searchQuery.value = option.label;
  isOpen.value = false;
};

function getSelectedOptionFromValue(value: string): string | undefined {
  return filteredOptions.value.find((option) => option.value === value)?.label;
}

// Watch modelValue for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value =  getSelectedOptionFromValue(newValue) ?? ""
  }
);
</script>
  
  <style>
/* Add additional styles if needed */
</style>
  