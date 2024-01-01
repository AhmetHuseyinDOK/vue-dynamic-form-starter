<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{
      title
    }}</label>
    <input
      :id="name"
      :value="modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
      class="px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
    <div v-if="error" class="text-sm text-red-800">{{error}}</div>
  </div>
</template>
  
  <script lang="ts" setup>
import { defineProps, defineEmits, type InputTypeHTMLAttribute } from "vue";
import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";

type ITextFieldData = string;
type ITextFieldConfig = {
  type?: InputTypeHTMLAttribute
};
type ITextFieldError = string;
export type ITextFieldField = IInputField<ITextFieldData,ITextFieldConfig,ITextFieldError > 
const props = defineProps<IInputComponentProps<ITextFieldData, ITextFieldError> & ITextFieldConfig>();

// Define emits
const emit = defineEmits(["update:modelValue","update:error"]);

// Method to emit value update
const updateValue = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const val = inputElement.value;
  emit("update:error", props.validate?.(val))
  emit("update:modelValue", val);
};


</script>
  
  <style scoped>
/* Add your CSS styling here */
</style>
  