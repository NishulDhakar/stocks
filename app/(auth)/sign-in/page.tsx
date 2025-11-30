'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputField from '@/components/Forms/inputField';
import Link from 'next/link';
import { signInWithEmail } from '@/lib/actions/auth.actions';

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h2>
                <p className="text-muted-foreground mt-2">Enter your credentials to access your portfolio.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                    name="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />

                <div className="space-y-1">
                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: 'Password is required', minLength: 8 }}
                    />
                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium text-base transition-all shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="font-medium text-foreground hover:text-primary transition-colors">
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default SignIn;