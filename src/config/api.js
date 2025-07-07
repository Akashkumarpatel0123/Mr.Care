const API_BASE_URL = "https://mr-carebackend.onrender.com";

export default API_BASE_URL;
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  GET_PATIENTS: `${API_BASE_URL}/patients`,
  ADD_PATIENT: `${API_BASE_URL}/patients/add`,
  UPDATE_PATIENT: `${API_BASE_URL}/patients/update`,
  DELETE_PATIENT: `${API_BASE_URL}/patients/delete`,
  GET_DOCTORS: `${API_BASE_URL}/doctors`,
  ADD_DOCTOR: `${API_BASE_URL}/doctors/add`,
  UPDATE_DOCTOR: `${API_BASE_URL}/doctors/update`,
  DELETE_DOCTOR: `${API_BASE_URL}/doctors/delete`
};