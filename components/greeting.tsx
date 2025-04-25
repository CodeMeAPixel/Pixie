'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning ☀️';
  if (hour < 18) return 'Good afternoon 🌤️';
  return 'Good evening 🌙';
};

const welcomeMessages = [
  "Ready to bring your ideas to life?",
  "What shall we create today?",
  "Need help with coding? I'm all ears!",
  "Let's build something amazing together!",
  "Your personal coding companion at your service!",
  "Got a tricky problem? Let's solve it!",
  "Time to turn coffee into code?",
  "Ready to debug your thoughts?",
  "What coding challenge can I help with?",
  "Let's write some elegant solutions!",
  "From bugs to features, I'm here to help!",
  "Ready to transform ideas into code?",
  "Your code whisperer is listening...",
  "Need a coding partner? Count me in!"
];

export const Greeting = () => {
  const [greeting, setGreeting] = useState(getTimeBasedGreeting());
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Update greeting every minute
    const timer = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000);

    // Set initial random message
    setWelcomeMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-semibold"
      >
        {greeting}!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-2xl text-muted-foreground"
      >
        {welcomeMessage}
      </motion.div>
    </div>
  );
};
