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

First we need to define 3 things
- v-model type
- error type
- extra props

```ts
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

```


## Get Started

You can simple clone this repo and tweak examples.

## RoadMap

[x] form-valid utility

[x] Handle errors from server

[x] Fetch data from remote

[x] Components with childs

[x] DateTime Component

[x] File Upload

[] Documentation

[] Visual Builder
