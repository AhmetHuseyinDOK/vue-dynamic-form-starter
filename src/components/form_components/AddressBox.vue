<template>
    <div>
      <label :for="`${name}-street`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Street</label>
      <input
        type="text"
        :id="`${name}-street`"
        v-model="internalModelValue.street"
        class="border p-2 rounded w-full mt-2"
      />
  
      <label :for="`${name}-city`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - City</label>
      <input
        type="text"
        :id="`${name}-city`"
        v-model="internalModelValue.city"
        class="border p-2 rounded  w-full mt-2"
      />
  
      <label :for="`${name}-state`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - State</label>
      <input
        type="text"
        :id="`${name}-state`"
        v-model="internalModelValue.state"
        class="border p-2 rounded  w-full mt-2"
      />
  
      <label :for="`${name}-postal`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Postal Code</label>
      <input
        type="text"
        :id="`${name}-postal`"
        v-model="internalModelValue.postal"
        class="border p-2 rounded  w-full mt-2"
      />
    </div>
    <div v-if="err" class="text-sm text-red-800">{{err}}</div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, watch } from 'vue';
  import type { IComponentProps, IFormField } from '@/components/DynamicForm.vue';
  
  interface IAddressBoxConfig {
    // You can expand this interface to include more detailed configurations
  }

  type IAddressBoxData =  {
    street: string;
    city: string;
    state: string;
    postal: string;
  }
  export type IAddressBoxField = IFormField<IAddressBoxData,IAddressBoxConfig>;
  const props = defineProps<IComponentProps<IAddressBoxData> & IAddressBoxConfig>();
  
  const internalModelValue = ref(props.modelValue ?? {});
  
  // Define emits
  const emit = defineEmits(["update:modelValue"]);
  
  const err = ref();

  // Emit updates when any part of the address changes
  watch(internalModelValue, (newValue) => {
    err.value = props.validate?.(newValue)
    emit('update:modelValue', newValue);
  }, { deep: true });
  
  // Watch for external changes to modelValue prop and update internal state accordingly
  watch(
    () => props.modelValue,
    (newVal) => {
      internalModelValue.value = newVal;
    }
  );
  </script>
  