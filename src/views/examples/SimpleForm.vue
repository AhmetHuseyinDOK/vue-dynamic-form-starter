<template>
  <div class="grid grid-cols-2 p-4">
    <form class="p-4 m-auto w-80">
      <dynamic-component :errors="errors" v-model="data" :fields="fields"></dynamic-component>
      <button class="bg-blue-600 mt-2 px-5 py-2 rounded-md text-white font-medium w-full" @click.prevent="submit">Login</button>
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
          name: 'email',
          title: 'Email',
          config: {
            placeholder: 'Enter your email please',
          },
          validate(data: string){
            return !data ? 'Cannot be empty' : undefined
          }  
        },
        {
          component: 'TextField',
          name: 'password',
          title: 'Password',
          config: {
            placeholder: 'Enter your password',
            type: 'password',
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
        password: 'These credentials do not match with our records'
      }

      Object.assign(errors, serverErrors);
    }
</script>