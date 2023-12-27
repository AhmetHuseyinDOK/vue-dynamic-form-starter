<template>
  <form>
    <component
      class="mt-2"
      v-for="field in form.fields"
      :key="field.name"
      :is="field.component"
      v-bind="field.config"
      :title="field.title"
      :name="field.name"
      :validate="field.validate"
      v-model="modelValue[field.name]"
    ></component>
  </form>
</template>
<script setup lang="ts">
interface Props {
  form: IFormStructure;
  modelValue: { [name: string]: any };
}

export interface IFormStructure {
  fields: IFormField<any,any, any>[];
}

interface IBaseProps<T, Error> {
  title?: string;
  name: string;
  validate?: (data: T) => Error | undefined
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