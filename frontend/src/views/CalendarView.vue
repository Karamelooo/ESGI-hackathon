<script setup>
import { onMounted, ref } from 'vue'
import VLayout from "@/layouts/VLayout.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const events = ref([])
const promotions = ref([])
const selectedPromotion = ref('all')
const calendar = ref(null)

function goToPlanningView() {
  router.push({
    path: '/planning',
    query: { promotion: selectedPromotion.value }
  });
}

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
    
    // filtrer les cours selon la promotion sélectionnée
    const filteredCourses = selectedPromotion.value === 'all' 
      ? coursesData 
      : coursesData.filter(course => course.promotionId === selectedPromotion.value)
    
    events.value = filteredCourses.map(course => ({
      title: `${course.matiereMapping?.matiere?.name || 'Sans nom'} - ${course.intervenant?.firstname || ''} ${course.intervenant?.name || ''} (${course.Salle?.name || 'Sans salle'}) - ${course.Promotion?.name || 'Sans classe'}`,
      start: new Date(course.start).toISOString(),
      end: new Date(course.end).toISOString(),
      color: course.matiereMapping?.matiere?.color || '#cccccc',
      extendedProps: {
        id: course.id,
        intervenantId: course.intervenantId,
        salleId: course.salleId,
        matiereMappingId: course.matiereMappingId,
        promotionId: course.promotionId
      }
    }))

    // si le calendrier existe déjà, mettre à jour ses événements
    if (calendar.value) {
      calendar.value.removeAllEvents()
      calendar.value.addEventSource(events.value)
    } else {
      // initialisation du calendrier si c'est la première fois
      const calendarEl = document.getElementById('calendar')
      if (!calendarEl) {
        console.error('Élément calendar non trouvé')
        return
      }

      calendar.value = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        editable: true,
        slotMinTime: '08:00:00',
        slotMaxTime: '19:00:00',
        locale: 'fr',
        firstDay: 1,
        allDaySlot: false,
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
        events: events.value,
        eventDrop: (info) => {
          console.log('Événement déplacé:', info.event);
        },
        eventResize: (info) => {
          console.log('Événement redimensionné:', info.event);
        },
      })

      calendar.value.render()
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  }
}

async function handlePromotionChange() {
  console.log('Promotion sélectionnée:', selectedPromotion.value)
  await fetchCourses()
}

async function saveCalendarChanges() {
  const events = calendar.value.getEvents().map(event => {
    const eventData = event.extendedProps;

    return {
      id: eventData.id,
      start: event.start,
      end: event.end,
      intervenantId: eventData.intervenantId,
      salleId: eventData.salleId,
      matiereMappingId: eventData.matiereMappingId,
      promotionId: eventData.promotionId
    };
  });

  try {
    const response = await fetch('http://localhost:4000/courses/update-multiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courses: events })
    });

    if (response.ok) {
      alert('Modifications sauvegardées avec succès');
    } else {
      throw new Error('Erreur lors de la sauvegarde');
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    alert('Erreur lors de la sauvegarde des modifications');
  }
}

onMounted(async () => {
  await fetchPromotions()
  await fetchCourses()
})
</script>

<template>
  <VLayout>
    <div class="calendar-container">
      <div class="header-container">
        <h1 class="text-base font-semibold text-gray-900">Emploi du temps</h1>
        <div class="button-group">
          <button @click="saveCalendarChanges" class="save-button">
            Sauvegarder
          </button>
          <button @click="goToPlanningView" class="generate-button">
            Générer planning
          </button>
        </div>
      </div>
      
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.generate-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.generate-button:hover {
  background-color: #45a049;
}

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

.button-group {
  display: flex;
  gap: 10px;
}

.save-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
