<script setup lang="ts">
import {ChevronDownIcon} from '@heroicons/vue/16/solid'
import {ref, watch} from "vue";

const props = defineProps({
  value: String,
  name: String,
  label: String,
  required: Boolean,
  placeholder: String,
  modelValue: String,
  options: Array
})

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

</script>
<template>
  <div>
    <label :for="name"
           class="block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="mt-2 grid grid-cols-1">
      <select :id="name" :name="name"
              v-model="inputValue"
              class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6">
        <option v-if="!required" value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <ChevronDownIcon
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        aria-hidden="true"/>
    </div>
  </div>
</template>
