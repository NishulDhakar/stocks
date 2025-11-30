'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputField from '@/components/Forms/inputField';
import Link from 'next/link';
import { signUpWithEmail } from '@/lib/actions/auth.actions';

const SignUp = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) {
                toast.success('Account created successfully');
                router.push('/sign-in');
            } else {
                toast.error('Sign up failed', {
                    description: result.error
                });
            }
        } catch (e) {
            console.error(e);
            toast.error('Sign up failed', {
                description: e instanceof Error ? e.message : 'Failed to create account.'
            })
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Create an account</h2>
                <p className="text-muted-foreground mt-2">Start your journey to wealth management today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: 'Name is required', minLength: 2 }}
                />

                <InputField
                    name="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Create a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium text-base transition-all shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="font-medium text-foreground hover:text-primary transition-colors">
                        Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default SignUp;