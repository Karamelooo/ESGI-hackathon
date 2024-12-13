<script setup lang="ts">
import VLayout from "@/layouts/VLayout.vue";
import VTable from "@/components/VTable.vue";
import {onMounted, reactive} from "vue";
import VDrawer from "@/components/VDrawer.vue";
import type {Promotion} from "@/composables/usePromotion.ts";
import {usePromotionStore} from "@/stores/promotionStore.ts";
import FormPromotion from "@/views/promotions/FormPromotion.vue";

const state = reactive({
  promotion: {} as Promotion,
  openDrawer: false
});

const promotionStore = usePromotionStore();
onMounted(async () => {
  await promotionStore.loadPromotions()
});

const openAddDrawer = () => {
  state.promotion = {} as Promotion;
  state.openDrawer = true;
};

const openEditDrawer = (promotion: Promotion) => {
  state.promotion = {...promotion};
  state.openDrawer = true;
};

const handleUserSubmit = async (promotion: Promotion) => {
  if (promotion.id) {
    await promotionStore.modifyPromotion(promotion);
  } else {
    await promotionStore.createPromotion(promotion);
  }
  state.openDrawer = false;
};

const deletePromotion = async (promotion: Promotion) => {
  if (!promotion.id) return;
  await promotionStore.removePromotion(promotion.id);
};

</script>
<template>
  <VLayout>
    <VDrawer
        :title="state.promotion?.id ? 'Modifier une promotion' : 'Ajouter une promotion'"
        :open="state.openDrawer"
        :setOpen="(open: boolean) => state.openDrawer = open"
    >
      <FormPromotion
          :promotion="state.promotion"
          @submit="handleUserSubmit"
          @cancel="() => state.openDrawer = false"
      />
    </VDrawer>
    <VTable
        title="Promotions"
        :columns="promotionStore.columns"
        :rows="promotionStore.promotions"
        :show-actions="true"
        :showAddButton="true"
        addButtonLabel="Ajouter une promotion"
        :onAdd="openAddDrawer"
        :onEdit="openEditDrawer"
        :onDelete="deletePromotion"
    />
  </VLayout>
</template>
