"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

interface TableOfContentsProps {
  items: { href: string; label: string }[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleClick = (href: string) => {
    setActiveSection(href);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-card shadow-lg rounded-xl p-6"
    >
      <h3 className="text-xl font-bold mb-4 text-card-foreground">Contents</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li 
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button 
              onClick={() => handleClick(item.href)}
              className={`
                w-full flex items-center justify-between px-4 py-2 rounded-md 
                transition-all duration-300 ease-in-out 
                ${activeSection === item.href 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent hover:text-accent-foreground'}
              `}
            >
              <span>{item.label}</span>
              <FaChevronRight className="opacity-50" />
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;