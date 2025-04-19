"use client";

import { useState, useEffect } from "react";
import { 
  Settings, Save, Shield, Bell, 
  Trash2, Mail, Database, 
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  // Tab states
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "General", icon: <Settings size={16} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={16} /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Customize your experience and manage your preferences
        </p>
      </div>

      {/* Custom Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent/50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div 
                variants={itemVariants}
                className="glass p-6 rounded-xl space-y-6"
              >
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h2 className="text-xl font-semibold">General Settings</h2>
                  <Save className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">Save Analysis History</label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save your image analysis history
                      </p>
                    </div>
                    <button
                      onClick={() => setSaveHistory(!saveHistory)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        saveHistory ? "bg-primary" : "bg-input"
                      }`}
                    >
                      <span
                        className={`${
                          saveHistory ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 rounded-full bg-background transition-transform`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">UI Animations</label>
                      <p className="text-sm text-muted-foreground">
                        Enable motion and transition effects
                      </p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span
                        className="translate-x-6 inline-block h-4 w-4 rounded-full bg-background transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div 
                variants={itemVariants}
                className="glass p-6 rounded-xl space-y-6"
              >
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h2 className="text-xl font-semibold">Data & Privacy</h2>
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">Data Collection</label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymous usage data collection
                      </p>
                    </div>
                    <button
                      onClick={() => setDataCollection(!dataCollection)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        dataCollection ? "bg-primary" : "bg-input"
                      }`}
                    >
                      <span
                        className={`${
                          dataCollection ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 rounded-full bg-background transition-transform`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">Privacy Mode</label>
                      <p className="text-sm text-muted-foreground">
                        Enhanced data protection and encryption
                      </p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span
                        className="translate-x-1 inline-block h-4 w-4 rounded-full bg-background transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="glass p-6 rounded-xl space-y-6"
              >
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h2 className="text-xl font-semibold">Data Management</h2>
                  <Database className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">Clear History</label>
                      <p className="text-sm text-muted-foreground">
                        Remove all saved analysis history
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="font-medium">Export Data</label>
                      <p className="text-sm text-muted-foreground">
                        Download all your data as a JSON file
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}