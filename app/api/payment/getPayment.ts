/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiResponsePayment } from '@/types/Payment.type';
import api from '@/utils/api';

export const getPayments = async (): Promise<ApiResponsePayment> => {
  try {
    const response = await api.get<ApiResponsePayment>('/payment');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching payment details:', error.response?.data || error.message);
    throw error;
  }
};