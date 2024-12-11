/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/utils/api';

export const getNotificationById = async (id: number): Promise<any> => {
	try {
		const response = await api.put<any>(`/notification/${id}`);
		return response.data;
	} catch (error: any) {
		console.error('Error fetching all notification details:', error.response?.data || error.message);
		throw error;
	}
};
