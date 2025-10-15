import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.API_URL, // Base URL from config file
  headers: {
    'Content-Type': 'application/json',
  },
  
});

export const getToken = async (clientId: string, clientSecret: string) => {
  try {
    const response = await apiClient.post('/oauth/token', {
      clientId,
      clientSecret,
    });
    console.log('Fetched token:', response);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const createCallout = async (customerId: string, token: string) => {
  try {
    const payload = {
      location: {
        accuracy: 5,
        latitude: 9.019615,
        longitude: 38.764526,
      },
      calloutClassificationId: 2,
      responseTypeId: 1,
    };
    const response = await apiClient.post(`/customers/${customerId}/callouts`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.callout.url;
  } catch (error) {
    console.error('Error creating callout:', error);
    throw error;
  }
};

export const signupCustomer = async (email: string, returnUrl: string, customerReferenceId: string, 
  siteName: string, siteReferenceId: string, token: string
) => {
  try {
    const payload = {
      siteDetails: {
        siteName,
        siteReferenceId
      },
      email,
      returnUrl,
      customerReferenceId
    }
    console.log(apiClient.getUri({
      url: `/customer-signup/sessions`,
    }));
    const response = await apiClient.post(`/customer-signup/sessions`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.returnUrl;
  }catch (error) {
    console.error('Error creating signup session:', error);
    throw error;
  }
};


export default apiClient;