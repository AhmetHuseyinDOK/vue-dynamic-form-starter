<template>
    <div>
      <label :for="`${name}-street`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Street</label>
      <input
        type="text"
        :id="`${name}-street`"
        v-model="data[props.name].street"
        class="border p-2 rounded w-full mt-2"
      />
      <div v-if="err[props.name]?.street" class="text-sm text-red-800">{{err[props.name]?.street}}</div>
      <label :for="`${name}-city`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - City</label>
      <input
        type="text"
        :id="`${name}-city`"
        v-model="data[props.name].city"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="err[props.name]?.city" class="text-sm text-red-800">{{err[props.name]?.city}}</div>
      <label :for="`${name}-state`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - State</label>
      <input
        type="text"
        :id="`${name}-state`"
        v-model="data[props.name].state"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="err[props.name]?.state" class="text-sm text-red-800">{{err[props.name]?.state}}</div>
      <label :for="`${name}-postal`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Postal Code</label>
      <input
        type="text"
        :id="`${name}-postal`"
        v-model="data[props.name].postal"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="err[props.name]?.postal" class="text-sm text-red-800">{{err[props.name]?.postal}}</div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { defineProps, inject, ref, watch } from 'vue';
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
  type IAddressBoxError = {
    street: string;
    city: string;
    state: string;
    postal: string;
  }
  export type IAddressBoxField = IFormField<IAddressBoxData,IAddressBoxConfig, IAddressBoxError>;
  const props = defineProps<IComponentProps<IAddressBoxData,IAddressBoxError> & IAddressBoxConfig>();
  const data = inject<any>(props.dataKey)
  const err = inject<any>(props.errorKey)
    
  // Emit updates when any part of the address changes
  watch(data[props.name], (newValue: any) => {
    err[props.name] = props.validate?.(newValue)
  }, { deep: true });
  
  </script>
  