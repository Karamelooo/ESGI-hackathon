<script setup lang="ts">
import VInput from "@/components/VInput.vue";

import {reactive} from "vue";
import {useAuthStore} from "@/stores/authStore.ts";

const authStore = useAuthStore();

const state = reactive({
  email: '',
  password: ''
});

const handleLogin = () => {
  authStore.login(state.email, state.password);
};

</script>

<template>
  <div class="flex min-h-screen flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
               alt="Your Company"/>
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6" @submit.prevent="handleLogin">
              <VInput v-model="state.email"
                      name="email"
                      label="Email"
                      inputType="email"
                      placeholder="Email"
                      required
              />
              <VInput v-model="state.password"
                      name="password"
                      label="Password"
                      inputType="password"
                      placeholder="Password"
                      required
              />
              <div>
                <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 size-full object-cover"
           src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
           alt=""/>
    </div>
  </div>
</template>
