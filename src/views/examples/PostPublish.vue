<template>
    <div class="grid grid-cols-2 p-4">
      <form class="p-4 ">
        <dynamic-component :errors="errors" v-model="data" :fields="fields"></dynamic-component>
        <button class="bg-blue-600 mt-2 px-5 py-2 rounded-md text-white font-medium w-full" @click.prevent="submit">Save</button>
      </form>
      <div class="grid grid-rows-2 gap-2">
        <div>
          <h1 class="font-medium mb-2">Data</h1>
          <json-preview  :json="data"></json-preview>
        </div>
        <div>
          <h1 class="font-medium mb-2">Error</h1>
          <json-preview :json="errors"></json-preview>
        </div>
      </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import DynamicComponent, { type IField } from '../../components/DynamicComponent.vue';
  import JsonPreview from '@/components/JsonPreview.vue';
  import { isValid } from '@/components/DynamicComponentUtils';
      const data = reactive({});
      const errors = reactive({});
  
      const fields:IField<any>[] = [
          {
            component: 'TextField',
            name: 'title',
            title: 'Post Title',
            config: {
              placeholder: 'Enter image title',
            }
          },
          {
            component: 'FileUpload',
            name: 'Image',
            title: 'Cover Image',
            config: {
              placeholder: 'Upload the cover image',
            },
            validate(data: string){
              return !data ? 'Cannot be empty' : undefined
            }  
          },
          {
            component: 'TextArea',
            name: 'content',
            title: 'Content',
            config: {
              placeholder: 'Write something to change the world!',
            },
            validate(data: string){
              return !data ? 'Cannot be empty' : undefined
            }  
          } ,
          {
            component: 'DateTimeSelect',
            name: 'published_at',
            title: 'Published Time',
            config: {
              placeholder: 'Enter the time that the post will be published',
            },
            validate(data: string){
              return !data ? 'Cannot be empty' : undefined
            }  
          } 
      ]
  
      function submit(){
        if(!isValid(fields, data, errors)){
          return;
        }
  
        let serverErrors = {
        //   password: 'These credentials do not match with our records'
        }
  
        Object.assign(errors, serverErrors);
      }
  </script>