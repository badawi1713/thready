import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
    HiArrowLeft,
    HiNewspaper,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
        .string()
        .email('Email must be valid, example: john.doe@mail.com')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Your password is too short'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Your passwords does not match')
        .required('Confirm password is required'),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleSave = handleSubmit((formData) => {
        console.log(formData);
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
                            &ldquo;Thready brings people together through
                            threaded conversations – sparking connections and
                            friendships along the way.&rdquo;
                        </p>
                        <footer className="text-sm text-right">
                            _dbadawi - {new Date().getFullYear()}
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="col-span-4 w-full bg-background p-8 flex-col flex items-start">
                <Link className="mb-4" to="/login">
                    <Button
                        variant="link"
                        className="flex items-center  w-auto gap-2 p-0"
                    >
                        <HiArrowLeft size={18} />
                        Go Back
                    </Button>
                </Link>
                <Typography variant="heading1">Sign Up</Typography>
                <FormProvider {...formMethods}>
                    <form className="flex flex-col w-full gap-4 mt-14">
                        <Controller
                            name="name"
                            control={control}
                            render={({
                                field: { onChange, value, ...field },
                            }) => {
                                return (
                                    <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="name"
                                            placeholder="Enter your name"
                                            error={!!errors?.name}
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                            value={value}
                                        />
                                        {errors?.name?.message && (
                                            <FormMessage>
                                                {errors?.name?.message}
                                            </FormMessage>
                                        )}
                                    </div>
                                );
                            }}
                        />
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
                                            error={!!errors?.email}
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

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({
                                field: { onChange, value, ...field },
                            }) => {
                                return (
                                    <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="confirmPassword">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            {...field}
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="confirmPassword"
                                            placeholder="Confirm your password"
                                            icon={
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (prevState) =>
                                                                !prevState
                                                        )
                                                    }
                                                    title={
                                                        showConfirmPassword
                                                            ? 'Hide'
                                                            : 'Show'
                                                    }
                                                    className="p-0 m-0"
                                                >
                                                    {showConfirmPassword ? (
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
                                        {errors?.confirmPassword?.message && (
                                            <FormMessage>
                                                {
                                                    errors?.confirmPassword
                                                        ?.message
                                                }
                                            </FormMessage>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <Button
                            type="button"
                            onClick={handleSave}
                            className="my-10"
                        >
                            Register
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default Register;
