import authServices from './auth-services';
import leaderboardServices from './leaderboard-services';

const services = {
    ...authServices,
    ...leaderboardServices,
};

export default services;
