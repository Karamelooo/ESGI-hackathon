<script setup>
import { onMounted, ref } from 'vue'
import VLayout from "@/layouts/VLayout.vue";
const events = ref([])

async function fetchCourses() {
  try {
    const response = await fetch('http://localhost:4000/courses')
    const coursesData = await response.json()
    console.log('Données des cours reçues:', coursesData)
    
    events.value = coursesData.map(course => {
      // Formatage explicite des dates
      const startDate = new Date(course.start).toISOString()
      const endDate = new Date(course.end).toISOString()
      
      const event = {
        title: `${course.matiereMapping?.matiere?.name || 'Sans nom'} - ${course.intervenant?.firstname || ''} ${course.intervenant?.name || ''} (${course.Salle?.name || 'Sans salle'}) - ${course.Promotion?.name || 'Sans promotion'}`,
        start: startDate,
        end: endDate,
        color: course.matiereMapping?.matiere?.color || '#cccccc'
      }
      
      console.log('Événement créé:', event)
      return event
    })
    
    console.log('Tous les événements:', events.value)

    const calendarEl = document.getElementById('calendar')
    if (!calendarEl) {
      console.error('Élément calendar non trouvé')
      return
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'multiMonthYear',
      initialDate: '2025-01-26',
      editable: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '19:00:00',
      locale: 'fr',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: events.value
    })

    console.log('Calendar configuration:', {
      elementExists: !!calendarEl,
      eventsCount: events.value.length,
      firstEvent: events.value[0]
    })

    calendar.render()
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  }
}

onMounted(async () => {
  await fetchCourses()
})
</script>

<template>
  <VLayout>
    <h1>Emploi du temps</h1>
    <div id='calendar'></div>
  </VLayout>
</template>

<style scoped>
#calendar {
  margin: 20px;
  padding: 20px;
}
</style>
