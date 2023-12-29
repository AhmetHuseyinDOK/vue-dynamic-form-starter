<template>
    <component
      class="mt-2"
      v-for="field in fields"
      :key="field.name"
      :is="field.component"
      v-bind="field.config"
      :title="field.title"
      :name="field.name"
      :validate="field.validate"
      v-model:error="errors[field.name]"
      v-model="modelValue[field.name]"
    >
      <DynamicForm
        v-if="field.children"
        :errors="errors"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue',$event)"
        @update:errors="$emit('update:errors',$event)"
        :fields="field.children"
      >
      </DynamicForm> 
    </component>
</template>
<script setup lang="ts">
interface Props {
  modelValue: { [name: string]: any };
  errors: {[name: string]: any}
  fields: IFormField<any,any, any>[];
}

interface IBaseProps<T, E> {
  title?: string;
  error?: E;
  name: string;
  children?: IFormField<any,any,any>[];
  validate?: (data: T) => E | undefined
}


export type IComponentProps<Data,Error> = IBaseProps<Data,Error> & {
  modelValue: Data;
}

export interface IFormField<Data,Config,Error> extends IBaseProps<Data,Error> {
  component: string;
  config?: Config;
}

defineProps<Props>();

</script>