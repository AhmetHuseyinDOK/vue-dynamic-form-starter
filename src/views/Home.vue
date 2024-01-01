
<template>
<div class="h-screen w-screen flex justify-center items-center bg-slate-100">
    <div class="bg-white p-4 rounded-md">   
        <h1 class="text-center text-lg font-bold">Vue Dynamic <span>https://github.com/AhmetHuseyinDOK/vue-dynamic-form-starter</span></h1>
        <ul class="text-center">
           <li v-for="link in links" ><a class="bg-blue-400 block rounded-sm hover:bg-blue-600 mt-2 p-3 text-blue-950 font-bold" :href="link.href">{{link.title}}</a></li> 
        </ul>
        
        
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = ref([
    {
        href: '/examples/simple-form',
        title: 'Login Form'
    },
    {
        href: '/examples/complex-form',
        title: 'Application Form'
    },
    {
        href: '/examples/post-publish',
        title: 'Post Publish'
    }
]);
</script>