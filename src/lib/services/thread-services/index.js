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

const addNewThread = async (data) => {
    try {
        await axios.post('/threads', data);
        toast({
            title: 'Create New Thread',
            description: 'Your thread has been posted',
        });
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Get Threads Failed',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const getThreadDetailById = async (threadId) => {
    try {
        const response = await axios.get(`/threads/${threadId}`);
        const data = response?.data?.data?.detailThread || null;
        return { data, error: '' };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Get Thread Detail Failed',
            description: errorMessage,
            variant: 'destructive',
        });
        return { data: [], error: errorMessage };
    }
};

const threadServices = {
    getAllThreadsData,
    addNewThread,
    getThreadDetailById,
};

export default threadServices;
