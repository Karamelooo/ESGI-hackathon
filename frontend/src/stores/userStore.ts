import {defineStore} from 'pinia';
import {ref} from 'vue';
import {type User, useUser} from '@/composables/useUser';
import {showToast} from "@/utils/taost.ts";

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([]);
    const columns = [
        {key: 'name', label: 'Nom'},
        {key: 'firstname', label: 'Prénom'},
        {key: 'email', label: 'Email'},
        {key: 'role', label: 'Rôle'},
    ];
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const {fetchUsers, addUser, updateUser, deleteUser} = useUser();

    const loadUsers = async () => {
        loading.value = true;
        error.value = null;
        try {
            users.value = await fetchUsers();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const createUser = async (user: User) => {
        try {
            const newUser = await addUser(user)
            users.value.push(newUser);
            showToast('Utilisateur ajouté avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de l\'ajout de l\'utilisateur', 'error');
        }
    };

    const modifyUser = async (user: User) => {
        try {
            const updatedUser = await updateUser(user);
            const index = users.value.findIndex((u) => u.id === user.id);
            if (index !== -1) {
                users.value[index] = updatedUser;
            }
            showToast('Utilisateur modifié avec succès', 'success');
        } catch (err) {
            showToast('Erreur lors de la modification de l\'utilisateur', 'error');
            error.value = (err as Error).message;
        }
    };

    const removeUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            users.value = users.value.filter((u) => u.id !== userId);
            showToast('Utilisateur supprimé avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de la suppression de l\'utilisateur', 'error');
        }
    };

    return {
        users,
        columns,
        loading,
        error,
        loadUsers,
        createUser,
        modifyUser,
        removeUser,
    };
});
