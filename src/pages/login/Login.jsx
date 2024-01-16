import { asyncSetAuthUser } from '@/store/reducers/auth-user-reducer/action';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
    HiArrowLeft,
    HiNewspaper,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button, FormMessage, Input, Label, Typography } from '@/components/ui';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email must be valid, example: john.doe@mail.com')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formMethods = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    });

    const { control, formState, handleSubmit } = formMethods;

    const { errors, isSubmitting } = formState;

    const handleSave = handleSubmit(async (formData) => {
        try {
            const payload = {
                email: formData.email,
                password: formData.password,
            };
            const response = await dispatch(asyncSetAuthUser(payload));
            if (response) {
                return navigate('/', { replace: true });
            }
            return false;
        } catch (error) {
            return error;
        }
    });

    return (
        <section className="flex flex-col lg:grid grid-cols-12 min-h-[100dvh]">
            <div className="col-span-8 bg-accent lg:flex flex-col hidden w-full p-8">
                <div className="flex items-center gap-3">
                    <HiNewspaper size={40} />
                    <Typography variant="heading1" fontWeight="bold">
                        Thready
                    </Typography>
                </div>
                <div className="mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;From casual chats to in-depth discussions,
                            Thready provides the platform to express yourself
                            and engage with others.&rdquo;
                        </p>
                        <footer className="text-sm text-right">
                            _dbadawi - {new Date().getFullYear()}
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="col-span-4 w-full bg-background p-8 flex-col flex items-start">
                <Link className="mb-4" to="/">
                    <Button
                        variant="link"
                        className="flex items-center  w-auto gap-2 p-0"
                    >
                        <HiArrowLeft size={18} />
                        Home
                    </Button>
                </Link>
                <Typography variant="heading1">Login</Typography>
                <FormProvider {...formMethods}>
                    <form
                        id="form"
                        onSubmit={handleSave}
                        className="flex flex-col w-full gap-4 mt-14"
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                field: { onChange, value, ...field },
                            }) => {
                                return (
                                    <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            {...field}
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                            value={value}
                                        />
                                        {errors?.email?.message && (
                                            <FormMessage>
                                                {errors?.email?.message}
                                            </FormMessage>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({
                                field: { onChange, value, ...field },
                            }) => {
                                return (
                                    <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            {...field}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="password"
                                            placeholder="Enter your password"
                                            icon={
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prevState) =>
                                                                !prevState
                                                        )
                                                    }
                                                    title={
                                                        showPassword
                                                            ? 'Hide'
                                                            : 'Show'
                                                    }
                                                    className="p-0 m-0"
                                                >
                                                    {showPassword ? (
                                                        <HiOutlineEyeOff />
                                                    ) : (
                                                        <HiOutlineEye />
                                                    )}
                                                </button>
                                            }
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                            value={value}
                                        />
                                        {errors?.password?.message && (
                                            <FormMessage>
                                                {errors?.password?.message}
                                            </FormMessage>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="my-10"
                        >
                            {isSubmitting ? 'Processing' : 'Login'}
                        </Button>
                    </form>
                </FormProvider>
                <div className="flex items-baseline mt-auto mx-auto">
                    <Typography variant="body2">
                        Don&apos;t have an account yet?
                    </Typography>
                    <Link to="/register">
                        <Button variant="link">Register</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
