<template>
  <form>
    <component
      v-for="field in form.fields"
      :key="field.name"
      :is="field.component"
      v-bind="field.config"
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
  fields: IFormField<any>[];
}

export interface IFormField<T> {
  component: string;
  title: string;
  config?: T;
  name: string;
}

const props = defineProps<Props>();

</script>