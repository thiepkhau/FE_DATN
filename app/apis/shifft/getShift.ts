/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiResponseServiceType } from '@/types/ServiceType.type';
import api from '@/utils/api';

export const getShift = async (): Promise<ApiResponseServiceType> => {
	try {
		const response = await api.get<ApiResponseServiceType>('/shift');
		return response.data;
	} catch (error: any) {
		console.error('Error fetching shift details:', error.response?.data || error.message);
		throw error;
	}
};
