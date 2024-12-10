<script setup>
import { onMounted } from 'vue'

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

const courses = [
  {
    id: 1,
    name: 'Développement projet lowcode',
    teacher: 'Dr. Martin',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 2, 
    name: 'UX Research avancé',
    teacher: 'Prof. Bernard',
    hours: 17.5,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 3, 
    name: 'Design XR',
    teacher: 'Prof. Bernard',
    hours: 21,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 4,
    name: 'Psychologie cognitive et sociologie',
    teacher: 'Dr. Petit',
    hours: 17.5,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 5,
    name: 'Méthodologie et protocole de tests',
    teacher: 'Prof. Lambert',
    hours: 21,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 6,
    name: 'Management de projets design',
    teacher: 'Dr. Rousseau',
    hours: 21,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 7,
    name: 'Veille et innovation',
    teacher: 'Prof. Moreau',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 8,
    name: 'Culture du design',
    teacher: 'Dr. Dubois',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 9,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Thomas',
    hours: 17.5,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 10,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 31.5,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 10,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 7,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 11,
    name: 'Anglais S1',
    teacher: 'Dr. Richard',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 12,
    name: 'Pôle associatif EEMI',
    teacher: 'Prof. Garcia',
    hours: 14,
    semester: 1,
    classes: [1, 2, 3]
  },
  {
    id: 13,
    name: 'Gamification',
    teacher: 'Dr. Martinez',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 14,
    teacher: 'Prof. David',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 15,
    name: 'UI conversationnel',
    teacher: 'Dr. Simon',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 16,
    name: 'Récupération et exploitation de la data pour l\'UX',
    teacher: 'Prof. Laurent',
    hours: 14,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 17,
    name: 'Propriété intellectuelle et sécurité',
    teacher: 'Dr. Roux',
    hours: 10.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 18,
    name: 'Eco-conception',
    teacher: 'Prof. Vincent',
    hours: 7,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 19,
    name: 'Direction artistique',
    teacher: 'Dr. Leroy',
    hours: 24.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 20,
    name: 'UI Design',
    teacher: 'Prof. Boyer',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 21,
    name: 'IA ethique',
    teacher: 'Dr. Leroy',
    hours: 7,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 22,
    name: 'Projets pratiques et études de cas',
    teacher: 'Prof. Michel',
    hours: 17.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 23,
    name: 'Workshop RNCP',
    teacher: 'Dr. Robert',
    hours: 31.5,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 24,
    name: 'Prise de parole en public',
    teacher: 'Dr. Rousseau',
    hours: 7,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 25,
    name: 'Accompagnement mémoires',
    teacher: 'Prof. Michel',
    hours: 7,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 26,
    name: 'Anglais S2',
    teacher: 'Dr. Richard',
    hours: 14,
    semester: 2,
    classes: [1, 2, 3]
  },
  {
    id: 27,
    name: 'Pôle associatif EEMI S2',
    teacher: 'Prof. Garcia',
    hours: 14,
    semester: 2,
    classes: [1, 2, 3]
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

function generateCourseSchedule() {
  const events = [];
  let schoolHours = {
    start: 8,
    end: 19
  };
  
  const roomSchedule = {};
  const classSchedule = {};
  const teacherSchedule = {};
  const BLOCK_DURATION = 3.5;
  
  classes.forEach(classe => {
    classSchedule[classe.id] = {
      totalHours: 0,
      schedule: {}
    };
  });
  
  courses.forEach(course => {
    course.classes.forEach(classId => {
      let remainingHours = course.hours;
      let weekIndex = 0;
      
      while (remainingHours > 0 && weekIndex < weeks.length) {
        let currentDate = new Date(weeks[weekIndex].start);
        const weekEndDate = new Date(weeks[weekIndex].end);
        
        while (remainingHours > 0 && currentDate <= weekEndDate) {
          if (currentDate.getDay() !== 0 && 
              currentDate.getDay() !== 6 && 
              isTeacherAvailable(course.teacher, currentDate)) {
            
            schoolHours.start = 8;
            
            while (schoolHours.start + BLOCK_DURATION <= schoolHours.end && remainingHours > 0) {
              const currentRoom = findAvailableRoom(currentDate, schoolHours.start, roomSchedule);
              
              if (currentRoom && 
                  isClassAvailable(classId, currentDate, schoolHours.start, classSchedule) &&
                  isTeacherScheduleAvailable(course.teacher, currentDate, schoolHours.start, teacherSchedule)) {
                
                const endHour = Math.floor(schoolHours.start + BLOCK_DURATION);
                const endMinutes = (BLOCK_DURATION % 1) * 60;
                
                const className = classes.find(c => c.id === classId).name;
                
                const event = {
                  title: `${course.name} - ${course.teacher} (${currentRoom.name}) - ${className}`,
                  start: `${currentDate.toISOString().split('T')[0]}T${String(schoolHours.start).padStart(2, '0')}:00:00`,
                  end: `${currentDate.toISOString().split('T')[0]}T${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`,
                  color: '#4CAF50'
                };
                
                events.push(event);
                markRoomAsOccupied(currentRoom, currentDate, schoolHours.start, BLOCK_DURATION, roomSchedule);
                markClassAsOccupied(classId, currentDate, schoolHours.start, BLOCK_DURATION, classSchedule);
                markTeacherAsOccupied(course.teacher, currentDate, schoolHours.start, BLOCK_DURATION, teacherSchedule);
                classSchedule[classId].totalHours += BLOCK_DURATION;
                remainingHours -= BLOCK_DURATION;
              }
              
              schoolHours.start += BLOCK_DURATION;
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        weekIndex++;
      }
    });
  });
  
  events.push(...indispos);
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

onMounted(() => {
  const calendarEl = document.getElementById('calendar');
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
    events: generateCourseSchedule()
  });

  calendar.render();
});
</script>

<template>
    <h1>Planning</h1>
    <div id='calendar'></div>
  </template>
