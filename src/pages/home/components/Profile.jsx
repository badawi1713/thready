import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui';
import { getInitials } from '@/lib/utils';
import { useSelector } from 'react-redux';

function Profile() {
    const authUser = useSelector((state) => state?.authUserReducer);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-normal">Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={authUser?.avatar} />
                            <AvatarFallback>
                                {getInitials(authUser?.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium uppercase leading-none">
                                {authUser?.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {authUser?.email || 'Email is unavailable'}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Profile;
