import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap, Shield, Globe, ArrowRight, Sparkles } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface HomeProps {
  theme: string;
}

export const Home: React.FC<HomeProps> = ({ theme }) => {
  const navigate = useNavigate();
  
  const logoSrc = theme === 'dark' || theme === 'unique' ? '/white_logo_transparent.png' : '/cleaned_logo.png';
  
  const handleChatNowClick = () => {
    navigate('/koma');
  };
  const features = [
    {
      icon: MessageCircle,
      title: 'Manga Art',
      description: 'Experience natural, Beautiful Manga panel generations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant responses with our optimized AI processing system built for speed and efficiency.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are protected with enterprise-grade security and end-to-end encryption.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Available 24/7',
      description: 'Access LexAI anytime, anywhere, from any device with seamless synchronization.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-professional-xl">
                <img 
                  key={theme} 
                  src={`${logoSrc}?t=${Date.now()}`}
                  alt="LexAI Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                Meet Koma 
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted mb-12 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your intelligent Manga Style Art Generator. Experience the future of AI-powered Manga art generation with just a single prompt or keyword.            </motion.p>

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleChatNowClick}
                className="inline-flex items-center justify-center space-x-3 btn-primary btn-professional text-lg px-8 py-4 rounded-xl min-w-[220px]"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>Start Chatting</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">Koma</span>?
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Discover the features that make LexAI the perfect AI companion for your fun art generations.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 shadow-professional overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
              >
                {/* Glowing background effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.1, opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative mb-6">
                  <motion.div
                    className={`bg-gradient-to-r ${feature.color} rounded-xl p-4 w-fit shadow-professional relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted mb-10 max-w-3xl mx-auto leading-relaxed">
              Join tons of users who are already experiencing the power of Manga art generation.
            </p>
            <motion.button
              onClick={handleChatNowClick}
              className="inline-flex items-center justify-center space-x-3 btn-primary btn-professional text-lg px-8 py-4 rounded-xl min-w-[220px]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};