# Dynamic Component Starter

This repository aims to easily create dynamic content/forms by using two files.

-  **DynamicComponent.vue** 
-  **DynamicComponentUtils.ts**

Features:

- **Dynamically** render component/forms
- Easy **validation** structure (can be integrated with any validation library of your choise)
- Use your **own components**
- Write components that can be also used **outside of dynamic form**

## How to write a dynamic form compatible components

**Every input must implement v-model and v-model:error** this can be achived by the following implementation;

First we need to define 3 things
- v-model type
- error type
- extra props


Let's start with a basic text field example;

```vue
<script setup lang="ts">
import { defineProps, defineEmits, type InputTypeHTMLAttribute } from "vue";
import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";

/**
 * Defines v-model
 */
type ITextFieldData = string;

/**
 * 
 * Defines extra props
 * 
 */
type ITextFieldConfig = {
  type?: InputTypeHTMLAttribute
};

/**
 * 
 * Defines validation result this can be string - array map literally anything
 * 
 */
type ITextFieldError = string;

/**
 *
 * Finally we define our Field Type using IInputField interface and *export* it 
 * 
 * This will be used while defining dynamic component for better type safety
 * 
 */
export type ITextFieldField = IInputField<ITextFieldData,ITextFieldConfig,ITextFieldError>

/**
 * 
 * Then we define props using IInputComponentProps
 * 
 */
const props = defineProps<IInputComponentProps<ITextFieldData, ITextFieldError> & ITextFieldConfig>();

// Let's define emits for modelValue and error
const emit = defineEmits(["update:modelValue","update:error"]);

// Method to emit value update
const updateValue = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const val = inputElement.value;
  emit("update:error", props.validate?.(val))
  emit("update:modelValue", val);
};
</script>
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
```


## Get Started

You can simply clone this repo and tweak examples.

## RoadMap

[x] form-valid utility

[x] Handle errors from server

[x] Fetch data from remote

[x] Components with childs

[x] DateTime Component

[x] File Upload

[] Documentation

[] Visual Builder
