<script setup lang="ts">
import { ref } from "vue";

import type {IAddressBoxField } from "../../components/form_components/AddressBox.vue"
import DynamicComponent, {  type IField, type IInputField, type IPlainField } from "../../components/DynamicComponent.vue";
import type { ITextFieldField } from "../../components/form_components/TextField.vue";
import type { ISelectBoxField } from "../../components/form_components/SelectBox.vue";
import TextField from "../../components/form_components/TextField.vue";
import JsonPreview from "@/components/JsonPreview.vue";

const form: IField<any>[] =  [
    // Personal Information
    {
      component: 'div',
      config: {
        class: 'grid grid-cols-2 gap-2'
      },
      children: [
          {
            component: "TextField",
            name: "full_name",
            title: "Full Name",
            validate: (data) => data ? null : 'Full Name is required',
          },
          {
            component: "TextField",
            name: "email",
            title: "Email Address",
            validate: (data) => {
              const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              return regex.test(data) ? null : 'Invalid email format';
            },
          },
          {
            component: "TextField",
            name: "phone_number",
            title: "Phone Number",
            validate: (data) => {
              const regex = /^[0-9]{10,}$/;
              return regex.test(data) ? null : 'Invalid phone number';
            },
          } as ITextFieldField,
          {
            component: "SelectBox",
            name: "nationality",
            title: "Nationality",
            config: {
              query: async function (q){
                  //fake query
                  // can be improved
                  let data = await fetch('/countries.json').then( r => {
                  return r.json()
                  })
                  
                  if( q != null){
                  data=  data.filter( (d: any) => d.name.toLowerCase().includes(q.toLowerCase()) || d.code.toLowerCase().includes(q.toLowerCase()))
                  }
                  return data 
                  .map( (d: any) => ({
                    label: d.name,
                    value: d.code,
                  }))
              } ,
            },
          } as ISelectBoxField,
        ]
    } ,
    
    // Educational Background
    {
      component: "SelectBox",
      name: "highest_education",
      title: "Highest Education Level",
      config: {
        options: [
          { label: "High School", value: "high_school" },
          { label: "Bachelor's Degree", value: "bachelor" },
          { label: "Master's Degree", value: "master" },
          { label: "Ph.D.", value: "phd" },
          { label: "Other", value: "other" },
        ],
      },
    } as ISelectBoxField,
    {
      component: "TextField",
      name: "university",
      title: "University/School Name",
    },

    // Work Experience
    {
      component: "TextField",
      name: "company_name",
      title: "Most Recent Company Name",
    },
    {
      component: "TextField",
      name: "role",
      title: "Role/Position",
    },
    {
      component: "TextField",
      name: "work_years",
      title: "Years of Experience in this Role",
      validate: (data) => {
        const years = parseInt(data);
        return !isNaN(years) && years >= 0 ? null : 'Invalid number of years';
      },
    } as ITextFieldField,
    {
      component: "AddressBox",
      name: "address",
      title: "Full Address",
      validate(data) {
        return  {
          city: data.city == null ?  "City cannot be null" : null,
          state: data.state == null ?  "State cannot be null" : null,
          street: data.street == null ?  "Street cannot be null" : null,
          postal: data.postal == null ? "Postal cannot  be null" :  isNaN(parseInt(data.postal)) ? "Postal code must be a number" : null
        }
      },
    } as IAddressBoxField,

    // // Additional Details
    // {
    //   component: "TextArea",
    //   name: "cover_letter",
    //   title: "Cover Letter",
    // },
    // {
    //   component: "FileUpload",
    //   name: "resume",
    //   title: "Upload Resume",
    // },
  ];

const data = ref({
  full_name: "ahmet",
  highest_education: "phd",
  address: {
    "street": "Aleyna Sok"
  },
  nationality: "TR"
});
const errors = ref<any>({
  
});
function fakeErrorResponse(){
  setTimeout(() => {
    console.log('set errors');
    errors.value = {
      phone_number: "Phone number must start with +90",
      highest_education: data.value.highest_education == "high_school" ? "Are you one of those talented developers ?" : ""
    }
  }, 100)
}
</script>

<template>
    <!-- example usage of dynamic form component -->
    <div class="grid grid-cols-2">
    <form class="p-4 h-screen overflow-scroll">
      <dynamic-component :errors="errors" v-model="data" :fields="form"></dynamic-component>
      <button class="bg-blue-600 mt-2 px-5 py-2 rounded-md text-white font-medium w-full" @click.prevent="fakeErrorResponse">Login</button>
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
