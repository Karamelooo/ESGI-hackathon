<script setup lang="ts">
import {defineProps} from "vue";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {
  EllipsisHorizontalIcon,
} from '@heroicons/vue/20/solid'


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
                  <Menu as="div">
                    <div>
                      <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span class="sr-only">Open options</span>
                        <EllipsisHorizontalIcon class="size-5" aria-hidden="true"/>
                      </MenuButton>
                    </div>

                    <transition enter-active-class=" transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                      <MenuItems
                          class="absolute right-5 z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem v-slot="{ active }">
                          <button @click="$emit('edit', row)"
                                  :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'w-full block px-4 py-2 text-sm text-start']">
                            Modifier
                          </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <button @click="$emit('delete', row)"
                                  :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'w-full block px-4 py-2 text-sm text-start']">
                            Supprimer
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </transition>
                  </Menu>
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
