import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff, ArrowRight, Mail } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // Get the session to check user role
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        // Redirect based on role
        if (session?.user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?q=80&w=1780&auto=format&fit=crop"
              alt="EcoStore Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-display font-bold text-earth-dark">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-sage hover:text-sage-dark transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Social Sign In */}
        <div className="space-y-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-colors"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </button>

          <button
            onClick={() => signIn('facebook', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-[#1877F2] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] transition-colors"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Facebook
          </button>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-br from-sage-50/50 via-white to-earth-50/50 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-sage focus:ring-sage border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-sage hover:text-sage-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-white bg-sage hover:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign in
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
