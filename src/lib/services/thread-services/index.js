import { toast } from '@/hooks/useToast';
import axios from 'axios';

const getAllThreadsData = async () => {
    try {
        const response = await axios.get('/threads');
        const data =
            response?.data?.data?.threads?.length > 0
                ? response?.data?.data?.threads
                : [];
        return { data, error: '' };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Get Threads Failed',
            description: errorMessage,
            variant: 'destructive',
        });
        return { data: [], error: errorMessage };
    }
};

const threadServices = {
    getAllThreadsData,
};

export default threadServices;
