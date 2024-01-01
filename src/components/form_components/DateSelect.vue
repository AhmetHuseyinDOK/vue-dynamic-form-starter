<template>
    <div class="flex flex-col gap-2">
      
      
      <div  class=" bg-white border rounded-md z-10 p-4">
        <!-- Calendar Component -->
        <div class="flex justify-between items-center mb-4">
          <button @click.prevent="changeMonth(-1)">←</button>
          <span>{{ currentMonthName }} {{ currentYear }}</span>
          <button @click.prevent="changeMonth(1)">→</button>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <div v-for="day in daysOfWeek" :key="day" class="text-center">{{ day }}</div>
          <div v-for="i in firstDayOfMonthIndex" :key="`empty-${i}`" class="text-center"></div>
          <div
            v-for="day in numberOfDaysInMonth"
            :key="day"
            class="text-center cursor-pointer"
            :class="{ 'bg-blue-200': isToday(day), 'bg-blue-100': isSelected(day) }"
            @click="selectDate(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, watch, defineProps, defineEmits } from "vue";
  import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";
  
  type ICustomDateFieldData = string;
  type ICustomDateFieldError = string;
  export type ICustomDateField = IInputField<ICustomDateFieldData, undefined, ICustomDateFieldError>
    interface Props extends IInputComponentProps<ICustomDateFieldData, ICustomDateFieldError> {
    locale?: string;
    }

const props = defineProps<Props>();
  
  const emit = defineEmits(["update:modelValue", "update:error"]);
  
  const showPicker = ref(false);
  const selectedDate = ref(new Date());
  const currentMonth = ref(new Date().getMonth());
  const currentYear = ref(new Date().getFullYear());
  
  const daysOfWeek = computed(() => Array.from({ length: 7 }, (_, i) => new Date(2021, 10, i + 1).toLocaleDateString(props.locale, { weekday: 'short' })));
  const months = computed(() => Array.from({ length: 12 }, (_, i) => new Date(2021, i, 1).toLocaleDateString(props.locale, { month: 'long' })));
  
  const currentMonthName = computed(() => months.value[currentMonth.value]);
  
  const firstDayOfMonthIndex = computed(() => {
    const d = new Date(currentYear.value, currentMonth.value, 1);
    return d.getDay();
  });
  
  const numberOfDaysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  });
  
  const formattedDate = computed(() => {
    return selectedDate.value.toLocaleDateString(props.locale);
  });
  
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
  };
  
  const isSelected = (day: number) => {
    return day === selectedDate.value.getDate() && currentMonth.value === selectedDate.value.getMonth() && currentYear.value === selectedDate.value.getFullYear();
  };
  
  const selectDate = (day: number) => {
    selectedDate.value = new Date(currentYear.value, currentMonth.value, day);
    showPicker.value = false;
    emit("update:modelValue", formattedDate.value);
    emit("update:error", props.validate?.(formattedDate.value));
  };
  
  const changeMonth = (step: number) => {
    currentMonth.value += step;
    if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value++;
    }
  };
  
  watch(selectedDate, (newValue) => {
    emit("update:modelValue", newValue.toLocaleDateString(props.locale));
    emit("update:error", props.validate?.(newValue.toLocaleDateString(props.locale)));
  });
  </script>
  
  <style scoped>
  /* Add your CSS styling here */
  </style>
  