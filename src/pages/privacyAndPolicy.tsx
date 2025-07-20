import React from 'react';
import { Shield, Lock, Eye, EyeOff, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  theme?: string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ theme }) => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground mb-2">for Koma AI</p>
          <p className="text-sm text-muted bg-card px-4 py-2 rounded-lg inline-block border border-border">
            <strong>Effective Date:</strong> 21 July 2025
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-lg space-y-8">
          {/* Introduction */}
          <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-lg leading-relaxed">
              Welcome to <strong className="text-primary">Koma AI</strong>. We deeply value your privacy and are committed to protecting the information you provide when using our services. This Privacy Policy outlines how we handle, store, and protect your data.
            </p>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold">1. Overview</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground leading-relaxed">
                Koma AI is an AI-powered manga-style art generation platform that allows users to generate artworks using their own <strong className="text-foreground">Google Gemini API keys</strong>. Your API key is essential to access the service, and we ensure its utmost security using advanced cryptographic techniques.
              </p>
            </div>
          </section>

          {/* Section 2: Data We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">2. Data We Collect</h2>
            </div>
            <div className="pl-12 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  API Keys (Gemini)
                </h3>
                <p className="text-muted-foreground mb-3">
                  We require your personal Gemini API key to generate art on your behalf. This key is:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <strong className="text-green-800 dark:text-green-200">Encrypted</strong>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Using industry-standard encryption algorithms before storage.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeOff className="h-4 w-4 text-blue-600" />
                      <strong className="text-blue-800 dark:text-blue-200">Hashed</strong>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Stored in a form that even we cannot reverse or view.
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <strong className="text-purple-800 dark:text-purple-200">Never shared</strong>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      With any third party.
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-orange-600" />
                      <strong className="text-orange-800 dark:text-orange-200">Only used</strong>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      To serve your art generation requests securely and privately.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">User Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    We may collect minimal metadata (like timestamps of generation, image counts) to improve system performance and user experience.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    No personal identifying information (PII) is required or stored unless explicitly provided by the user.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Security Practices */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">3. Security Practices</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground mb-4">Your data is protected by advanced cryptographic protocols:</p>
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>API keys are never stored in plain text.</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Password and database credentials</strong> are protected via modern cryptographic hashing and encryption mechanisms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <EyeOff className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Access to user data is restricted</strong> to automated systems only; no team member can view your API key or credentials.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Even in the rare case of a breach, <strong>API keys remain fully unreadable and secure</strong> due to our encryption pipeline.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Use of Your API Key */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">4. Use of Your API Key</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground mb-4">Your Gemini API key is used <strong className="text-foreground">only</strong> for:</p>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Generating manga-style images for your personal use.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enhancing your personalized art generation experience.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>It is <strong>not used, stored, or shared</strong> for any analytics, advertising, or tracking purposes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Data Retention and Deletion */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">5. Data Retention and Deletion</h2>
            </div>
            <div className="pl-12 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">You can request deletion of your API key and associated data at any time by contacting our support team.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">We do <strong className="text-foreground">not retain</strong> any generated content beyond what is necessary to fulfill your request or unless explicitly saved by you.</span>
              </div>
            </div>
          </section>

          {/* Section 6: Third-Party Services */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">6. Third-Party Services</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground">
                Koma AI does not share your API keys, personal data, or generation history with any third-party services or analytics providers. We do not use tracking cookies or advertising SDKs.
              </p>
            </div>
          </section>

          {/* Section 7: Changes to This Privacy Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground">
                We may update this Privacy Policy occasionally. Any major changes will be notified on our platform. By continuing to use Koma AI, you agree to the terms of the latest Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 8: Contact Us */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">8. Contact Us</h2>
            </div>
            <div className="pl-12">
              <p className="text-muted-foreground mb-4">
                If you have any questions, concerns, or data deletion requests, please reach out to us at:
              </p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:dev.lexiconai@gmail.com" className="text-primary hover:text-primary-hover font-medium">
                    dev.lexiconai@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Message */}
          <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20 mt-8">
            <p className="text-lg font-semibold text-primary mb-2">
              Your privacy and trust are our top priority.
            </p>
            <p className="text-muted-foreground">
              With Koma AI, your keys, data, and creations remain yours — safe, secure, and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
