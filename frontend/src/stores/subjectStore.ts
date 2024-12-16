import {defineStore} from 'pinia';
import {ref} from 'vue';
import {showToast} from "@/utils/taost.ts";
import {type Subject, type SubjectMapping, useSubject} from "@/composables/useSubject.ts";

export const useSubjectStore = defineStore('subject', () => {
    const subjects = ref<Subject[]>([]);
    const columns = [
        {key: 'name', label: 'Nom'},
        {key: 'semester', label: 'Semestre'},
        {key: 'color' , label: 'Couleur'},
        {key: 'createdAt', label: 'Créé le'},
    ];
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const {fetchSubjects, addSubject, updateSubject, deleteSubject, createSubjectMapping} = useSubject();

    const loadSubjects = async () => {
        loading.value = true;
        error.value = null;
        try {
            subjects.value = await fetchSubjects();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const createSubject = async (subject: Subject) => {
        try {
            const newSubject = await addSubject(subject);
            subjects.value.push(newSubject);
            showToast('Salle ajoutée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de l\'ajout de la salle', 'error');
        }
    };

    const modifySubject = async (subject: Subject) => {
        try {
            const updatedSubject = await updateSubject(subject);
            const index = subjects.value.findIndex((r) => r.id === subject.id);
            if (index !== -1) {
                subjects.value[index] = updatedSubject;
            }
            showToast('Salle modifiée avec succès', 'success');
        } catch (err) {
            showToast('Erreur lors de la modification de la salle', 'error');
            error.value = (err as Error).message;
        }
    };

    const removeSubject = async (subjectId: number) => {
        try {
            await deleteSubject(subjectId);
            subjects.value = subjects.value.filter((r) => r.id !== subjectId);
            showToast('Salle supprimée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de la suppression de la salle', 'error');
        }
    };

    const assignSubject = async (subjectMapping: SubjectMapping) => {
        try {
            await createSubjectMapping(subjectMapping);
            showToast('Salle assignée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de l\'assignation de la salle', 'error');
        }
    }


    return {
        columns,
        loading,
        error,
        subjects,
        loadSubjects,
        createSubject,
        modifySubject,
        removeSubject,
        assignSubject
    };
});
