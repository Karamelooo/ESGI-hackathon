<script setup>

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});

</script>

<template>
    <h1>Planning</h1>
    <div id='calendar'></div>
  </template>
