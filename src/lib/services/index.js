import authServices from './auth-services';
import leaderboardServices from './leaderboard-services';
import threadServices from './thread-services';

const services = {
    ...authServices,
    ...leaderboardServices,
    ...threadServices,
};

export default services;
