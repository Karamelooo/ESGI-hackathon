import axios from 'axios';
import axiosInstance from "@/utils/axiosInstance.ts";

const API_URL = '/salles';

export interface Room {
    id?: number;
    name: string;
    capacite: number | string;
    createdAt?: string;
}

export function useRoom() {
    const fetchRooms = async (): Promise<Room[]> => {
        const response = await axiosInstance.get<Room[]>(API_URL);
        return response.data;
    };

    const addRoom = async (room: Room): Promise<Room> => {
        const response = await axiosInstance.post<Room>(API_URL, {
            name: room.name,
            capacite: room.capacite as number,
        });
        return response.data;
    }

    const updateRoom = async (room: Room): Promise<Room> => {
        const response = await axiosInstance.put<Room>(`${API_URL}/${room.id}`, {
            name: room.name,
            capacite: room.capacite as number,
        });
        return response.data;
    }

    const deleteRoom = async (roomId: number): Promise<number> => {
        await axiosInstance.delete(`${API_URL}/${roomId}`);
        return roomId;
    }

    return {
        fetchRooms,
        addRoom,
        updateRoom,
        deleteRoom,
    };
}
