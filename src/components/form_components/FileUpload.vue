<template>
    <div class="flex flex-col gap-2">
      <label :for="name" class="text-sm font-semibold text-gray-700">{{ title }}</label>
      <div
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="handleDrop"
        @click="triggerInputClick"
        :class="{'border-blue-500': isDragOver, 'border-gray-300': !isDragOver}"
        class="border-2 border-dashed rounded-md p-4 cursor-pointer"
      >
        <input
          ref="fileInput"
          :id="name"
          @change="updateValue"
          type="file"
          :multiple="multiple"
          :placeholder="placeholder"
          class="hidden"
        />
        <p>Drag and drop your files here or click to select files</p>
      </div>
      <div v-if="error" class="text-sm text-red-800">{{ error }}</div>
    </div>
    <FilePreview v-for="file in files" :file-or-url="file" />
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, ref, computed } from "vue";
import type { IInputComponentProps, IInputField } from "../DynamicComponent.vue";
import FilePreview from '../FilePreview.vue'
  
  type IFileFieldData = File | FileList | null;
  type IFileFieldError = string;
  type IFileFieldConfig = {
    multiple?: boolean;
  }
  export type IFileFieldField = IInputField<IFileFieldData, IFileFieldConfig, IFileFieldError>
  const props = defineProps<IInputComponentProps<IFileFieldData, IFileFieldError> & IFileFieldConfig>();
  
  // Define emits
  const emit = defineEmits(["update:modelValue","update:error"]);
  
  // Reactive property for drag state
  const isDragOver = ref(false);
  
  // Reference to the file input
  const fileInput = ref<HTMLInputElement>();
  
  // Method to emit file update
  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    emit("update:error", props.validate?.(files))
    emit("update:modelValue", files);
  };
  
  // Drag and Drop handlers
  const dragOver = () => {
    isDragOver.value = true;
  };
  
  const dragLeave = () => {
    isDragOver.value = false;
  };
  
  const handleDrop = (event: DragEvent) => {
    isDragOver.value = false;
    const files = event.dataTransfer?.files;
    if (files) {
      emit("update:error", props.validate?.(files))
      emit("update:modelValue", files);
    }
  };

  const files = computed(() => {
    if(props.modelValue == null){
        return null;
    }
    if(props.modelValue instanceof File){
        return [props.modelValue];
    }
    return [...props.modelValue]
  })
  
  // Method to trigger file input click
  const triggerInputClick = () => {
    fileInput.value?.click();
  };
  </script>
