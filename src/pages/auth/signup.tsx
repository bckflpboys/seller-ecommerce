import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError('Error signing in after registration');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Password strength indicators
  const passwordStrength = {
    hasLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*]/.test(formData.password),
  };

  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length;

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
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-sage hover:text-sage-dark transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Sign Up */}
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

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
                autoComplete="new-password"
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

            {/* Password Strength Indicators */}
            <div className="mt-4 space-y-2">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-full rounded-full ${
                      index < passwordStrengthScore
                        ? 'bg-sage'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-1 text-sm">
                <div className={`flex items-center ${passwordStrength.hasLength ? 'text-sage' : 'text-gray-500'}`}>
                  <Check className="w-4 h-4 mr-2" />
                  At least 8 characters
                </div>
                <div className={`flex items-center ${passwordStrength.hasUpperCase && passwordStrength.hasLowerCase ? 'text-sage' : 'text-gray-500'}`}>
                  <Check className="w-4 h-4 mr-2" />
                  Upper & lowercase letters
                </div>
                <div className={`flex items-center ${passwordStrength.hasNumber ? 'text-sage' : 'text-gray-500'}`}>
                  <Check className="w-4 h-4 mr-2" />
                  At least one number
                </div>
                <div className={`flex items-center ${passwordStrength.hasSpecialChar ? 'text-sage' : 'text-gray-500'}`}>
                  <Check className="w-4 h-4 mr-2" />
                  At least one special character
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-sage focus:ring-sage border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium text-sage hover:text-sage-dark transition-colors"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-medium text-sage hover:text-sage-dark transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || passwordStrengthScore < 4}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-white bg-sage hover:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
