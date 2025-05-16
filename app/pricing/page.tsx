"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Check, Sparkles, Shield, Zap, Users, Clock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";
type PlanFeature = {
  text: string;
  icon?: JSX.Element;
  highlight?: boolean;
};

type Plan = {
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  accentColor?: string;
  icon: JSX.Element;
};

type FAQItem = {
  question: string;
  answer: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: {
      monthly: "0",
      yearly: "0",
    },
    description: "Get started with basic access to explore our platform's capabilities.",
    features: [
      { text: "API Access", icon: <Zap className="h-4 w-4" /> },
      { text: "Basic AI models" },
      { text: "5 chats per day" },
      { text: "Standard response time" },
      { text: "7-day history" },
    ],
    icon: <Gift className="h-6 w-6" />,
    accentColor: "bg-gradient-to-br from-blue-500/10 to-blue-500/5",
  },
  {
    name: "Pro",
    price: {
      monthly: "5",
      yearly: "50",
    },
    description: "Unlock advanced features and enhance your AI experience.",
    features: [
      { text: "API Access", icon: <Zap className="h-4 w-4" /> },
      { text: "All AI models", highlight: true },
      { text: "Unlimited chats", highlight: true },
      { text: "Priority response time" },
      { text: "30-day history" },
      { text: "File uploads" },
      { text: "Custom instructions" },
    ],
    isPopular: true,
    icon: <Sparkles className="h-6 w-6" />,
    accentColor: "bg-gradient-to-br from-violet-500/10 to-purple-500/5",
  },
  {
    name: "Team",
    price: {
      monthly: "10",
      yearly: "100",
    },
    description: "Collaborate seamlessly with enhanced features designed for team environments.",
    features: [
      { text: "All Pro features" },
      { text: "5 team members", icon: <Users className="h-4 w-4" />, highlight: true },
      { text: "Shared workspaces", highlight: true },
      { text: "Advanced admin controls" },
      { text: "API access" },
      { text: "90-day history", icon: <Clock className="h-4 w-4" /> },
      { text: "Priority support", icon: <Shield className="h-4 w-4" /> },
    ],
    icon: <Users className="h-6 w-6" />,
    accentColor: "bg-gradient-to-br from-emerald-500/10 to-teal-500/5",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal through our secure payment system, ensuring your transactions are safe and protected."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Pro-rated charges will be applied accordingly to ensure you only pay for what you use."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No, all our plans are month-to-month with no long-term commitment required. You can cancel anytime without any penalties or hidden fees."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service. Simply contact our support team to process your refund."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can choose to upgrade your plan or wait for the next billing cycle. We never charge overage fees without your explicit consent."
  },
  {
    question: "Do you offer custom enterprise plans?",
    answer: "Yes, we offer customized enterprise solutions tailored to your organization's specific needs. Contact our sales team for more information and a personalized quote."
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 z-0" />

      <div
        className={cn(
          "top-0 z-50 bg-background/80 backdrop-blur-lg transition-all duration-300 py-4",
          scrolled ? "shadow-md" : ""
        )}
      >
        <div className="container max-w-7xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium hidden md:block">Choose your plan</h3>
            <div className="mx-auto md:mx-0 flex items-center gap-4 p-1 border rounded-full">
              <Button
                variant={billingPeriod === "monthly" ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === "yearly" ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => setBillingPeriod("yearly")}
              >
                <span>Yearly</span>
                <span className="ml-1 text-xs bg-primary-foreground text-primary px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <h1 className="text-5xl font-bold text-primary-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the perfect plan for your needs. All plans include our core features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={`${plan.name}-${billingPeriod}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="flex"
                >
                  <Card className={cn(
                    "w-full p-8 flex flex-col relative border rounded-2xl transition-all duration-300",
                    "hover:shadow-xl hover:scale-105 hover:z-10",
                    plan.isPopular ? "border-2 border-primary shadow-lg" : "",
                  )}>
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          plan.isPopular ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {plan.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                      </div>

                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-bold">${billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}</span>
                        <span className="text-muted-foreground ml-2">{billingPeriod === "monthly" ? "/month" : "/year"}</span>
                      </div>

                      <p className="text-muted-foreground h-12">{plan.description}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-border mb-6" />

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          {feature.icon ? (
                            <div className="text-primary mr-2 flex-shrink-0">
                              {feature.icon}
                            </div>
                          ) : (
                            <Check className={cn(
                              "h-5 w-5 mr-2 flex-shrink-0",
                              feature.highlight ? "text-primary" : "text-muted-foreground"
                            )} />
                          )}
                          <span className={feature.highlight ? "font-medium" : ""}>{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={cn(
                      "p-4 rounded-xl mb-6",
                      plan.accentColor || "bg-muted"
                    )}>
                      <p className="text-sm text-center">
                        {plan.name === "Free" ? "No credit card required" :
                         plan.name === "Pro" ? "30-day money-back guarantee" :
                         "Includes team onboarding call"}
                      </p>
                    </div>

                    <Button
                      variant={plan.isPopular ? "default" : "outline"}
                      className={cn(
                        "w-full rounded-xl h-12 font-medium",
                        plan.isPopular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "",
                      )}
                      asChild
                    >
                      <Link href="/register">
                        {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Compare Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See which plan is right for you with our detailed feature comparison.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    {plans.map(plan => (
                      <th key={plan.name} className="p-4 text-center">
                        <div className="font-medium">{plan.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/40">
                    <td className="p-4 font-medium">API Access</td>
                    {plans.map(plan => (
                      <td key={plan.name} className="p-4 text-center">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border/40">
                    <td className="p-4 font-medium">AI Models</td>
                    {plans.map((plan, i) => (
                      <td key={plan.name} className="p-4 text-center">
                        {i === 0 ? "Basic" : "All Models"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border/40">
                    <td className="p-4 font-medium">Chat Limits</td>
                    {plans.map((plan, i) => (
                      <td key={plan.name} className="p-4 text-center">
                        {i === 0 ? "5 per day" : "Unlimited"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border/40">
                    <td className="p-4 font-medium">History Retention</td>
                    {plans.map((plan, i) => (
                      <td key={plan.name} className="p-4 text-center">
                        {i === 0 ? "7 days" : i === 1 ? "30 days" : "90 days"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border/40">
                    <td className="p-4 font-medium">Team Members</td>
                    {plans.map((plan, i) => (
                      <td key={plan.name} className="p-4 text-center">
                        {i === 2 ? "5 included" : "—"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our pricing and features.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border/40 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center rounded-3xl p-8 md:p-16 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/5 z-0" />

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 z-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, black 2%, transparent 0%), radial-gradient(circle at 75px 75px, black 2%, transparent 0%)`,
              backgroundSize: "100px 100px"
            }} />

            <div className="relative z-10">
              <div className="inline-block mb-6 p-3 rounded-2xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>

              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of users who are already experiencing the power of AI.
                Start with our free plan or choose the perfect plan for your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <Link href="/register">Start For Free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <Link href="/contact">Want something custom? Contact Sales!</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
