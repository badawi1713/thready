import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { HiNewspaper, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email must be valid, example: john.doe@mail.com')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
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

    const { control, reset, formState, handleSubmit } = formMethods;

    const { errors } = formState;

    return (
        <section className="flex flex-col lg:grid grid-cols-12 min-h-[100dvh]">
            <div className="col-span-8 bg-background lg:flex flex-col hidden w-full px-10 py-20">
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
            <div className="col-span-4 w-full bg-background px-10 py-20 flex-col flex">
                <Typography variant="heading1">Sign In</Typography>
                <FormProvider {...formMethods}>
                    <form className="flex flex-col w-full gap-4 mt-14">
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
                                            placeholder="john.doe@gmail.com"
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                            value={value}
                                            error={!!errors?.email}
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
                                            error={!!errors?.password}
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

                        <Button className="my-14">Submit</Button>
                    </form>
                </FormProvider>
                <div className="flex items-baseline mt-auto mx-auto">
                    <Typography variant="body2">
                        Don&apos;t have an account yet?
                    </Typography>
                    <Button variant="link">Sign Up</Button>
                </div>
            </div>
        </section>
    );
};

export default Login;
