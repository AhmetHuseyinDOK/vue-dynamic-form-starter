<template>
  <div class="flex flex-col gap-2">
    <label :for="name" class="text-sm font-semibold text-gray-700">{{ title }}</label>
    <textarea
      :id="name"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="px-4 py-2 border rounded-md w-full box-border shadow-sm  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
   
    ></textarea>
    <div v-if="error" class="text-sm text-red-800">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";

type ITextFieldData = string;
type ITextFieldError = string;
export type ITextFieldField = IInputField<ITextFieldData,{}, ITextFieldError>;

const props = defineProps<IInputComponentProps<ITextFieldData, ITextFieldError>>();

// Define emits
const emit = defineEmits(["update:modelValue", "update:error"]);

// Method to emit value update
const updateValue = (event: Event) => {
  const textareaElement = event.target as HTMLTextAreaElement;
  const val = textareaElement.value;
  emit("update:error", props.validate?.(val));
  emit("update:modelValue", val);
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>
