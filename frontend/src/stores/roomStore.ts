import {defineStore} from 'pinia';
import {ref} from 'vue';
import {showToast} from "@/utils/taost.ts";
import {type Room, useRoom} from "@/composables/useRoom.ts";

export const useRoomStore = defineStore('room', () => {
    const rooms = ref<Room[]>([]);
    const columns = [
        {key: 'name', label: 'Nom'},
        {key: 'capacite', label: 'Capacité'},
        {key: 'createdAt', label: 'Créé le'},
    ];
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const {fetchRooms, addRoom, updateRoom, deleteRoom} = useRoom();

    const loadRooms = async () => {
        loading.value = true;
        error.value = null;
        try {
            rooms.value = await fetchRooms();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const createRoom = async (room: Room) => {
        try {
            const newRoom = await addRoom(room);
            rooms.value.push(newRoom);
            showToast('Salle ajoutée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de l\'ajout de la salle', 'error');
        }
    };

    const modifyRoom = async (room: Room) => {
        try {
            const updatedRoom = await updateRoom(room);
            const index = rooms.value.findIndex((r) => r.id === room.id);
            if (index !== -1) {
                rooms.value[index] = updatedRoom;
            }
            showToast('Salle modifiée avec succès', 'success');
        } catch (err) {
            showToast('Erreur lors de la modification de la salle', 'error');
            error.value = (err as Error).message;
        }
    };

    const removeRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId);
            rooms.value = rooms.value.filter((r) => r.id !== roomId);
            showToast('Salle supprimée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de la suppression de la salle', 'error');
        }
    };


    return {
        columns,
        loading,
        error,
        rooms,
        loadRooms,
        createRoom,
        modifyRoom,
        removeRoom,
    };
});
