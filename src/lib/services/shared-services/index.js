import { toast } from '@/hooks/useToast';
import axios from 'axios';

const getUserListData = async () => {
    try {
        const response = await axios.get('/users');
        const data = response?.data?.data?.users;
        return { data, error: '' };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Get Users Failed',
            description: errorMessage,
            variant: 'destructive',
        });
        return { data: [], error: errorMessage };
    }
};

const sharedServices = {
    getUserListData,
};

export default sharedServices;
