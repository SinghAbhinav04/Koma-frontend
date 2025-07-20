import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Theme } from '../App';
import { Sun, Moon, Palette, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';

interface NavbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onThemeChange,
  isLoggedIn,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/koma', label: 'Koma' },
  ];

  const themes = [
    { value: 'light' as Theme, label: 'Light', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon },
    { value: 'unique' as Theme, label: 'Reddish Brown', icon: Palette },
  ];

  const handleThemeSelect = (selectedTheme: Theme) => {
    onThemeChange(selectedTheme);
    setIsThemeMenuOpen(false);
  };

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <motion.nav 
      className="bg-navbar-blur border-b border-border sticky top-0 z-50 glass-effect"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 text-primary hover:text-primary-hover transition-colors group"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <img 
                key={theme}
                src={`${theme === 'dark' || theme === 'unique' ? '/white_logo_transparent.png' : '/cleaned_logo.png'}?t=${Date.now()}`} 
                alt="LexAI Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LexAI
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentTheme && (
                  <>
                    <currentTheme.icon className="w-5 h-5" />
                    <ChevronDown className={`w-4 h-4 transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </motion.button>
              
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-professional-lg border border-border py-2 z-10"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {themes.map((themeOption, index) => (
                      <motion.button
                        key={themeOption.value}
                        onClick={() => handleThemeSelect(themeOption.value)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center space-x-3 ${
                          theme === themeOption.value ? 'text-primary bg-secondary/50' : 'text-foreground'
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <themeOption.icon className="w-4 h-4" />
                        <span>{themeOption.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <motion.button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors btn-professional"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <div className="flex space-x-3">
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium bg-primary text-black hover:bg-primary-hover rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 text-sm font-medium bg-primary text-black hover:bg-primary-hover rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 text-left text-sm font-medium transition-colors rounded-lg ${
                      location.pathname === item.path
                        ? 'text-primary bg-secondary/50'
                        : 'text-foreground hover:text-primary hover:bg-secondary/30'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Mobile Theme Selector */}
                <div className="pt-2 border-t border-border">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Theme
                  </div>
                  <div className="flex flex-col space-y-1">
                    {themes.map((themeOption, index) => (
                      <motion.button
                        key={themeOption.value}
                        onClick={() => {
                          handleThemeSelect(themeOption.value);
                          setIsMenuOpen(false);
                        }}
                        className={`px-3 py-2 text-left text-sm font-medium transition-colors rounded-lg flex items-center space-x-3 ${
                          theme === themeOption.value
                            ? 'text-primary bg-secondary/50'
                            : 'text-foreground hover:text-primary hover:bg-secondary/30'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + index) * 0.1 + 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <themeOption.icon className="w-4 h-4" />
                        <span>{themeOption.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border">
                  {isLoggedIn ? (
                    <motion.button
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      Logout
                    </motion.button>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <motion.button
                        onClick={() => {
                          navigate('/login');
                          setIsMenuOpen(false);
                        }}
                        className="px-3 py-2 text-left text-sm font-medium text-primary hover:text-primary-hover transition-colors rounded-lg hover:bg-secondary/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        Login
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          navigate('/signup');
                          setIsMenuOpen(false);
                        }}
                        className="px-3 py-2 text-left text-sm font-medium bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg transition-colors btn-professional"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        whileHover={{ x: 5 }}
                      >
                        Sign Up
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};