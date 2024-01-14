
<template>
    <div class="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div class="bg-white p-10 rounded-md">
            <a href="https://github.com/AhmetHuseyinDOK/vue-dynamic-form-starter">
                <h1 class="text-center text-lg font-bold">Vue Dynamic
                    <github class="inline" />
                </h1>
            </a>
            <ul class="text-center mt-10">

                <li v-for="link in links"><a
                        class="bg-black block hover:bg-slate-900 mt-3 px-20 py-3 text-white font-bold rounded-md"
                        :href="link.href">{{ link.title }}</a></li>
            </ul>


        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import github from '@/components/icons/github.vue'
const links = ref([
    {
        href: '#/examples/simple-form',
        title: 'Login Form'
    },
    {
        href: '#/examples/complex-form',
        title: 'Application Form'
    },
    {
        href: '#/examples/post-publish',
        title: 'Post Publish'
    }
]);
</script>