<template>
    <div>
      <label :for="name" class="text-sm font-semibold text-gray-700">{{ title }}</label>
      <div v-for="option in options" :key="option.value">
        <input
          type="radio"
          :value="option.value"
          :id="option.value"
          :name="name"
          v-model="data[props.name]"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
      <div v-if="err[props.name]" class="text-sm text-red-800">{{err[props.name]}}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, inject } from 'vue';
  import type { IComponentProps, IFormField } from '../DynamicForm.vue';
  
  interface IRadioBoxConfig {
    options: Array<{ label: string; value: string }>;
  }
  type ISelectBoxData = string;
  type ISelectBoxError = string;
  export type IRadioBoxField = IFormField<ISelectBoxData, IRadioBoxConfig, ISelectBoxError> 
  const props = defineProps<IComponentProps<ISelectBoxData, ISelectBoxError> & IRadioBoxConfig> ();
  
  const data = inject<any>(props.dataKey)
  const err = inject<any>(props.errorKey)
  
  </script>
  