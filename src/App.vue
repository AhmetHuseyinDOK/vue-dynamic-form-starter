<script setup lang="ts">
import { ref } from "vue";

import type {IAddressBoxField } from "./components/form_components/AddressBox.vue"
import type { ISelectBoxConfig } from "./components/form_components/SelectBox.vue";
import DynamicForm, { type IFormStructure, type IFormField } from "./components/DynamicForm.vue";
import type { ITextFieldField } from "./components/form_components/TextField.vue";
import type { ISelectBoxField } from "./components/form_components/RadioBox.vue";

const form: IFormStructure = {
  fields: [
    // Personal Information
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
        if(!(data.city && data.postal && data.state && data.street)){
          return "cannot be empty"
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
  ],
};

const data = ref({
  full_name: "ahmet",
  highest_education: "high_school",
  address: {
    "street": "Aleyna Sok"
  }
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-10">
    <dynamic-form :form="form" v-model="data"></dynamic-form>
    {{ data }}
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
