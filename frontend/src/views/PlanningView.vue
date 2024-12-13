<script setup>
import { onMounted, ref } from 'vue'

const classes = ref([])
const courses = ref([])
const salles = ref([])
const indispos = ref([])
const weeks = ref([])

async function fetchData() {
  try {
    // Récupérer les promotions
    const promotionsResponse = await fetch('http://localhost:4000/promotions')
    const promotionsData = await promotionsResponse.json()
    console.log('Promotions brutes:', promotionsData)
    
    classes.value = promotionsData.map(promotion => ({
      id: Number(promotion.id),
      name: promotion.name || 'Sans nom',
      students: promotion.students || 0
    }))
    console.log('Classes transformées:', classes.value)

    // Récupérer les intervenants
    const intervenantsResponse = await fetch('http://localhost:4000/intervenants')
    const intervenantsData = await intervenantsResponse.json()
    console.log('Intervenants bruts:', intervenantsData)

    // D'abord récupérer les matières
    const matieresResponse = await fetch('http://localhost:4000/matieres')
    const matieresData = await matieresResponse.json()
    console.log('Matières brutes:', matieresData)

    // Puis les mappings
    const matiereMappingsResponse = await fetch('http://localhost:4000/matieres-mapping')
    const mappingsData = await matiereMappingsResponse.json()
    console.log('Mappings bruts:', mappingsData)

    courses.value = matieresData
      .filter(matiere => matiere.name)
      .map(matiere => {
        // Trouver tous les mappings pour cette matière
        const mappings = mappingsData.filter(m => Number(m.matiereId) === Number(matiere.id))
        console.log(`Mappings pour ${matiere.name}:`, mappings) // Debug

        const courseClasses = mappings.map(m => Number(m.promotionId))
        console.log(`Classes pour ${matiere.name}:`, courseClasses) // Debug
        
        return {
          id: Number(matiere.id),
          name: matiere.name,
          teacher: getTeacherFromMappings(mappings, intervenantsData),
          hours: mappings[0]?.volumeHeure || 0,
          semester: matiere.semester || 1,
          classes: courseClasses,
          color: matiere.color || '#cccccc'
        }
      })

    console.log('Mappings bruts:', mappingsData)
    console.log('Cours après transformation:', courses.value.map(c => ({
      name: c.name,
      classes: Array.from(c.classes), // Convertir le Proxy en array normal
      mappings: mappingsData.filter(m => 
        matieresData.find(mat => 
          mat.name === c.name && Number(m.matiereId) === Number(mat.id)
        )
      )
    })))

    // Récupérer les salles
    const sallesResponse = await fetch('http://localhost:4000/salles')
    const sallesData = await sallesResponse.json()
    salles.value = sallesData.map(salle => ({
      id: salle.id,
      name: salle.name || 'Sans nom',
      capacity: salle.capacite || 0
    }))

    // Récupérer les indisponibilités
    const indisposResponse = await fetch('http://localhost:4000/indisponibilites')
    const indisposData = await indisposResponse.json()
    indispos.value = indisposData.filter(indispo => indispo.intervenant).map(indispo => ({
      title: `Indisponibilité - ${indispo.intervenant?.firstname || ''} ${indispo.intervenant?.name || ''}`.trim(),
      teacherId: indispo.intervenantId,
      start: indispo.start.split('T')[0],
      end: indispo.end.split('T')[0],
      color: '#ff9f89'
    }))

    // Récupérer les périodes
    const periodesResponse = await fetch('http://localhost:4000/periodes')
    const periodesData = await periodesResponse.json()
    weeks.value = periodesData.map(periode => ({
      start: periode.start.split('T')[0],
      end: periode.end.split('T')[0]
    }))

    console.log('Classes:', classes.value)
    console.log('Courses:', courses.value)
    console.log('Salles:', salles.value)
    console.log('Indispos:', indispos.value)
    console.log('Weeks:', weeks.value)

    // Après la transformation des cours
    console.log('Mappings par classe:', mappingsData.reduce((acc, m) => {
      acc[m.promotionId] = acc[m.promotionId] || []
      acc[m.promotionId].push(m)
      return acc
    }, {}))

    console.log('Cours avec leurs classes:', courses.value.map(c => ({
      name: c.name,
      classes: c.classes
    })))

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

// Modifier onMounted pour attendre les données
onMounted(async () => {
  await fetchData()
  const calendarEl = document.getElementById('calendar')
  const events = generateCourseSchedule()
  
  console.log('Événements du calendrier:', JSON.stringify(events, null, 2))
  
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'multiMonthYear',
    initialDate: weeks.value[0]?.start || '2025-01-26',
    editable: true,
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    locale: 'fr',
    customButtons: {
      saveButton: {
        text: 'Sauvegarder',
        click: async function() {
          if (confirm('Voulez-vous sauvegarder ce planning dans la base de données ?')) {
            try {
              await saveEventsToDatabase(events)
              alert('Planning sauvegardé avec succès !')
            } catch (error) {
              alert('Erreur lors de la sauvegarde du planning')
            }
          }
        }
      }
    },
    headerToolbar: {
      left: 'prev,next today saveButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: events
  })

  calendar.render()
})

const DEFAULT_BLOCK_DURATION = 3.5;

function calculateBlockDuration(remainingHours) {
  if (remainingHours >= DEFAULT_BLOCK_DURATION) {
    return DEFAULT_BLOCK_DURATION;
  }
  return remainingHours;  // Retourne les heures restantes si < 3.5
}

function isTeacherAvailable(teacher, date) {
  return !indispos.value.some(indispo => {
    if (!indispo.title.includes(teacher)) return false;
    const indispoStart = new Date(indispo.start);
    const indispoEnd = new Date(indispo.end);
    return date >= indispoStart && date <= indispoEnd;
  });
}

function isTeacherScheduleAvailable(teacher, date, startHour, teacherSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  const scheduleKey = `${dateStr}-${teacher}`;
  
  if (!teacherSchedule[scheduleKey]) {
    return true;
  }
  
  return !teacherSchedule[scheduleKey].some(schedule => 
    schedule.startHour <= startHour && schedule.endHour > startHour
  );
}

function markTeacherAsOccupied(teacher, date, startHour, duration, teacherSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  const scheduleKey = `${dateStr}-${teacher}`;
  
  if (!teacherSchedule[scheduleKey]) {
    teacherSchedule[scheduleKey] = [];
  }
  
  teacherSchedule[scheduleKey].push({
    startHour: startHour,
    endHour: startHour + duration
  });
}

const courseTracking = ref({});

function initializeCourseTracking() {
  courseTracking.value = {};
  classes.value.forEach(classe => {
    courseTracking.value[classe.id] = {
      totalHours: 0,
      courses: {}
    };
    courses.value.forEach(course => {
      if (course.classes.includes(classe.id)) {
        courseTracking.value[classe.id].courses[course.id] = {
          name: course.name,
          plannedHours: 0,
          totalHours: course.hours,
          remainingHours: course.hours
        };
      }
    });
  });
}

const constraints = {
  weeklyLimit: {
    1: 1  // cours id 1 (dev projet) limité à 1 fois par semaine
  },
  prerequisites: {
    1: [10] // cours id 1 dépend du cours id 10
  },
  fullWeek: [23, 10]  // cours ids qui doivent occuper une semaine complète (Workshop RNCP)
}

function checkWeeklyLimit(courseId, date, events) {
  if (!constraints.weeklyLimit[courseId]) return true;
  
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  
  const coursesThisWeek = events.filter(event => {
    const eventDate = new Date(event.start);
    return event.title.includes(courses.value.find(c => c.id === courseId).name) &&
           eventDate >= weekStart && eventDate <= weekEnd;
  });
  
  return coursesThisWeek.length < constraints.weeklyLimit[courseId];
}

function checkPrerequisites(courseId, date, events) {
  if (!constraints.prerequisites[courseId]) return true;
  
  const prereqIds = constraints.prerequisites[courseId];
  for (const prereqId of prereqIds) {
    // Vérifier si le cours prérequis existe
    const prerequisCourse = courses.value.find(c => c.id === prereqId);
    if (!prerequisCourse) {
      console.warn(`Cours prérequis ${prereqId} non trouvé`);
      return false;
    }

    const prereqEvents = events.filter(event => 
      event.title.includes(prerequisCourse.name)
    );
    
    if (prereqEvents.length === 0) {
      console.log(`Aucun événement trouvé pour le prérequis ${prerequisCourse.name}`);
      return false;
    }
    
    const lastPrereqDate = new Date(Math.max(...prereqEvents.map(e => new Date(e.end))));
    if (date < lastPrereqDate) {
      console.log(`Date ${date} antérieure à la fin du prérequis ${prerequisCourse.name} (${lastPrereqDate})`);
      return false;
    }
  }
  
  return true;
}

function scheduleFullWeekCourse(course, classId, currentDate, events, roomSchedule, classSchedule, teacherSchedule) {
  if (!constraints.fullWeek.includes(course.id)) return false;
  
  const weekDays = 5; // Lundi à Vendredi
  const blocksPerDay = 3; // Nombre de créneaux par jour
  const totalBlocks = weekDays * blocksPerDay;
  
  // Vérifier si toute la semaine est disponible
  let availableBlocks = 0;
  const weekSchedule = [];
  
  for (let day = 0; day < weekDays; day++) {
    const dayDate = new Date(currentDate);
    dayDate.setDate(dayDate.getDate() + day);
    
    for (let hour = 8; hour < 19; hour += 3.5) {
      if (isTeacherAvailable(course.teacher, dayDate) &&
          isTeacherScheduleAvailable(course.teacher, dayDate, hour, teacherSchedule) &&
          isClassAvailable(classId, dayDate, hour, classSchedule)) {
        availableBlocks++;
        weekSchedule.push({ date: dayDate, hour });
      }
    }
  }
  
  if (availableBlocks >= totalBlocks) {
    weekSchedule.forEach(slot => {
      const currentRoom = findAvailableRoom(slot.date, slot.hour, roomSchedule);
      
      if (currentRoom) {
        const endHour = Math.floor(slot.hour + BLOCK_DURATION);
        const endMinutes = (BLOCK_DURATION % 1) * 60;
        const className = classes.value.find(c => c.id === classId).name;
        
        const event = {
          title: `${course.name} - ${course.teacher} (${currentRoom.name}) - ${className}`,
          start: `${slot.date.toISOString().split('T')[0]}T${String(slot.hour).padStart(2, '0')}:00:00`,
          end: `${slot.date.toISOString().split('T')[0]}T${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`,
          color: course.color
        };
        
        events.push(event);
        markRoomAsOccupied(currentRoom, slot.date, slot.hour, BLOCK_DURATION, roomSchedule);
        markClassAsOccupied(classId, slot.date, slot.hour, BLOCK_DURATION, classSchedule);
        markTeacherAsOccupied(course.teacher, slot.date, slot.hour, BLOCK_DURATION, teacherSchedule);
        courseTracking.value[classId].courses[course.id].plannedHours += BLOCK_DURATION;
        courseTracking.value[classId].courses[course.id].remainingHours -= BLOCK_DURATION;
        courseTracking.value[classId].totalHours += BLOCK_DURATION;
      }
    });
    return true;
  }
  
  return false;
}

const pauses = ref([
  {
    debut: 12,
    fin: 13,
    description: 'Pause déjeuner'
  }
]);

function isBetweenPause(heureDebut, heureFin) {
  return pauses.value.some(pause => 
    (heureDebut >= pause.debut && heureDebut < pause.fin) ||
    (heureFin > pause.debut && heureFin <= pause.fin) ||
    (heureDebut <= pause.debut && heureFin >= pause.fin)
  );
}

function generateCourseSchedule() {
  initializeCourseTracking();
  const events = [];
  let schoolHours = {
    start: 8,
    end: 19
  };
  
  const roomSchedule = {};
  const classSchedule = {};
  const teacherSchedule = {};
  
  // Filtrer les cours pour ne garder que ceux qui ont des classes existantes
  const validCourses = courses.value.map(course => ({
    ...course,
    classes: course.classes.filter(classId => 
      classes.value.some(c => c.id === classId)
    )
  })).filter(course => course.classes.length > 0);
  
  classes.value.forEach(classe => {
    classSchedule[classe.id] = {
      totalHours: 0,
      schedule: {}
    };
  });

  const sortedCourses = [...validCourses].sort((a, b) => {
    // Priorité 1: Cours semaine complète
    if (constraints.fullWeek.includes(a.id)) return -1;
    if (constraints.fullWeek.includes(b.id)) return 1;
    
    // Priorité 2: Placer les prérequis avant les cours qui en dépendent
    if (constraints.prerequisites[b.id]?.includes(a.id)) return -1;
    if (constraints.prerequisites[a.id]?.includes(b.id)) return 1;
    
    return 0;
  });
  
  sortedCourses.forEach(course => {
    course.classes.forEach(classId => {
      let remainingHours = course.hours;
      let weekIndex = 0;
      
      while (remainingHours > 0 && weekIndex < weeks.value.length) {
        let currentDate = new Date(weeks.value[weekIndex].start);
        const weekEndDate = new Date(weeks.value[weekIndex].end);
        
        // Vérifier les prérequis avant de planifier
        if (!checkPrerequisites(course.id, currentDate, events)) {
          weekIndex++;
          continue;
        }

        // Vérifier la limite hebdomadaire
        if (!checkWeeklyLimit(course.id, currentDate, events)) {
          weekIndex++;
          continue;
        }
        
        while (remainingHours > 0 && currentDate <= weekEndDate) {
          if (currentDate.getDay() !== 0 && 
              currentDate.getDay() !== 6 && 
              isTeacherAvailable(course.teacher, currentDate)) {
            
            schoolHours.start = 8;
            
            while (schoolHours.start + calculateBlockDuration(remainingHours) <= schoolHours.end && remainingHours > 0) {
              const blockDuration = calculateBlockDuration(remainingHours);
              
              if (!isBetweenPause(schoolHours.start, schoolHours.start + blockDuration)) {
                const currentRoom = findAvailableRoom(currentDate, schoolHours.start, roomSchedule);
                
                if (currentRoom && 
                    isClassAvailable(classId, currentDate, schoolHours.start, classSchedule) &&
                    isTeacherScheduleAvailable(course.teacher, currentDate, schoolHours.start, teacherSchedule)) {
                  
                  const endHour = Math.floor(schoolHours.start + blockDuration);
                  const endMinutes = (blockDuration % 1) * 60;
                  
                  const className = classes.value.find(c => c.id === classId).name;
                  
                  const formatTime = (hour) => {
                    const hours = Math.floor(hour);
                    const minutes = Math.round((hour - hours) * 60);
                    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                  };
                  
                  const event = {
                    title: `${course.name} - ${course.teacher} (${currentRoom.name}) - ${className}`,
                    start: `${currentDate.toISOString().split('T')[0]}T${formatTime(schoolHours.start)}:00`,
                    end: `${currentDate.toISOString().split('T')[0]}T${formatTime(schoolHours.start + blockDuration)}:00`,
                    color: course.color
                  };
                  
                  events.push(event);
                  markRoomAsOccupied(currentRoom, currentDate, schoolHours.start, blockDuration, roomSchedule);
                  markClassAsOccupied(classId, currentDate, schoolHours.start, blockDuration, classSchedule);
                  markTeacherAsOccupied(course.teacher, currentDate, schoolHours.start, blockDuration, teacherSchedule);
                  
                  courseTracking.value[classId].courses[course.id].plannedHours += blockDuration;
                  courseTracking.value[classId].courses[course.id].remainingHours -= blockDuration;
                  courseTracking.value[classId].totalHours += blockDuration;
                  
                  remainingHours -= blockDuration;
                }
              }
              
              // Si on est juste avant une pause, on saute directement après celle-ci
              const nextPause = pauses.value.find(pause => schoolHours.start < pause.debut);
              if (nextPause && schoolHours.start + blockDuration > nextPause.debut) {
                schoolHours.start = nextPause.fin;
              } else {
                schoolHours.start += blockDuration;
              }
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        weekIndex++;
      }
    });
  });
  
  return events;
}

function isClassAvailable(classId, date, startHour, classSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  const scheduleKey = `${dateStr}-${classId}`;
  
  if (!classSchedule[classId].schedule[scheduleKey]) {
    return true;
  }
  
  return !classSchedule[classId].schedule[scheduleKey].some(schedule => 
    schedule.startHour <= startHour && schedule.endHour > startHour
  );
}

function markClassAsOccupied(classId, date, startHour, duration, classSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  const scheduleKey = `${dateStr}-${classId}`;
  
  if (!classSchedule[classId].schedule[scheduleKey]) {
    classSchedule[classId].schedule[scheduleKey] = [];
  }
  
  classSchedule[classId].schedule[scheduleKey].push({
    startHour: startHour,
    endHour: startHour + duration
  });
}

function findAvailableRoom(date, startHour, roomSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  
  for (const salle of salles.value) {
    const roomKey = `${dateStr}-${salle.id}`;
    if (!roomSchedule[roomKey]) {
      roomSchedule[roomKey] = [];
    }
    
    const isAvailable = !roomSchedule[roomKey].some(schedule => 
      schedule.startHour <= startHour && schedule.endHour > startHour
    );
    
    if (isAvailable) {
      return salle;
    }
  }
  return null;
}

function markRoomAsOccupied(room, date, startHour, duration, roomSchedule) {
  const dateStr = date.toISOString().split('T')[0];
  const roomKey = `${dateStr}-${room.id}`;
  
  if (!roomSchedule[roomKey]) {
    roomSchedule[roomKey] = [];
  }
  
  roomSchedule[roomKey].push({
    startHour: startHour,
    endHour: startHour + duration
  });
}

function generateReport() {
  console.log('État des classes:', classes.value)
  console.log('État du courseTracking:', courseTracking.value)
  
  let report = '';
  Object.entries(courseTracking.value).forEach(([classId, classData]) => {
    const numericClassId = Number(classId);
    console.log('Traitement de la classe:', { 
      classId,
      numericClassId,
      classes: classes.value,
      foundClass: classes.value.find(c => c.id === numericClassId)
    });
    
    const className = classes.value.find(c => c.id === numericClassId)?.name || 'Classe inconnue';
    report += `\n${className}:\n`;
    report += `Total des heures placées: ${classData.totalHours}h\n`;
    
    Object.values(classData.courses).forEach(course => {
      if(course.totalHours > 0) {
        report += `  ${course.name || 'Cours inconnu'}:\n`;
        const hoursStyle = course.remainingHours > 0 ? '<span class="text-danger">' : '';
        const hoursEndStyle = course.remainingHours > 0 ? '</span>' : '';
        report += `    Heures placées: ${course.plannedHours}h\n`;
        report += `    Heures restantes: ${hoursStyle}${course.remainingHours}h${hoursEndStyle}\n`;
      }
    });
  });
  return report;
}

// Nouvelle fonction helper
function getTeacherFromMappings(mappings, intervenantsData) {
  if (!mappings || mappings.length === 0) return 'Enseignant non défini'
  const intervenant = intervenantsData.find(i => Number(i.id) === Number(mappings[0].intervenantId))
  return intervenant ? 
    `${intervenant.firstname || ''} ${intervenant.name || ''}`.trim() : 
    'Enseignant non défini'
}

async function saveEventsToDatabase(events) {
  try {
    const response = await fetch('http://localhost:4000/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ events })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    throw error
  }
}
</script>

<template>
  <h1>Planning</h1>
  <div id='calendar'></div>
  <div class="report">
    <h2>Rapport des heures de cours</h2>
    <pre>{{ generateReport() }}</pre>
  </div>
</template>

<style scoped>
.report {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.report pre {
  white-space: pre-wrap;
  font-family: monospace;
}

.text-danger {
  color: red;
}
</style>