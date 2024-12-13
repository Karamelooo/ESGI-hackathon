<script setup lang="ts">
import VLayout from "@/layouts/VLayout.vue";
import VTable from "@/components/VTable.vue";
import {onMounted, reactive} from "vue";
import VDrawer from "@/components/VDrawer.vue";
import type {Room} from "@/composables/useRoom.ts";
import {useRoomStore} from "@/stores/roomStore.ts";
import FormRoom from "@/views/rooms/FormRoom.vue";

const state = reactive({
  room: {} as Room,
  openDrawer: false
});

const roomStore = useRoomStore();
onMounted(async () => {
  await roomStore.loadRooms()

  console.log('rooms', roomStore.rooms)
});

const openAddDrawer = () => {
  state.room = {} as Room;
  state.openDrawer = true;
};

const openEditDrawer = (room: Room) => {
  state.room = {...room};
  state.openDrawer = true;
};

const handleUserSubmit = async (room: Room) => {
  if (room.id) {
    await roomStore.modifyRoom(room);
  } else {
    await roomStore.createRoom(room);
  }
  state.openDrawer = false;
};

const deleteRoom = async (room: Room) => {
  if (!room.id) return;
  await roomStore.removeRoom(room.id);
};

</script>
<template>
  <VLayout>
    <VDrawer
        :title="state.room?.id ? 'Modifier une salle' : 'Ajouter une salle'"
        :open="state.openDrawer"
        :setOpen="(open: boolean) => state.openDrawer = open"
    >
      <FormRoom
          :user="state.room"
          @submit="handleUserSubmit"
          @cancel="() => state.openDrawer = false"
      />
    </VDrawer>
    <VTable
        title="Salles"
        :columns="roomStore.columns"
        :rows="roomStore.rooms"
        :show-actions="true"
        :showAddButton="true"
        addButtonLabel="Ajouter une salle"
        :onAdd="openAddDrawer"
        :onEdit="openEditDrawer"
        :onDelete="deleteRoom"
    />
  </VLayout>
</template>
