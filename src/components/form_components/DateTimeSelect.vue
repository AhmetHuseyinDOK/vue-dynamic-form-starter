<template>
  
    <DropDown>
      <template v-slot:activator="{toggle}">
        <label :for="name" class="block text-sm font-semibold text-gray-700">{{ title }}</label>
        <input
          :id="name"
          class="px-4 w-full py-2 border rounded-md shadow-sm"
          readonly
          @click="toggle"
          :value="formattedDateTime"
        />
        <div v-if="error" class="text-sm text-red-800">{{ error }}</div>
      </template>
        <div  class="border p-2 rounded-md bg-white">
          <!-- Calendar Component -->
          <div class="flex-grow">
            <DateSelect v-model="selectedDate" :name="'date'" ></DateSelect>
          </div>

          <!-- Time Selector -->
          <div class="flex  gap-2 mt-2">
            <select v-model="hour" class="border rounded-md p-2 flex-1">
              <option v-for="h in hours" :key="h" :value="h">{{ h.toString().padStart(2, '0') }}</option>
            </select>
            <select v-model="minute" class="border rounded-md p-2 flex-1">
              <option v-for="m in minutes" :key="m" :value="m">{{ m.toString().padStart(2, '0') }}</option>
            </select>
          </div>
        </div>
      
    
    </DropDown>

   
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";
import DateSelect from "./DateSelect.vue";
import DropDown from "../DropDown.vue"
type ICustomDateTimeFieldData = string;
type ICustomDateTimeFieldError = string;
export type ICustomDateTimeField = IInputField<ICustomDateTimeFieldData, undefined, ICustomDateTimeFieldError>
const props = defineProps<IInputComponentProps<ICustomDateTimeFieldData, ICustomDateTimeFieldError>>();

// Define emits
const emit = defineEmits(["update:modelValue", "update:error"]);

const selectedDate = ref(new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format
const hour = ref(new Date().getHours());
const minute = ref(new Date().getMinutes());
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

// Computed property for formatted date-time
const formattedDateTime = computed(() => {
  return `${selectedDate.value}T${hour.value.toString().padStart(2, '0')}:${minute.value.toString().padStart(2, '0')}`;
});

// Watchers
watch([selectedDate, hour, minute], () => {
  emit("update:modelValue", formattedDateTime.value);
  emit("update:error", props.validate?.(formattedDateTime.value));
});

</script>

<style scoped>
/* Add your CSS styling here */
</style>
