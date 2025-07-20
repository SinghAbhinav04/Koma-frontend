import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Koma } from './pages/Koma';
import { PrivacyPolicy } from './pages/privacyAndPolicy';
import { GeminiGuide } from './pages/geminiGuide';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export type Theme = 'light' | 'dark' | 'unique';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('lexai-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('lexai-theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppRoutes 
            theme={theme} 
            onThemeChange={handleThemeChange}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppRoutes({ theme, onThemeChange }: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const hideNavAndFooter = location.pathname === '/chatbot' || location.pathname === '/koma';

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {!hideNavAndFooter && (
        <Navbar
          theme={theme}
          onThemeChange={onThemeChange}
          isLoggedIn={isAuthenticated}
          onLogout={logout}
        />
      )}
      <main className={hideNavAndFooter ? 'h-screen' : 'flex-1'}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/signup" element={<SignUp theme={theme} />} />
          <Route 
            path="/koma" 
            element={
              <ProtectedRoute>
                <Koma />
              </ProtectedRoute>
            } 
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
          <Route path="/gemini-guide" element={<GeminiGuide theme={theme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer theme={theme} />}
    </div>
  );
}

export default App;
