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
  fields: IFormField<any,any>[];
}

interface IBaseProps<T> {
  title?: string;
  name: string;
  validate?: (data: T) => string | undefined | null
}


export type IComponentProps<Data> = IBaseProps<Data> & {
  modelValue: Data;
}

export interface IFormField<Data,Config> extends IBaseProps<Data> {
  component: string;
  config?: Config;
}

const props = defineProps<Props>();

</script>