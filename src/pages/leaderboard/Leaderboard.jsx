import Sidebar from '@/components/shared/sidebar.jsx';
import TabBar from '@/components/shared/tab-bar.jsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
    Spinner,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Typography,
} from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import leaderboardServices from '@/lib/services/leaderboard-services';
import { screens } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

function Leaderboard() {
    const screenSize = useScreenSize();
    const { width } = screenSize;
    const isMobileScreen = width <= screens.md;
    const isMounted = useRef(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    const getLeaderboards = useCallback(async () => {
        setLoading(true);
        const response = await leaderboardServices.getLeaderboardData();
        setData(response.data);
        setError(response.error);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            getLeaderboards();
            isMounted.current = false;
        }
    }, [getLeaderboards]);

    return (
        <div className="flex items-stretch min-h-[100dvh] 2xl:container relative">
            {!isMobileScreen && <Sidebar />}
            <main className=" w-full flex-1 flex flex-col pb-20 md:pb-0 min-h-[100dvh]">
                <section className="py-6 px-8 md:sticky md:top-0 bg-background  border-b z-10">
                    <Typography variant="heading2">Leaderboard</Typography>
                </section>
                <Separator />
                {loading ? (
                    <div className="py-6 px-8 flex flex-col justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <section className="lg:py-6 lg:px-8 flex flex-col gap-10 mb-6 max-h-[100dvh]">
                        <Table className="h-full">
                            <TableCaption>Leaderboard Top Score</TableCaption>
                            <TableHeader className="sticky top-0 bg-accent">
                                <TableRow>
                                    <TableHead className="w-[60px] text-center">
                                        Rank
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">
                                        Score
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.length > 0 ? (
                                    data.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            className={
                                                index >= 0 && index < 3
                                                    ? 'font-bold'
                                                    : 'font-medium'
                                            }
                                        >
                                            <TableCell className="text-center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">
                                                {item.score}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            className="text-center"
                                            colSpan={3}
                                        >
                                            {error ||
                                                'Leaderboard data is not available'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </section>
                )}
            </main>
            <aside className="border-l py-6 px-8 lg:block hidden sticky top-0 min-h-full max-h-[100dvh] w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {isMobileScreen ? (
                        <div className="rounded-sm dark:bg-slate-800 bg-slate-100 h-40 w-12 lg:w-80" />
                    ) : (
                        data?.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-normal">
                                        Congratulation!
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage />
                                                <AvatarFallback>
                                                    1st
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-lg font-medium leading-none">
                                                    {data[0].name || '-'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    With score:{' '}
                                                    {data[0].score || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            </aside>
            <TabBar />
        </div>
    );
}

export default Leaderboard;
