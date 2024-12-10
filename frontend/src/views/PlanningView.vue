<script setup>
import { onMounted } from 'vue'

const courses = [
  {
    id: 1,
    name: 'Développement projet lowcode',
    teacher: 'Dr. Martin',
    hours: 14,
    semester: 1
  },
  {
    id: 2, 
    name: 'UX Research avancé',
    teacher: 'Prof. Bernard',
    hours: 17.5,
    semester: 1
  },
  {
    id: 3, 
    name: 'Design XR',
    teacher: 'Prof. Bernard',
    hours: 21,
    semester: 1
  },
  {
    id: 4,
    name: 'Psychologie cognitive et sociologie',
    teacher: 'Dr. Petit',
    hours: 17.5,
    semester: 1
  },
  {
    id: 5,
    name: 'Méthodologie et protocole de tests',
    teacher: 'Prof. Lambert',
    hours: 21,
    semester: 1
  },
  {
    id: 6,
    name: 'Management de projets design',
    teacher: 'Dr. Rousseau',
    hours: 21,
    semester: 1
  },
  {
    id: 7,
    name: 'Veille et innovation',
    teacher: 'Prof. Moreau',
    hours: 14,
    semester: 1
  },
  {
    id: 8,
    name: 'Culture du design',
    teacher: 'Dr. Dubois',
    hours: 14,
    semester: 1
  },
  {
    id: 9,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Thomas',
    hours: 17.5,
    semester: 1
  },
  {
    id: 10,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 31.5,
    semester: 1
  },
  {
    id: 10,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 7,
    semester: 1
  },
  {
    id: 11,
    name: 'Anglais S1',
    teacher: 'Dr. Richard',
    hours: 14,
    semester: 1
  },
  {
    id: 12,
    name: 'Pôle associatif EEMI',
    teacher: 'Prof. Garcia',
    hours: 14,
    semester: 1
  },
  {
    id: 13,
    name: 'Gamification',
    teacher: 'Dr. Martinez',
    hours: 17.5,
    semester: 2
  },
  {
    id: 14,
    teacher: 'Prof. David',
    hours: 17.5,
    semester: 2
  },
  {
    id: 15,
    name: 'UI conversationnel',
    teacher: 'Dr. Simon',
    hours: 17.5,
    semester: 2
  },
  {
    id: 16,
    name: 'Récupération et exploitation de la data pour l\'UX',
    teacher: 'Prof. Laurent',
    hours: 14,
    semester: 2
  },
  {
    id: 17,
    name: 'Propriété intellectuelle et sécurité',
    teacher: 'Dr. Roux',
    hours: 10.5,
    semester: 2
  },
  {
    id: 18,
    name: 'Eco-conception',
    teacher: 'Prof. Vincent',
    hours: 7,
    semester: 2
  },
  {
    id: 19,
    name: 'Direction artistique',
    teacher: 'Dr. Leroy',
    hours: 24.5,
    semester: 2
  },
  {
    id: 20,
    name: 'UI Design',
    teacher: 'Prof. Boyer',
    hours: 17.5,
    semester: 2
  },
  {
    id: 21,
    name: 'IA ethique',
    teacher: 'Dr. Leroy',
    hours: 7,
    semester: 2
  },
  {
    id: 22,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Michel',
    hours: 17.5,
    semester: 2
  },
  {
    id: 23,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 31.5,
    semester: 2
  },
  {
    id: 24,
    name: 'Prise de parole en public',
    teacher: 'Dr. Rousseau',
    hours: 7,
    semester: 2
  },
  {
    id: 25,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 7,
    semester: 2
  },
  {
    id: 26,
    name: 'Anglais S2',
    teacher: 'Dr. Richard',
    hours: 14,
    semester: 2
  },
  {
    id: 27,
    name: 'Pôle associatif EEMI S2',
    teacher: 'Prof. Garcia',
    hours: 14,
    semester: 2
  }
]

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
    start: '2024-08-05',
    end: '2024-08-19',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Dubois',
    teacherId: 2,
    start: '2024-08-12', 
    end: '2024-08-26',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Bernard',
    teacherId: 3,
    start: '2024-09-02',
    end: '2024-09-16', 
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Lambert',
    teacherId: 4,
    start: '2024-09-16',
    end: '2024-09-30',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Petit',
    teacherId: 5,
    start: '2024-10-07',
    end: '2024-10-21',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Prof. Moreau',
    teacherId: 6,
    start: '2024-11-04',
    end: '2024-11-18',
    color: '#ff9f89'
  },
  {
    title: 'Indisponibilité - Dr. Rousseau',
    teacherId: 7,
    start: '2024-12-02',
    end: '2024-12-16',
    color: '#ff9f89'
  }
]

// Ajouter une fonction pour vérifier si la promotion a déjà un cours
function isPromotionBusy(date, startHour, duration, events) {
  const startTime = new Date(`${date.toISOString().split('T')[0]}T${String(startHour).padStart(2, '0')}:00:00`);
  const endTime = new Date(`${date.toISOString().split('T')[0]}T${String(startHour + duration).padStart(2, '0')}:00:00`);
  
  return events.some(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return (
      (startTime >= eventStart && startTime < eventEnd) ||
      (endTime > eventStart && endTime <= eventEnd) ||
      (startTime <= eventStart && endTime >= eventEnd)
    );
  });
}

