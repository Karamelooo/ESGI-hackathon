<script setup>
import { onMounted, ref } from 'vue'

const classes = [
    {
        id: 1,
        name: 'Promotion 1',
        students: 10
    },
    {
        id: 2,
        name: 'Promotion 2',
        students: 10
    },
    {
        id: 3,
        name: 'Promotion 3',
        students: 10
    }
]

const DEFAULT_BLOCK_DURATION = 3.5;

const courses = [
  {
    id: 1,
    name: 'Développement projet lowcode',
    teacher: 'Dr. Martin',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3],
    color: '#FF6B6B',
  },
  {
    id: 2, 
    name: 'UX Research avancé',
    teacher: 'Prof. Bernard',
    hours: 17.5,
    semester: 1,
    classes: [1, 2, 3],
    color: '#4ECDC4',
  },
  {
    id: 3, 
    name: 'Design XR',
    teacher: 'Prof. Bernard',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#45B7D1',
  },
  {
    id: 4,
    name: 'Psychologie cognitive et sociologie',
    teacher: 'Dr. Petit',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#96CEB4',
  },
  {
    id: 5,
    name: 'Méthodologie et protocole de tests',
    teacher: 'Prof. Lambert',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#FFEEAD',
  },
  {
    id: 6,
    name: 'Management de projets design',
    teacher: 'Dr. Rousseau',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#D4A5A5',
  },
  {
    id: 7,
    name: 'Veille et innovation',
    teacher: 'Prof. Moreau',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#9B59B6',
  },
  {
    id: 8,
    name: 'Culture du design',
    teacher: 'Dr. Dubois',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#3498DB',
  },
  {
    id: 9,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Thomas',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#E67E22',
  },
  {
    id: 10,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 3,
    semester: 1,
    classes: [1, 2, 3],
    color: '#2ECC71',
  },
  {
    id: 11,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#F1C40F',
  },
  {
    id: 12,
    name: 'Anglais S1',
    teacher: 'Dr. Richard',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#E74C3C',
  },
  {
    id: 13,
    name: 'Pôle associatif EEMI',
    teacher: 'Prof. Garcia',
    hours: 10,
    semester: 1,
    classes: [1, 2, 3],
    color: '#1ABC9C',
  },
  {
    id: 14,
    name: 'Gamification',
    teacher: 'Dr. Martinez',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#D35400',
  },
  {
    id: 15,
    name: 'UI conversationnel',
    teacher: 'Dr. Simon',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3],
    color: '#8E44AD',
  },
  {
    id: 16,
    name: 'Récupération et exploitation de la data pour l\'UX',
    teacher: 'Prof. Laurent',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#2980B9',
  },
  {
    id: 17,
    name: 'Propriété intellectuelle et sécurité',
    teacher: 'Dr. Roux',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#27AE60',
  },
  {
    id: 18,
    name: 'Eco-conception',
    teacher: 'Prof. Vincent',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#F39C12',
  },
  {
    id: 19,
    name: 'Direction artistique',
    teacher: 'Dr. Leroy',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#C0392B',
  },
  {
    id: 20,
    name: 'UI Design',
    teacher: 'Prof. Boyer',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3],
    color: '#16A085',
  },
  {
    id: 21,
    name: 'IA ethique',
    teacher: 'Dr. Leroy',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#7F8C8D',
  },
  {
    id: 22,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Michel',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#E67E22',
  },
  {
    id: 23,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#2ECC71',
  },
  {
    id: 24,
    name: 'Prise de parole en public',
    teacher: 'Dr. Rousseau',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#BDC3C7',
  },
  {
    id: 25,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#F1C40F',
  },
  {
    id: 26,
    name: 'Anglais S2',
    teacher: 'Dr. Richard',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#E74C3C',
  },
  {
    id: 27,
    name: 'Pôle associatif EEMI S2',
    teacher: 'Prof. Garcia',
    hours: 10,
    semester: 2,
    classes: [1, 2, 3],
    color: '#1ABC9C',
  }
]

function calculateBlockDuration(remainingHours) {
  if (remainingHours >= DEFAULT_BLOCK_DURATION) {
    return DEFAULT_BLOCK_DURATION;
  }
  return remainingHours;  // Retourne les heures restantes si < 3.5
}

