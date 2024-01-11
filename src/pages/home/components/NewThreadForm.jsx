import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormMessage,
    Input,
    Label,
    Textarea,
    Typography,
} from '@/components/ui';
import threadServices from '@/lib/services/thread-services';
import { getInitials } from '@/lib/utils';
import { asyncGetAllThreads } from '@/store/reducers/all-thread-reducer/action';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const schema = yup.object().shape({
    title: yup.string().required('Thread title is required'),
    body: yup.string().required('Your thread content must be filled'),
});
function NewThreadForm() {
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state?.authUserReducer);

    const getAllThreads = useCallback(() => {
        dispatch(asyncGetAllThreads());
    }, [dispatch]);

    const formMethods = useForm({
        defaultValues: {
            title: '',
            body: '',
            category: '',
        },
        resolver: yupResolver(schema),
    });

    const { handleSubmit, control, formState, reset } = formMethods;

    const { errors, isSubmitting } = formState;

    const handleSave = handleSubmit(async (formData) => {
        const response = await threadServices.addNewThread(formData);
        if (response) {
            getAllThreads();
            reset({
                title: '',
                body: '',
                category: '',
            });
        }
    });
    return (
        <section className="py-6 px-8 border-b">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={authUser?.avatar} />
                            <AvatarFallback>
                                {getInitials(authUser?.name)}
                            </AvatarFallback>
                        </Avatar>

                        <Typography variant="body1">
                            Whats on your thought?
                        </Typography>
                    </div>
                </CardHeader>
                <CardContent>
                    <FormProvider {...formMethods}>
                        <form
                            onSubmit={handleSave}
                            className="flex flex-col w-full gap-4"
                        >
                            <Controller
                                name="title"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => {
                                    return (
                                        <div className="flex flex-col w-full gap-2">
                                            <Label htmlFor="title">
                                                Thread Title
                                            </Label>
                                            <Input
                                                {...field}
                                                id="title"
                                                placeholder="Enter your title"
                                                onChange={(e) =>
                                                    onChange(e.target.value)
                                                }
                                                value={value}
                                            />
                                            {errors?.title?.message && (
                                                <FormMessage>
                                                    {errors?.title?.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => {
                                    return (
                                        <div className="flex flex-col w-full gap-2">
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <Input
                                                {...field}
                                                id="category"
                                                placeholder="Enter your category"
                                                onChange={(e) =>
                                                    onChange(e.target.value)
                                                }
                                                value={value}
                                            />
                                            {errors?.category?.message && (
                                                <FormMessage>
                                                    {errors?.category?.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                            <Controller
                                name="body"
                                control={control}
                                render={({
                                    field: { onChange, value, ...field },
                                }) => {
                                    return (
                                        <div className="flex flex-col w-full gap-2">
                                            <Textarea
                                                placeholder="What's on your mind?"
                                                {...field}
                                                id="body"
                                                onChange={(e) =>
                                                    onChange(e.target.value)
                                                }
                                                value={value}
                                            />
                                            {errors?.body?.message && (
                                                <FormMessage>
                                                    {errors?.body?.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                            <Button
                                disabled={isSubmitting}
                                className="self-end"
                            >
                                {isSubmitting ? 'Posting' : 'Post'}
                            </Button>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </section>
    );
}

export default NewThreadForm;
