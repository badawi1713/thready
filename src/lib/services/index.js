import authServices from './auth-services';
import leaderboardServices from './leaderboard-services';
import threadServices from './thread-services';
import sharedServices from './shared-services';

const services = {
    ...authServices,
    ...leaderboardServices,
    ...threadServices,
    ...sharedServices,
};

export default services;
