import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    FormMessage,
    Textarea,
    Typography,
} from '@/components/ui';
import { getInitials } from '@/lib/utils';
import { asyncCreateThreadDetailComment } from '@/store/reducers/thread-detail-reducer/action';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const schema = yup.object().shape({
    content: yup.string().required('Your comment must be filled'),
});

function CommentForm() {
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state?.authUserReducer);
    const { threadDetail } = useSelector((state) => state?.threadDetailReducer);

    const formMethods = useForm({
        defaultValues: {
            content: '',
        },
        resolver: yupResolver(schema),
    });

    const { handleSubmit, control, formState, reset } = formMethods;

    const { errors, isSubmitting } = formState;

    const handleSave = handleSubmit(async (formData) => {
        const payload = {
            threadId: threadDetail?.id,
            content: formData.content,
        };
        const response = await dispatch(
            asyncCreateThreadDetailComment(payload)
        );
        if (response) {
            reset({
                content: '',
            });
        }
    });

    return (
        <section className="py-6 px-8 border-b">
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSave}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={authUser?.avatar} />
                                    <AvatarFallback>
                                        {getInitials(authUser?.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <Typography variant="body1">
                                    Replying to {threadDetail?.owner?.name}
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Controller
                                name="content"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => {
                                    return (
                                        <div className="flex flex-col w-full gap-2">
                                            <Textarea
                                                placeholder="Write your comment..."
                                                {...field}
                                                id="content"
                                                onChange={(e) =>
                                                    onChange(e.target.value)
                                                }
                                                value={value}
                                            />
                                            {errors?.content?.message && (
                                                <FormMessage>
                                                    {errors?.content?.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                disabled={isSubmitting}
                                className="self-end"
                            >
                                {isSubmitting ? 'Replying' : 'Reply'}
                            </Button>
                        </CardFooter>
                    </form>
                </FormProvider>
            </Card>
        </section>
    );
}

export default memo(CommentForm);
