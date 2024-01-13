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

const postThreadUpVote = async (threadId = '') => {
    try {
        await axios.post(`/threads/${threadId}/up-vote`);
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Failed to Up Vote the Thread',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const postThreadDownVote = async (threadId = '') => {
    try {
        await axios.post(`/threads/${threadId}/down-vote`);
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Failed to Down Vote the Thread',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const postThreadNeutralVote = async (threadId = '') => {
    try {
        await axios.post(`/threads/${threadId}/neutral-vote`);
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: "Failed to Change Thread's Vote",
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

const postThreadCommentUpVote = async (threadId = '', commentId = '') => {
    try {
        await axios.post(`/threads/${threadId}/comments/${commentId}/up-vote`);
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Failed to Up Vote the Comment',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const postThreadCommentDownVote = async (threadId = '', commentId = '') => {
    try {
        await axios.post(
            `/threads/${threadId}/comments/${commentId}/down-vote`
        );
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Failed to Down Vote the Comment',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const postThreadCommentNeutralVote = async (threadId = '', commentId = '') => {
    try {
        await axios.post(
            `/threads/${threadId}/comments/${commentId}/neutral-vote`
        );
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: "Failed to Change Comment's Vote",
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const postThreadDetailComment = async (threadId = '', content = '') => {
    try {
        const response = await axios.post(`/threads/${threadId}/comments`, {
            content,
        });
        return response?.data?.data?.comment || null;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Failed to Add Comment',
            description: errorMessage,
            variant: 'destructive',
        });
        return false;
    }
};

const threadServices = {
    getAllThreadsData,
    addNewThread,
    postThreadUpVote,
    postThreadDownVote,
    postThreadNeutralVote,
    getThreadDetailById,
    postThreadCommentUpVote,
    postThreadCommentNeutralVote,
    postThreadCommentDownVote,
    postThreadDetailComment,
};

export default threadServices;
