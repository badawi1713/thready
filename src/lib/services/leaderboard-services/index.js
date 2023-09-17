import { toast } from '@/hooks/useToast';
import axios from 'axios';

const getLeaderboardData = async () => {
    try {
        const response = await axios.get('/leaderboards');
        const data =
            response?.data?.data?.leaderboards?.length > 0
                ? response?.data?.data?.leaderboards
                      ?.map((item) => {
                          return {
                              id: item?.user?.id,
                              name: item?.user?.name,
                              avatar: item?.user?.avatar,
                              email: item?.user?.email,
                              score: item?.score,
                          };
                      })
                      ?.sort((a, b) => b.score - a.score)
                : [];
        return { data, error: '' };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        toast({
            title: 'Get Leaderboard Failed',
            description: errorMessage,
            variant: 'destructive',
        });
        return { data: [], error: errorMessage };
    }
};

const leaderboardServices = {
    getLeaderboardData,
};

export default leaderboardServices;
