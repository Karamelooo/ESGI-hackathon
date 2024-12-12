<script setup>
import { onMounted, ref, watch } from 'vue'

// Remplacer les données mockées par des refs qui seront remplies depuis l'API
const classes = ref([])
const courses = ref([])
const weeks = ref([
  {
    start: '2025-01-27',
    end: '2025-01-31'
  },
  // ... garder les semaines en dur car c'est du paramétrage
])
const salles = ref([])
const indispos = ref([])
const intervenants = ref([])

// Fonctions pour récupérer les données
const fetchPromotions = async () => {
  const response = await fetch('http://localhost:4000/promotions')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des promotions')
  }
  return response.json()
}

const fetchMatieres = async () => {
  const response = await fetch('http://localhost:4000/matieres')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des matières')
  }
  return response.json()
}

const fetchSalles = async () => {
  const response = await fetch('http://localhost:4000/salles')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des salles')
  }
  return response.json()
}

const fetchIndisponibilites = async () => {
  const response = await fetch('http://localhost:4000/indisponibilites')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des indisponibilités')
  }
  return response.json()
}

const fetchIntervenants = async () => {
  const response = await fetch('http://localhost:4000/intervenants')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des intervenants')
  }
  return response.json()
}

const fetchMatiereMapping = async () => {
  const response = await fetch('http://localhost:4000/matieres-mapping')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des matiereMapping')
  }
  return response.json()
}

// Chargement des données au montage du composant
onMounted(async () => {
  try {
    const [newPromotions, newMatieres, newSalles, newIndispos, newIntervenants, newMatiereMapping] = await Promise.all([
      fetchPromotions(),
      fetchMatieres(),
      fetchSalles(),
      fetchIndisponibilites(),
      fetchIntervenants(),
      fetchMatiereMapping()
    ])

    console.log('Promotions reçues:', newPromotions);
    console.log('Matières reçues:', newMatieres);
    console.log('Salles reçues:', newSalles);
    console.log('Indispos reçues:', newIndispos);
    console.log('Intervenants reçus:', newIntervenants);
    console.log('MatiereMapping reçus:', newMatiereMapping);

    // Associer les matiereMapping aux matieres
    newMatieres.forEach(matiere => {
      matiere.matiereMapping = newMatiereMapping.filter(mapping => mapping.matiereId === matiere.id);
    });

    if (newPromotions) {
      classes.value = newPromotions.map(p => ({
        id: p.id,
        name: p.name,
        students: p.students
      }))
      console.log('Classes après mapping:', classes.value);
    }
    
    if (newMatieres) {
      courses.value = newMatieres.map(m => {
        const mappings = m.matiereMapping || [];
        console.log('Mappings pour matière', m.name, ':', mappings);
        
        const totalHours = mappings.reduce((sum, mapping) => sum + (mapping.volumeHeure || 0), 0);
        console.log('Total heures:', totalHours);
        
        const teacherMapping = mappings.find(mapping => mapping.intervenantId);
        const intervenant = intervenants.value.find(int => int.id === teacherMapping?.intervenantId);
        const teacher = intervenant ? 
          `${intervenant.firstname} ${intervenant.name}` : 
          'Pas d\'intervenant';
        
        return {
          id: m.id,
          name: m.name,
          teacher: teacher,
          hours: totalHours,
          semester: m.semester,
          classes: mappings.map(mm => mm.promotionId).filter(Boolean),
          color: m.color
        };
      });
      console.log('Courses après mapping:', courses.value);
    }
    
    if (newSalles) {
      salles.value = newSalles.map(s => ({
        id: s.id,
        name: s.name,
        capacity: s.capacity
      }))
      console.log('Salles après mapping:', salles.value);
    }

    if (newIntervenants) {
      intervenants.value = newIntervenants;
      console.log('Intervenants après assignation:', intervenants.value);
    }
    
    if (newIndispos) {
      indispos.value = newIndispos.map(i => {
        const intervenant = intervenants.value.find(int => int.id === i.intervenantId);
        console.log('Intervenant trouvé pour indispo:', intervenant);
        
        const teacherName = intervenant ? 
          `${intervenant.firstname} ${intervenant.name}` : 
          `Intervenant ${i.intervenantId}`;
        
        return {
          title: `Indisponibilité - ${teacherName}`,
          teacherId: i.intervenantId,
          start: new Date(i.start).toISOString(),
          end: new Date(i.end).toISOString(),
          color: '#ff9f89'
        };
      });
      console.log('Indispos après mapping:', indispos.value);
    }

    // Après avoir tout chargé, générer et afficher les événements
    const events = generateCourseSchedule();
    console.log('Événements générés:', events);

    // Initialiser le calendrier avec les événements
    initializeCalendar(events);

  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
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
    15: [20]
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
    const prereqCourse = courses.value.find(c => c.id === prereqId);
    if (!prereqCourse) continue; // Ignorer si le cours prérequis n'existe pas
    
    const prereqEvents = events.filter(event => 
      event.title.includes(prereqCourse.name)
    );
    
    if (prereqEvents.length === 0) return false;
    
    const lastPrereqDate = new Date(Math.max(...prereqEvents.map(e => new Date(e.end))));
    if (date < lastPrereqDate) return false;
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
  let report = '';
  Object.entries(courseTracking.value).forEach(([classId, classData]) => {
    const classe = classes.value.find(c => c.id === parseInt(classId));
    if (!classe) return; // Ignorer si la classe n'existe pas
    
    report += `\n${classe.name}:\n`;
    report += `Total des heures placées: ${classData.totalHours}h\n`;
    
    Object.values(classData.courses).forEach(course => {
      if (course && course.totalHours > 0) { // Vérifier que course existe
        report += `  ${course.name}:\n`;
        const hoursStyle = course.remainingHours > 0 ? '<span class="text-danger">' : '';
        const hoursEndStyle = course.remainingHours > 0 ? '</span>' : '';
        report += `    Heures placées: ${course.plannedHours}h\n`;
        report += `    Heures restantes: ${hoursStyle}${course.remainingHours}h${hoursEndStyle}\n`;
      }
    });
  });
  return report;
}

// Déplacer l'initialisation du calendrier dans une fonction séparée
function initializeCalendar(events) {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) {
    console.error("L'élément calendar n'a pas été trouvé");
    return;
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'multiMonthYear',
    initialDate: '2025-01-27',
    editable: false,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true,
    weekends: false,
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: events,
    eventDidMount: (info) => {
      console.log('Événement monté:', info.event.title);
    }
  });

  calendar.render();
  console.log('Calendrier initialisé avec', events.length, 'événements');
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
