<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{
      title
    }}</label>
    <input
      :id="name"
      v-model="data[props.name]"
      @input="err[props.name] = validate?.(data[props.name])"
      class="px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
    <div v-if="err[props.name]" class="text-sm text-red-800">{{err[props.name]}}</div>
  </div>
</template>
  
<script lang="ts" setup>
import { defineProps, inject} from "vue";
import type { IComponentProps, IFormField } from "../DynamicForm.vue";

type ITextFieldData = string;
type ITextFieldConfig = {};
type ITextFieldError = string;
export type ITextFieldField = IFormField<ITextFieldData,ITextFieldConfig,ITextFieldError > 
const props = defineProps<IComponentProps<ITextFieldData, ITextFieldError> & ITextFieldConfig>();

const data = inject<any>(props.dataKey)
const err = inject<any>(props.errorKey)

</script>
  
<style scoped>
/* Add your CSS styling here */
</style>
  