const weeks = [
  {
    start: '2025-01-27',
    end: '2025-01-31'
  },
  {
    start: '2025-02-24', 
    end: '2025-02-28'
  },
  {
    start: '2025-03-25',
    end: '2025-03-28'
  },
  {
    start: '2025-04-21',
    end: '2025-04-25'
  },
  {
    start: '2025-05-19',
    end: '2025-05-23'
  },
  {
    start: '2025-06-16',
    end: '2025-06-20'
  },
  {
    start: '2025-07-21',
    end: '2025-07-25'
  },
  {
    start: '2025-09-01',
    end: '2025-09-05'
  },
  {
    start: '2025-09-08',
    end: '2025-09-12'
  },
  {
    start: '2025-10-06',
    end: '2025-10-10'
  },
  {
    start: '2025-11-03',
    end: '2025-11-07'
  },
  {
    start: '2025-12-01',
    end: '2025-12-05'
  }
]


const salles = [
  {
    id: 1,
    name: 'Salle A',
    capacity: 10
  },
  {
    id: 2, 
    name: 'Salle B',
    capacity: 20
  },
  {
    id: 3,
    name: 'Salle C',
    capacity: 8
  },
  {
    id: 4,
    name: 'Salle D',
    capacity: 30
  },
  {
    id: 5,
    name: 'Salle E',
    capacity: 15
  },
  {
    id: 6,
    name: 'Salle F',
    capacity: 20
  },
  {
    id: 7,
    name: 'Salle G',
    capacity: 25
  }
]

const indispos = [
  {
    title: 'Indisponibilité - Dr. Martin',
    teacherId: 1,
    start: '2025-01-27',
    end: '2025-01-31',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Dubois',
    teacherId: 2,
    start: '2025-08-12', 
    end: '2025-08-26',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Bernard',
    teacherId: 3,
    start: '2025-09-02',
    end: '2025-09-16', 
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Lambert',
    teacherId: 4,
    start: '2025-09-16',
    end: '2025-09-30',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Petit',
    teacherId: 5,
    start: '2025-10-07',
    end: '2025-10-21',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Moreau',
    teacherId: 6,
    start: '2025-11-04',
    end: '2025-11-18',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Rousseau',
    teacherId: 7,
    start: '2025-12-02',
    end: '2025-12-16',
    color: '#ff9f89'
  }
]

function isTeacherAvailable(teacher, date) {
  return !indispos.some(indispo => {
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
  classes.forEach(classe => {
    courseTracking.value[classe.id] = {
      totalHours: 0,
      courses: {}
    };
    courses.forEach(course => {
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
    return event.title.includes(courses.find(c => c.id === courseId).name) &&
           eventDate >= weekStart && eventDate <= weekEnd;
  });
  
  return coursesThisWeek.length < constraints.weeklyLimit[courseId];
}

function checkPrerequisites(courseId, date, events) {
  if (!constraints.prerequisites[courseId]) return true;
  
  const prereqIds = constraints.prerequisites[courseId];
  for (const prereqId of prereqIds) {
    const prereqEvents = events.filter(event => 
      event.title.includes(courses.find(c => c.id === prereqId).name)
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
        const className = classes.find(c => c.id === classId).name;
        
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
  const validCourses = courses.map(course => ({
    ...course,
    classes: course.classes.filter(classId => 
      classes.some(c => c.id === classId)
    )
  })).filter(course => course.classes.length > 0);
  
  classes.forEach(classe => {
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
      
      while (remainingHours > 0 && weekIndex < weeks.length) {
        let currentDate = new Date(weeks[weekIndex].start);
        const weekEndDate = new Date(weeks[weekIndex].end);
        
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
                  
                  const className = classes.find(c => c.id === classId).name;
                  
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
  
  for (const salle of salles) {
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
    const className = classes.find(c => c.id === parseInt(classId)).name;
    report += `\n${className}:\n`;
    report += `Total des heures placées: ${classData.totalHours}h\n`;
    
    Object.values(classData.courses).forEach(course => {
      if(course.totalHours > 0) {
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

onMounted(() => {
  const calendarEl = document.getElementById('calendar');
  const events = generateCourseSchedule();
  
  console.log('Événements du calendrier:', JSON.stringify(events, null, 2));
  
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'multiMonthYear',
    //initialView: 'dayGridWeek',
    initialDate: '2025-01-26',
    editable: true,
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: events
  });

  calendar.render();
});
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
