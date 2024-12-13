import axios from 'axios';
import axiosInstance from "@/utils/axiosInstance.ts";

const API_URL = '/promotions';

export interface Promotion {
  id?: number;
  name: string;
  students: number | string;
  createdAt?: string;
}

export function usePromotion() {
  const fetchPromotions = async (): Promise<Promotion[]> => {
    const response = await axiosInstance.get<Promotion[]>(API_URL);
    return response.data;
  };

  const addPromotion = async (promotion: Promotion): Promise<Promotion> => {
    const response = await axiosInstance.post<Promotion>(API_URL, promotion);
    return response.data;
  }

  const updatePromotion = async (promotion: Promotion): Promise<Promotion> => {
    const response = await axiosInstance.put<Promotion>(`${API_URL}/${promotion.id}`, promotion);
    return response.data;
  }

  const deletePromotion = async (promotionId: number): Promise<number> => {
    await axiosInstance.delete(`${API_URL}/${promotionId}`);
    return promotionId;
  }

  return {
    fetchPromotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
  };
}