// Fonction pour générer les créneaux de cours
function generateCourseSchedule() {
  const events = [];
  const schoolHours = {
    start: 8,
    end: 19
  };
  
  const roomSchedule = {};
  
  // Fonction pour obtenir la fin de la semaine courante
  function getCurrentWeekEnd(date) {
    const currentWeek = weeks.find(week => {
      const weekStart = new Date(week.start);
      const weekEnd = new Date(week.end);
      return date >= weekStart && date <= weekEnd;
    });
    return currentWeek ? new Date(currentWeek.end) : null;
  }
  
  courses.forEach(course => {
    let remainingHours = course.hours;
    let currentDate = new Date(weeks[0].start); // Commencer à la première semaine
    let consecutiveHours = 0;
    let courseStartTime = null;
    let currentRoom = null;
    
    while (remainingHours > 0 && currentDate <= new Date(weeks[weeks.length - 1].end)) {
      // Vérifier si la date actuelle est dans une semaine de formation
      if (weeks.some(week => {
        const weekStart = new Date(week.start);
        const weekEnd = new Date(week.end);
        return currentDate >= weekStart && currentDate <= weekEnd;
      }) && currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const teacherUnavailable = indispos.some(indispo => {
          const indispoStart = new Date(indispo.start);
          const indispoEnd = new Date(indispo.end);
          return (
            indispo.teacherId === course.id &&
            currentDate >= indispoStart &&
            currentDate <= indispoEnd
          );
        });
        
        if (!teacherUnavailable) {
          if (courseStartTime === null) {
            courseStartTime = schoolHours.start;
            
            // Vérifier si la promotion a déjà un cours à ce moment
            if (isPromotionBusy(currentDate, courseStartTime, 1, events)) {
              schoolHours.start++;
              if (schoolHours.start >= schoolHours.end) {
                schoolHours.start = 8;
                currentDate.setDate(currentDate.getDate() + 1);
              }
              continue;
            }
            
            currentRoom = findAvailableRoom(currentDate, courseStartTime, roomSchedule);
            if (!currentRoom) {
              schoolHours.start++;
              if (schoolHours.start >= schoolHours.end) {
                schoolHours.start = 8;
                currentDate.setDate(currentDate.getDate() + 1);
              }
              continue;
            }
          }
          
          // Vérifier si on peut ajouter une heure de plus et si la salle est toujours disponible
          if (!isPromotionBusy(currentDate, courseStartTime + consecutiveHours, 1, events)) {
            consecutiveHours++;
            remainingHours--;
            schoolHours.start++;
          }
          
          if (schoolHours.start >= schoolHours.end || remainingHours === 0 || 
              (getCurrentWeekEnd(currentDate) && currentDate > getCurrentWeekEnd(currentDate)) || 
              isPromotionBusy(currentDate, courseStartTime + consecutiveHours, 1, events)) {
            
            if (currentRoom && consecutiveHours > 0) {
              const event = {
                title: `${course.name} - ${course.teacher} (${currentRoom.name})`,
                start: `${currentDate.toISOString().split('T')[0]}T${String(courseStartTime).padStart(2, '0')}:00:00`,
                end: `${currentDate.toISOString().split('T')[0]}T${String(courseStartTime + consecutiveHours).padStart(2, '0')}:00:00`,
                color: '#4CAF50'
              };
              
              events.push(event);
              markRoomAsOccupied(currentRoom, currentDate, courseStartTime, consecutiveHours, roomSchedule);
            }
            
            courseStartTime = null;
            consecutiveHours = 0;
            currentRoom = null;
            
            if (schoolHours.start >= schoolHours.end) {
              schoolHours.start = 8;
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
        } else {
          if (currentRoom && consecutiveHours > 0) {
            const event = {
              title: `${course.name} - ${course.teacher} (${currentRoom.name})`,
              start: `${currentDate.toISOString().split('T')[0]}T${String(courseStartTime).padStart(2, '0')}:00:00`,
              end: `${currentDate.toISOString().split('T')[0]}T${String(courseStartTime + consecutiveHours).padStart(2, '0')}:00:00`,
              color: '#4CAF50'
            };
            events.push(event);
            markRoomAsOccupied(currentRoom, currentDate, courseStartTime, consecutiveHours, roomSchedule);
          }
          courseStartTime = null;
          consecutiveHours = 0;
          currentRoom = null;
          currentDate.setDate(currentDate.getDate() + 1);
          schoolHours.start = 8;
        }
      } else {
        // Si on n'est pas dans une semaine de formation, passer à la prochaine date
        currentDate.setDate(currentDate.getDate() + 1);
        courseStartTime = null;
        consecutiveHours = 0;
        currentRoom = null;
        schoolHours.start = 8;
      }
    }
  });
  
  return events;
}

// Fonction pour trouver une salle disponible
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

// Fonction pour marquer une salle comme occupée
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

// Modifier la configuration du calendrier
onMounted(() => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    //initialView: 'multiMonthYear',
    initialView: 'dayGridWeek',
    initialDate: '2025-01-26',
    editable: true,
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: generateCourseSchedule()
  });

  calendar.render();
});
</script>

<template>
    <h1>Planning</h1>
    <div id='calendar'></div>
  </template>
