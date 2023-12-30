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
      <div v-if="error" class="text-sm text-red-800">{{error}}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, watch, ref } from 'vue';
  import type { IInputComponentProps, IInputField } from '../DynamicComponent.vue';
  
  interface IRadioBoxConfig {
    options: Array<{ label: string; value: string }>;
  }
  type ISelectBoxData = string;
  type ISelectBoxError = string;
  export type IRadioBoxField = IInputField<ISelectBoxData, IRadioBoxConfig, ISelectBoxError> 
  const props = defineProps<IInputComponentProps<ISelectBoxData, ISelectBoxError> & IRadioBoxConfig> ();
  
  const internalModelValue = ref(props.modelValue);
  
  // Define emits
const emit = defineEmits(["update:modelValue","update:error"]);

  watch(internalModelValue, (newValue) => {
    // Emit an update:modelValue event whenever the internal model value changes
    // This ensures the parent component can use v-model with this component
    emit("update:error", props.validate?.(newValue));
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
  