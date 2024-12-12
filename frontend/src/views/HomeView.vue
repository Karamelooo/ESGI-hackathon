<script setup lang="ts">
import Layout from "@/layouts/Layout.vue";
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import {
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/vue/20/solid'

const events = [
  {
    title: "Event 1",
    description: "Join us for an exciting event!",
    image: "https://via.placeholder.com/800x600?text=Event+1",
  },
  {
    title: "Event 2",
    description: "Don't miss this amazing experience.",
    image: "https://via.placeholder.com/800x600?text=Event+2",
  },
  {
    title: "Event 3",
    description: "Learn and network with the best.",
    image: "https://via.placeholder.com/800x600?text=Event+3",
  },
]

const meetings = [
  {
    id: 1,
    date: '10 Janvier 2025',
    time: '17:00',
    datetime: '2022-01-10T17:00',
    name: 'Symfony',
    location: 'Nation 1',
  },
]

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: {title: 'Marketing', href: '#'},
  },
]
</script>
<template>
  <Layout>
    <Carousel class="mb-8">
      <Slide v-for="slide in events.length" :key="slide">
        <div class="carousel__item h-96 w-full">
          <img v-if="events[slide - 1]" :src="events[slide - 1].image" alt="Event"
               class="h-96 w-full object-cover rounded-lg "/>
        </div>
      </Slide>

      <template #addons>
        <Navigation/>
        <Pagination/>
      </template>
    </Carousel>

    <div class="grid grid-cols-1 gap-y-16 sm:grid-cols-5 sm:gap-x-8 sm:gap-y-16">
      <div class="border-gray-200 border-r col-span-3">
        <div class="space-y-16">
          <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
              <a :href="post.category.href"
                 class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{
                  post.category.title
                }}</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <a :href="post.href">
                  <span class="absolute inset-0"/>
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">{{ post.description }}</p>
            </div>
          </article>
        </div>
      </div>
      <ol class="mt-4 divide-y divide-gray-100 text-sm/6 col-span-2">
        <li v-for="meeting in meetings" :key="meeting.id" class="relative flex gap-x-6 py-6 xl:static">
          <div class="flex-auto">
            <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">{{ meeting.name }}</h3>
            <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
              <div class="flex items-start gap-x-3">
                <dt class="mt-0.5">
                  <span class="sr-only">Date</span>
                  <CalendarIcon class="size-5 text-gray-400" aria-hidden="true"/>
                </dt>
                <dd>
                  <time :datetime="meeting.datetime">{{ meeting.date }} at {{ meeting.time }}</time>
                </dd>
              </div>
              <div class="mt-2 flex items-start gap-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400/50 xl:pl-3.5">
                <dt class="mt-0.5">
                  <span class="sr-only">Location</span>
                  <MapPinIcon class="size-5 text-gray-400" aria-hidden="true"/>
                </dt>
                <dd>{{ meeting.location }}</dd>
              </div>
            </dl>
          </div>
        </li>
      </ol>
    </div>
  </Layout>
</template>
