import Home from '@/views/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/examples/simple-form',
      name: 'simple-form-example',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/SimpleForm.vue')
    },
    {
      path: '/examples/complex-form',
      name: 'complex-form-example',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/ComplexForm.vue')
    },
    {
      path: '/examples/post-publish',
      name: 'post-publish-example',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/PostPublish.vue')
    }
  ]
})

export default router
