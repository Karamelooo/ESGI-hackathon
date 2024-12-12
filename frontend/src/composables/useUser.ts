import axios from 'axios';

const API_URL = 'http://localhost:4000/users';

export interface User {
  id?: number;
  name: string;
  email: string;
}

export function useUser() {
  const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  };

  const addUser = async (user: User): Promise<User> => {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
  };

  const updateUser = async (user: User): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/${user.id}`, user);
    return response.data;
  };

  const deleteUser = async (userId: number): Promise<number> => {
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
  };

  return {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  };
}
