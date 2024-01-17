import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Typography,
    badgeVariants,
} from '@/components/ui';
import { HiHashtag } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Trending() {
    const navigation = useNavigate();

    const categoryList = useSelector((state) => state.categoryListReducer);

    const searchParams = new URLSearchParams(window.location.search);
    const categoryParams = searchParams.get('category') || '';

    const handleNavigate = (url) => {
        navigation(url);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-1 font-normal">
                    <HiHashtag /> Trending
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                    {categoryList?.length < 1 ? (
                        <Typography
                            variant="body1"
                            className=" text-primary text-center"
                        >
                            Sorry, there is no something trending right now!
                        </Typography>
                    ) : (
                        categoryList?.map((category) => {
                            return (
                                <button
                                    key={category}
                                    onClick={() => {
                                        const url =
                                            categoryParams === category
                                                ? '/'
                                                : `/?category=${category}`;
                                        handleNavigate(url);
                                    }}
                                    className={badgeVariants({
                                        variant:
                                            categoryParams === category
                                                ? 'default'
                                                : 'outline',
                                    })}
                                >
                                    #{category}
                                </button>
                            );
                        })
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default Trending;
