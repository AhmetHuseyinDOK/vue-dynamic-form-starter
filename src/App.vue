<script setup lang="ts">
import { ref } from "vue";

import type {IAddressBoxField } from "./components/form_components/AddressBox.vue"
import type { ISelectBoxConfig } from "./components/form_components/SelectBox.vue";
import DynamicForm, {  type IFormField } from "./components/DynamicForm.vue";
import type { ITextFieldField } from "./components/form_components/TextField.vue";
import type { ISelectBoxField } from "./components/form_components/SelectBox.vue";

const form: IFormField<any,any,any>[] =  [
    // Personal Information
    {
      component: 'div',
      name: 'full_name_container',
      title: 'asd',
      config: {
        class: 'bg-yellow-400 p-4 rounded-md grid grid-cols-2 gap-2'
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
        ]
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
  <div class="max-w-2xl mx-auto p-10">
    <dynamic-form :errors="errors" :fields="form" v-model="data"></dynamic-form>
    <button @click="fakeErrorResponse">submit</button>
    <div class="grid grid-cols-2">
      <code class="block">
      {{ data }}
    </code>
    <code class="block">
      {{ errors }}
    </code>
    </div>
    
    
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
