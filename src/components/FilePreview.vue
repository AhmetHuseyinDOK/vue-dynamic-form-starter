<template>
    <div class="p-4 border rounded-lg shadow-sm">
      <!-- Image Preview -->
      <img v-if="isImage && previewUrl" :src="previewUrl" alt="Image preview" class="max-w-full h-auto rounded"/>
  
      <!-- Video Preview -->
      <video v-else-if="isVideo && previewUrl" controls class="max-w-full rounded">
        <source :src="previewUrl" :type="fileType!">
        Your browser does not support the video tag.
      </video>
  
      <!-- URL Preview -->
      <a v-else-if="isUrl" :href="previewUrl!" target="_blank" class="text-blue-600 hover:text-blue-800">{{ previewUrl }}</a>
  
      <!-- IFrame for Other File Types -->
      <iframe v-else-if="isOtherFileType && previewUrl" :src="previewUrl" class="w-full h-64 rounded"></iframe>
  
      <!-- Generic File Preview -->
      <div v-else class="text-gray-800">
        <span>{{ fileName }}</span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref, watch, type PropType } from 'vue';
  
  // Props
  const props = defineProps({
    fileOrUrl: {
      type: Object as PropType<File | string>,
      required: true
    }
  });
  
  // Reactive references
  const previewUrl = ref<string | null>(null);
  const isImage = ref(false);
  const isVideo = ref(false);
  const isUrl = ref(false);
  const isOtherFileType = ref(false);
  const fileName = ref('');
  
  // Computed property to determine the file type
  const fileType = computed(() => {
    if (props.fileOrUrl instanceof File) {
      return props.fileOrUrl.type;
    }
    return null;
  });
  
  // Watcher to update the preview
  watch(() => props.fileOrUrl, (newValue, oldValue) => {
    if (newValue instanceof File) {
      const type = newValue.type;
      isImage.value = type.startsWith('image/');
      isVideo.value = type.startsWith('video/');
      isOtherFileType.value = !(isImage.value || isVideo.value);
      fileName.value = newValue.name;
      previewUrl.value = URL.createObjectURL(newValue);
    } else if (typeof newValue === 'string') {
      isUrl.value = true;
      previewUrl.value = newValue;
      isOtherFileType.value = false;
    }
  }, { immediate: true });
  
  </script>
  