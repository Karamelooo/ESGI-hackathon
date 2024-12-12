<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, any>[];
  showActions: boolean;
  showAddButton: true;
  addButtonLabel: string;
  onAdd?: () => void;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
}>();
</script>

<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">{{ title }}</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          v-if="showAddButton"
          type="button"
          class="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          @click="onAdd"
        >
          {{ addButtonLabel }}
        </button>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  {{ column.label }}
                </th>
                <th v-if="showActions" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(row, index) in rows" :key="row.id || index">
                <td v-for="column in columns" :key="column.key" class="py-4 px-3 text-sm text-gray-500">
                  {{ row[column.key] }}
                </td>
                <td v-if="showActions" class="py-4 px-3 text-sm text-gray-500">
                  <button
                    v-if="onEdit"
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="$emit('edit', row)"
                  >
                    Edit
                  </button>
                  <button
                    v-if="onDelete"
                    class="ml-4 text-red-600 hover:text-red-900"
                    @click="$emit('delete', row)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
