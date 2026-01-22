import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

class UserService {
    getAuthHeaders() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    async getCurrentUserProfile() {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/profile`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async getUserById(userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async getAllUsers() {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async getUsersByRole(role) {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/role/${role}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}

const userService = new UserService();
export default userService;
