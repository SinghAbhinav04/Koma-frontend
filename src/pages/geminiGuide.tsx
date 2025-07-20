import React from 'react';
import { Key, ExternalLink, Shield, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GeminiGuideProps {
  theme?: string;
}

export const GeminiGuide: React.FC<GeminiGuideProps> = ({ theme }) => {
  const navigate = useNavigate();

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy');
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Your Free Gemini API Key</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Follow this simple guide to get your free Google Gemini API key
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-lg space-y-8">
          {/* Important Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                   Your API Key is Safe with Us
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-3">
                  We <strong>don't store, use, or see</strong> your API key. It's encrypted and secured on your device.
                </p>
                <button
                  onClick={handlePrivacyPolicyClick}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline font-medium"
                >
                  Read our Privacy Policy →
                </button>
              </div>
            </div>
          </div>

          {/* Step 1: Access Google AI Studio */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold">Access Google AI Studio</h2>
            </div>
            
            <div className="pl-12 space-y-4">
              <p className="text-muted-foreground">
                Click the button below to open Google AI Studio in a new tab:
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium"
              >
                <ExternalLink className="h-5 w-5" />
                Open Google AI Studio
              </a>
            </div>
          </section>

          {/* Step 2: Sign in to Google */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-2xl font-bold">Sign in to Your Google Account</h2>
            </div>
            
            <div className="pl-12 space-y-4">
              <p className="text-muted-foreground mb-4">
                You'll see one of two scenarios:
              </p>
              
              {/* First time user */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-green-600">
                   If you're a first-time user:
                </h3>
                <div className="mb-4">
                  <img 
                    src="/first_time_user.png" 
                    alt="First time user screen" 
                    className="w-full max-w-md mx-auto rounded-lg border border-border shadow-sm"
                  />
                </div>
                <p className="text-muted-foreground">
                  Sign in with your Google account and follow the setup process.
                </p>
              </div>

              {/* Existing user */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  If you already have an account:
                </h3>
                <div className="mb-4">
                  <img 
                    src="/already_existing_user.png" 
                    alt="Existing user screen" 
                    className="w-full max-w-md mx-auto rounded-lg border border-border shadow-sm"
                  />
                </div>
                <p className="text-muted-foreground">
                  You'll be taken directly to the API key management page.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3: Create and Copy API Key */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold">Create and Copy Your API Key</h2>
            </div>
            
            <div className="pl-12 space-y-4">
              <p className="text-muted-foreground mb-4">
                Once you're in the Google AI Studio:
              </p>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="mb-4">
                  <img 
                    src="/copy_api.png" 
                    alt="Copy API key screen" 
                    className="w-full max-w-lg mx-auto rounded-lg border border-border shadow-sm"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Click on "Create API Key" if you don't have one</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Copy className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Click the copy button next to your API key</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Keep your API key secure and don't share it publicly</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Use in Koma */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                4
              </div>
              <h2 className="text-2xl font-bold">Use Your API Key in Koma</h2>
            </div>
            
            <div className="pl-12 space-y-4">
              <p className="text-muted-foreground mb-4">
                Now you can paste your API key into Koma's signup form or settings:
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                      ✨ You're All Set!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      Paste your copied API key into the Gemini API Key field during signup or in your account settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Reminder */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                   Security Reminder
                </h3>
                <div className="text-yellow-700 dark:text-yellow-300 space-y-2">
                  <p>
                    • We <strong>don't store, use, or see</strong> your API key
                  </p>
                  <p>
                    • Your API key is encrypted and secured on your device
                  </p>
                  <p>
                    • You can revoke or regenerate your API key anytime from Google AI Studio
                  </p>
                  <p>
                    • For more details, check our{' '}
                    <button
                      onClick={handlePrivacyPolicyClick}
                      className="underline hover:no-underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              If you encounter any issues, feel free to reach out to our support team.
            </p>
            <a
              href="mailto:dev.lexiconai@gmail.com"
              className="text-primary hover:text-primary-hover underline font-medium"
            >
              dev.lexiconai@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
