import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, HelpCircle, ExternalLink, AlertCircle, Check, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SignUpProps {
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
  theme?: string;
}

export const SignUp: React.FC<SignUpProps> = ({ setIsLoggedIn, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    geminiApiKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Validate all password requirements
    const allRequirementsMet = Object.values(passwordValidation).every(Boolean);
    if (!allRequirementsMet) {
      setPasswordError('Password must meet all security requirements');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the signup function from AuthContext
      await signup({
        name: formData.fullName,
        email: formData.email,
        username: formData.username,
        dob: formData.dateOfBirth,
        password: formData.password,
        api: formData.geminiApiKey
      });
      
      // Redirect to the intended page or koma page after successful signup
      const from = location.state?.from?.pathname || '/koma';
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check password strength
  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    });
  };

  useEffect(() => {
    validatePassword(formData.password);
    setPasswordsMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-muted">
            Join Koma and start your Manga Generation journey.
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
          {/* Error Messages */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {passwordError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300 text-sm">{passwordError}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Full Name and Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Row 2: Email and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
            </div>

            {/* Row 3: Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setShowPasswordRequirements(true)}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {(showPasswordRequirements || formData.password) && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-foreground mb-3">Password requirements:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className={`flex items-center gap-2 ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordValidation.length ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordValidation.uppercase ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>Uppercase letter (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordValidation.lowercase ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>Lowercase letter (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.number ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordValidation.number ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>Number (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.special ? 'text-green-600' : 'text-gray-500'} col-span-full`}>
                        {passwordValidation.special ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>Special character (!@#$%^&*)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-background pr-10 ${
                      formData.confirmPassword ? (
                        passwordsMatch 
                          ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                          : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      ) : 'border-border focus:ring-primary focus:border-transparent'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-muted hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    <div className={`flex items-center gap-2 text-sm ${
                      passwordsMatch ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {passwordsMatch ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Passwords match</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          <span>Passwords do not match</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: Gemini API Key  */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <label htmlFor="geminiApiKey" className="block text-sm font-medium">
                    Gemini API Key
                  </label>
                  <div className="relative ml-2">
                    <button
                      type="button"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                    {showTooltip && (
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-card border border-border rounded-lg shadow-lg z-10"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <p className="text-sm text-foreground mb-2">
                          Required for AI manga generation. We don't store or see your API key.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  id="geminiApiKey"
                  name="geminiApiKey"
                  type="text"
                  value={formData.geminiApiKey}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="Enter your Gemini API key"
                />
              </div>
              
              {/* Help links */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  🔑 Need help getting your API key? We've got you covered!
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/gemini-guide')}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    How to get free Gemini API key
                  </button>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  🔒 We don't store, use, or see your API key. 
                  <button
                    type="button"
                    onClick={() => navigate('/privacy-policy')}
                    className="underline hover:no-underline font-medium ml-1"
                  >
                    Read Privacy Policy
                  </button>
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-muted">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy-policy')}
                  className="text-primary hover:text-primary-hover underline"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-primary text-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed btn-professional"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};