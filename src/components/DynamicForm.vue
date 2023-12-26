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

export interface IBaseProps<T> {
  title: string;
  name: string;
  validate?: (data: T) => string | undefined | null
}

export interface IComponentProps<T> extends IBaseProps<T>{
  modelValue: T;
}

 /**
  * K stands for Config
  * V stands for Data
  */
export interface IFormField<K,V> extends IBaseProps<V> {
  component: string;
  config?: K;
}

const props = defineProps<Props>();

</script>