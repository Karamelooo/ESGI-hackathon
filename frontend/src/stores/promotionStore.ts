import {defineStore} from 'pinia';
import {ref} from 'vue';
import {showToast} from "@/utils/taost.ts";
import {type Promotion, usePromotion} from "@/composables/usePromotion.ts";

export const usePromotionStore = defineStore('promotion', () => {
    const promotions = ref<Promotion[]>([]);
    const columns = [
        {key: 'name', label: 'Nom'},
        {key: 'students', label: 'Nombre d\'étudiants'},
        {key: 'createdAt', label: 'Créé le'},
    ];
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const {fetchPromotions, addPromotion, updatePromotion, deletePromotion} = usePromotion();

    const loadPromotions = async () => {
        loading.value = true;
        error.value = null;
        try {
            promotions.value = await fetchPromotions();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const createPromotion = async (promotion: Promotion) => {
        try {
            const newPromotion = await addPromotion(promotion);
            promotions.value.push(newPromotion);
            showToast('Salle ajoutée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de l\'ajout de la promotion', 'error');
        }
    };

    const modifyPromotion = async (promotion: Promotion) => {
        try {
            const updatedPromotion = await updatePromotion(promotion);
            const index = promotions.value.findIndex((r) => r.id === promotion.id);
            if (index !== -1) {
                promotions.value[index] = updatedPromotion;
            }
            showToast('Salle modifiée avec succès', 'success');
        } catch (err) {
            showToast('Erreur lors de la modification de la promotion', 'error');
            error.value = (err as Error).message;
        }
    };

    const removePromotion = async (promotionId: number) => {
        try {
            await deletePromotion(promotionId);
            promotions.value = promotions.value.filter((r) => r.id !== promotionId);
            showToast('Salle supprimée avec succès', 'success');
        } catch (err) {
            error.value = (err as Error).message;
            showToast('Erreur lors de la suppression de la promotion', 'error');
        }
    };


    return {
        columns,
        loading,
        error,
        promotions,
        loadPromotions,
        createPromotion,
        modifyPromotion,
        removePromotion,
    };
});
