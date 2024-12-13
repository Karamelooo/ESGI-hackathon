<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  inputType: {
    type: String as any,
    default: 'text',
  },
  modelValue: {
    required: true,
    type: String,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: '',
  },
  validation: {
    type: String,
    default: '',
  },
});

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
    <label :for="name" class="block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="mt-2">
      <input :type="inputType"
             v-model="inputValue"
             :name="name"
             :id="name"
             :disabled="disabled"
             class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
             :placeholder="placeholder"
      />
    </div>
  </div>
</template>
