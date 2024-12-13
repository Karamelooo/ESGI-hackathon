import axios from 'axios';
import axiosInstance from "@/utils/axiosInstance.ts";

const API_URL = '/matieres';

export interface Subject {
  id?: number;
  name: string;
  semester: number | string;
  color: string;
  createdAt?: string;
}

export function useSubject() {
  const fetchSubjects = async (): Promise<Subject[]> => {
    const response = await axiosInstance.get<Subject[]>(API_URL);
    return response.data;
  };

  const addSubject = async (subject: Subject): Promise<Subject> => {
    const response = await axiosInstance.post<Subject>(API_URL, subject);
    return response.data;
  }

  const updateSubject = async (subject: Subject): Promise<Subject> => {
    const response = await axiosInstance.put<Subject>(`${API_URL}/${subject.id}`, subject);
    return response.data;
  }

  const deleteSubject = async (subjectId: number): Promise<number> => {
    await axiosInstance.delete(`${API_URL}/${subjectId}`);
    return subjectId;
  }

  return {
    fetchSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
  };
}
