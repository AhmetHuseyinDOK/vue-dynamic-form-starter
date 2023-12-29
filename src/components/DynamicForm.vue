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
      :data-key="dataKey"
      :error-key="errorKey"
    >
  </component>
  </form>
</template>
<script setup lang="ts">
interface Props {
  form: IFormStructure;
  dataKey: string;
  errorKey: string;
}

export interface IFormStructure {
  fields: IFormField<any,any, any>[];
}

interface IBaseProps<T, E> {
  title?: string;
  name: string;
  children?: IFormField<any,any,any>[]
  validate?: (data: T) => E | undefined
}

export type IComponentProps<Data,Error> = IBaseProps<Data,Error> & {
  dataKey: string;
  errorKey: string;
}

export interface IFormField<Data,Config,Error> extends IBaseProps<Data,Error> {
  component: string;
  config?: Config;
}

defineProps<Props>();

</script>