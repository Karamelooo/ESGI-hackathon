<script setup>
import { onMounted, ref } from 'vue'
import VLayout from "@/layouts/VLayout.vue";

const events = ref([])
const promotions = ref([])
const selectedPromotion = ref('all')
const calendar = ref(null)

async function fetchPromotions() {
  try {
    const response = await fetch('http://localhost:4000/promotions')
    const data = await response.json()
    promotions.value = data
    console.log('Promotions chargées:', promotions.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des promotions:', error)
  }
}

async function fetchCourses() {
  try {
    const response = await fetch('http://localhost:4000/courses')
    const coursesData = await response.json()
    console.log('Données des cours reçues:', coursesData)
    
    events.value = coursesData
      .filter(course => selectedPromotion.value === 'all' || course.promotionId === selectedPromotion.value)
      .map(course => {
        const startDate = new Date(course.start).toISOString()
        const endDate = new Date(course.end).toISOString()
        
        const event = {
          title: `${course.matiereMapping?.matiere?.name || 'Sans nom'} - ${course.intervenant?.firstname || ''} ${course.intervenant?.name || ''} (${course.Salle?.name || 'Sans salle'})`,
          start: startDate,
          end: endDate,
          color: course.matiereMapping?.matiere?.color || '#cccccc'
        }
        
        return event
      })
    
    console.log('Événements filtrés:', events.value)

    const calendarEl = document.getElementById('calendar')
    if (!calendarEl) {
      console.error('Élément calendar non trouvé')
      return
    }

    const currentDate = calendar.value ? calendar.value.getDate() : null

    if (calendar.value) {
      calendar.value.destroy()
    }

    calendar.value = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      editable: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '19:00:00',
      locale: 'fr',
      firstDay: 1,
      buttonText: {
        today: "Aujourd'hui",
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour'
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: events.value
    })

    calendar.value.render()

    if (currentDate) {
      calendar.value.gotoDate(currentDate)
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  }
}

async function handlePromotionChange() {
  console.log('Promotion sélectionnée:', selectedPromotion.value)
  await fetchCourses()
}

onMounted(async () => {
  await fetchPromotions()
  await fetchCourses()
})
</script>

<template>
  <VLayout>
  <div class="calendar-container">
    <h1>Emploi du temps</h1>
    
    <div class="promotion-selector">
      <select 
        v-model="selectedPromotion"
        @change="handlePromotionChange"
        class="promotion-select"
      >
        <option value="all">Toutes les classes</option>
        <option 
          v-for="promotion in promotions" 
          :key="promotion.id" 
          :value="promotion.id"
        >
          {{ promotion.name }}
        </option>
      </select>
    </div>

    <div id='calendar'></div>
  </div>
  </VLayout>
</template>

<style scoped>
.calendar-container {
  margin: 20px;
  padding: 20px;
}

.promotion-selector {
  margin-bottom: 20px;
}

.promotion-select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
}

#calendar {
  margin-top: 20px;
}
</style>
