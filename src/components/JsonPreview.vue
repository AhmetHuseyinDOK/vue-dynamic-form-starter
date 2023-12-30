<template>
      <pre class="bg-gray-100 p-4 rounded" v-html="jsonPreview"></pre>
  </template>
  
  <script setup lang="ts">
import { computed } from 'vue';
  
  interface Props {
    json: Object
  }

  const props = defineProps<Props>()

  // Computed property for JSON preview
  const jsonPreview = computed(() => syntaxHighlight(props.json));
  function syntaxHighlight(json: any) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|true|false|null|\b\d+\b)/g, function (match: any) {
    let cls = 'text-blue-600';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-red-600 font-medium';
      } else {
        cls = 'text-green-600';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-purple-600';
    } else if (/null/.test(match)) {
      cls = 'text-gray-600';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}
  </script>
  
  <style>
  /* Add some basic styling if needed */
  </style>
  