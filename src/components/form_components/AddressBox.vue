<template>
    <div>
      <label :for="`${name}-street`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Street</label>
      <input
        type="text"
        :id="`${name}-street`"
        v-model="internalModelValue.street"
        class="border p-2 rounded w-full mt-2"
      />
      <div v-if="error?.street" class="text-sm text-red-800">{{error?.street}}</div>
      <label :for="`${name}-city`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - City</label>
      <input
        type="text"
        :id="`${name}-city`"
        v-model="internalModelValue.city"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="error?.city" class="text-sm text-red-800">{{error?.city}}</div>
      <label :for="`${name}-state`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - State</label>
      <input
        type="text"
        :id="`${name}-state`"
        v-model="internalModelValue.state"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="error?.state" class="text-sm text-red-800">{{error?.state}}</div>
      <label :for="`${name}-postal`" class="text-sm font-semibold text-gray-700 mt-2">{{ title }} - Postal Code</label>
      <input
        type="text"
        :id="`${name}-postal`"
        v-model="internalModelValue.postal"
        class="border p-2 rounded  w-full mt-2"
      />
      <div v-if="error?.postal" class="text-sm text-red-800">{{error?.postal}}</div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, watch } from 'vue';
  import type { IComponentProps, IFormField } from '@/components/DynamicComponent.vue';
  
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
  
  const internalModelValue = ref(props.modelValue ?? {});
  
  // Define emits
  const emit = defineEmits(["update:modelValue","update:error"]);

  // Emit updates when any part of the address changes
  watch(internalModelValue, (newValue) => {
    emit("update:error", props.validate?.(newValue))
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
  