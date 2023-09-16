import { toast } from '@/hooks/useToast';
import axios from 'axios';

function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

async function register({ email, name, password }) {
    const data = {
        email,
        name,
        password,
    };
    try {
        const response = await axios.post('/register', data);

        const { status, message } = response?.data;

        if (status !== 'success') {
            throw new Error(message);
        }

        return true;
    } catch (error) {
        toast({
            title: 'Registration Failed',
            description: error?.response?.data?.message || error?.message,
            variant: 'destructive',
        });
        return false;
    }
}

async function login({ email, password }) {
    const data = {
        email,
        password,
    };
    try {
        const response = await axios.post('/login', data);

        const { status, message } = response?.data;

        if (status !== 'success') {
            throw new Error(message);
        }

        const token = response?.data?.data?.token;

        return token;
    } catch (error) {
        toast({
            title: 'Login Failed',
            description: error?.response?.data?.message || error?.message,
            variant: 'destructive',
        });
        return false;
    }
}

async function getOwnProfile() {
    try {
        const response = await axios.get('/users/me');
        const { status, message } = response?.data;
        if (status !== 'success') {
            throw new Error(message);
        }

        const user = response?.data?.data?.user;

        return user;
    } catch (error) {
        toast({
            title: 'Get Access Failed',
            description: error?.response?.data?.message || error?.message,
            variant: 'destructive',
        });
        return false;
    }
}

const authServices = {
    getAccessToken,
    getOwnProfile,
    login,
    putAccessToken,
    register,
};

export default authServices;
