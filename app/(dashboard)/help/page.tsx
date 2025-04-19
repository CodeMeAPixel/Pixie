"use client";

import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Bookmark, 
  Download, 
  HelpCircle,
  MessageSquare, 
  History, 
  Trash2, 
  Info, 
  Star,
  Key
} from "lucide-react";

const faqs = [
  {
    question: "What is this application?",
    answer: "This is an AI-powered chat application that uses advanced language models to provide intelligent and contextual responses. It allows you to have natural conversations, save important messages, and maintain a history of your chats.",
    icon: <Info className="h-5 w-5" />
  },
  {
    question: "How does the chat work?",
    answer: "The application uses a powerful language model to understand and respond to your messages. You can:\n1. Type your message in the chat input\n2. Send it to get an AI response\n3. Save important messages for later reference\n4. View your chat history\n5. Download conversations for offline use",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    question: "What is Chat History?",
    answer: "Chat History automatically saves your conversations so you can revisit them later. You can:\n- View all your past conversations\n- Expand to see the full conversation\n- Download conversations as text files\n- Delete individual chats or clear all history",
    icon: <History className="h-5 w-5" />
  },
  {
    question: "How do I save messages?",
    answer: "To save a message:\n1. Look for the bookmark icon next to any message\n2. Click it to save the message\n3. Access saved messages from the sidebar\n4. Download or delete saved messages as needed",
    icon: <Bookmark className="h-5 w-5" />
  },
  {
    question: "Can I download my conversations?",
    answer: "Yes! You can download both individual messages and entire conversations:\n- For saved messages: Use the download button on each message\n- For chat history: Use the download button on each conversation\n- Downloads are in plain text format for easy reading",
    icon: <Download className="h-5 w-5" />
  },
  {
    question: "How do I manage my data?",
    answer: "You have full control over your data:\n- Clear all chat history at once\n- Delete individual conversations\n- Remove specific saved messages\n- All data is stored locally in your browser",
    icon: <Trash2 className="h-5 w-5" />
  }
];

const features = [
  {
    title: "Chat Interface",
    description: "A clean, modern interface for your conversations with advanced AI",
    icon: <MessageSquare className="h-6 w-6" />
  },
  {
    title: "Message Saving",
    description: "Save important messages with a single click for future reference",
    icon: <Bookmark className="h-6 w-6" />
  },
  {
    title: "Chat History",
    description: "Automatically saved conversations that you can revisit anytime",
    icon: <History className="h-6 w-6" />
  },
  {
    title: "Data Management",
    description: "Download or delete your data with simple controls",
    icon: <Trash2 className="h-6 w-6" />
  },
  {
    title: "Responsive Design",
    description: "Works perfectly on desktop, tablet, and mobile devices",
    icon: <Star className="h-6 w-6" />
  },
  {
    title: "Privacy Focused",
    description: "Your data stays on your device with local browser storage",
    icon: <Key className="h-6 w-6" />
  }
];

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Help & FAQ</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about using our AI chat application effectively.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Learn how to use the application effectively
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <p className="text-lg">
                Welcome to our AI chat application! This tool allows you to have natural conversations with an AI assistant, save important messages, and maintain a history of your chats.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Basic Features
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Type your message in the chat input at the bottom of the screen",
                    "Press Enter or click the send button to get a response",
                    "Use the bookmark icon to save important messages",
                    "Access your chat history and saved messages from the sidebar",
                    "Download conversations for offline reference"
                  ].map((step, index) => (
                    <div key={index} className="flex gap-3 p-4 rounded-lg bg-secondary/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {index + 1}
                      </div>
                      <p className="pt-1.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-4"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Key Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-all border border-primary/10">
              <CardContent className="p-6">
                <div className="mb-4 p-2 rounded-lg bg-primary/10 inline-flex">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-4"
      >
        <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Common questions about using the chat application
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10">
                  <AccordionTrigger className="py-4 text-lg hover:text-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">{faq.icon}</div>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-4 px-6 bg-secondary/20 rounded-lg mt-1 mb-3 text-base whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}