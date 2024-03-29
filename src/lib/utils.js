import { clsx } from 'clsx';
import {
    HiHome as HiHomeIcon,
    HiOutlineHome as HiOutlineHomeIcon,
    HiOutlineTrendingUp as HiOutlineTrendingUpIcon,
    HiTrendingUp as HiTrendingUpIcon,
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1028,
};

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const mainRoutes = [
    {
        id: 'home',
        name: 'Home',
        url: '/',
        icon: HiOutlineHomeIcon,
        activeIcon: HiHomeIcon,
    },
    {
        id: 'leaderboard',
        name: 'Leaderboard',
        url: '/leaderboard',
        icon: HiOutlineTrendingUpIcon,
        activeIcon: HiTrendingUpIcon,
    },
];

function getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userList = [];

for (let i = 1; i <= 100; i++) {
    const user = {
        id: i,
        name: `User ${i}`,
        score: getRandomScore(0, 100),
    };
    userList.push(user);
}

export const leaderboardData = userList.sort((a, b) => b.score - a.score);

export function getInitials(name = '') {
    const words = name?.split(' ');

    if (words.length === 0) {
        return '';
    }

    const firstWord = words[0];
    const firstInitial = firstWord.charAt(0).toUpperCase();

    if (firstWord.length === 1) {
        return firstInitial;
    }
    const secondInitial =
        words.length > 1 ? words[1].charAt(0).toUpperCase() : '';
    return firstInitial + secondInitial;
}

export function postedAt(date) {
    const now = new Date();
    const posted = new Date(date);
    const diff = now - posted;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    if (diffDays > 0) {
        return `${diffDays} days ago`;
    }
    if (diffHours > 0) {
        return `${diffHours} hours ago`;
    }
    if (diffMinutes > 0) {
        return `${diffMinutes} minutes ago`;
    }
    if (diffSeconds > 0) {
        return `${diffSeconds} seconds ago`;
    }
    return 'just now';
}

export function formatDateTime(isoString = '') {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
