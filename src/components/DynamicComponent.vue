<template>
    <component
      class="mt-2"
      v-for="field in fields"
      :is="field.component"
      v-bind="field.config"
      :title="(field as IInputField<any,any,any>).title"
      :name="(field as IInputField<any,any,any>).name"
      :validate="(field as IInputField<any,any,any>).validate"
      v-model:error="errors[(field as IInputField<any,any,any>).name]"
      v-model="modelValue[(field as IInputField<any,any,any>).name]"
    >
      <DynamicComponent
        v-if="field.children"
        :errors="errors"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue',$event)"
        @update:errors="$emit('update:errors',$event)"
        :fields="field.children"
      >
      </DynamicComponent> 
    </component>
</template>
<script setup lang="ts">
interface Props {
  modelValue: { [name: string]: any };
  errors: {[name: string]: any}
  fields: IField<any>[];
}

export type IField<Config> = IPlainField<Config> | IInputField<any, Config,any>; 


/**
 * 
 * Base props for literally every component which is literally empty
 * Maybe extended with class etc. later.
 * 
 */
export interface IBaseProps {
  
}

interface IBaseInputProps<T, E> extends IBaseProps {
  placeholder?: string
  title?: string;
  error?: E;
  name: string;
  validate?: (data: T) => E | undefined
}

/**
 * 
 * Input props that must be implemented by every input that will be used by dynamic-component
 * 
 * 
 */
 export type IInputComponentProps<Data,Error> = IBaseInputProps<Data,Error> & {
  modelValue: Data;
}

/**
 * 
 * A base field not necessarily only for inputs but can be used for divs, sections or any non-input component
 * 
 */
export interface IBaseField<Config> {
  
  children?: IField<any>[];
  config?: Config;
  component: string;
}

export interface IPlainField<Config> extends IBaseField<Config> {
  
}

/**
 * 
 * Input fields that is used to describe the field in fields prop
 * 
 * 
 */
export interface IInputField<Data,Config,Error> extends IBaseField<Config> , IBaseInputProps<Data,Error> {
  
};

defineProps<Props>();

</script>