import axiosInstance from "@/utils/axiosInstance.ts";
import axios from "axios";

const API_URL = '/users';

export interface User {
    id?: number;
    name: string;
    firstname: string;
    email: string;
    role: 'STUDENT' | 'INTERVENANT' | 'SUPERADMIN';
    address: string;
}

// 0140093911

export function useUser() {
    const fetchUsers = async (): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>(API_URL);
        return response.data;
    };

    const fetchIntervenants = async (): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>('/intervenants');
        return response.data;
    }

    const addUser = async (user: User): Promise<User> => {
        const response = await axiosInstance.post<User>(API_URL, user);
        return response.data?.user;
    };

    const updateUser = async (user: User): Promise<User> => {
        const response = await axiosInstance.put<User>(`${API_URL}/${user.id}`, user);
        return response.data;
    };

    const deleteUser = async (userId: number): Promise<number> => {
        await axiosInstance.delete(`${API_URL}/${userId}`);
        return userId;
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'STUDENT':
                return 'inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
            case 'INTERVENANT':
                return 'inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20';
            case 'SUPERADMIN':
                return 'inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10';
            default:
                return 'inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10';
        }
    }

    const getRoleName = (role: string) => {
        switch (role) {
            case 'STUDENT':
                return 'Etudiant';
            case 'INTERVENANT':
                return 'Intervenant';
            case 'SUPERADMIN':
                return 'Super Admin';
            default:
                return 'Inconnu';
        }
    }

    return {
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        getRoleColor,
        getRoleName,
        fetchIntervenants,
    };
}
