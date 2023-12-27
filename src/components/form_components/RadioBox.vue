<template>
    <div>
      <label :for="name" class="text-sm font-semibold text-gray-700">{{ title }}</label>
      <div v-for="option in options" :key="option.value">
        <input
          type="radio"
          :value="option.value"
          :id="option.value"
          :name="name"
          v-model="internalModelValue"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, watch, ref } from 'vue';
  import type { IComponentProps } from '../DynamicForm.vue';
  
  interface IRadioBoxConfig {
    options: Array<{ label: string; value: string }>;
  }
  
  type ISelectBoxProps = IComponentProps<string> & IRadioBoxConfig 
  
  const props = defineProps<ISelectBoxProps>();
  
  const internalModelValue = ref(props.modelValue);
  
  // Define emits
const emit = defineEmits(["update:modelValue"]);

  watch(internalModelValue, (newValue) => {
    // Emit an update:modelValue event whenever the internal model value changes
    // This ensures the parent component can use v-model with this component
    emit('update:modelValue', newValue);
  });
  
  // Watch for external changes to modelValue prop and update internal state accordingly
  watch(
    () => props.modelValue,
    (newVal) => {
      internalModelValue.value = newVal;
    }
  );
  </script>
  