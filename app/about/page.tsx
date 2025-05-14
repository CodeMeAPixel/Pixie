"use client"

import { motion } from "framer-motion"
import {
  Brain, MessageSquare, DollarSign, Zap, Users, Clock, Shield,
  ChevronRight, Star, Sparkles, Bot, Cpu, Database, Code, Lock, Globe, ArrowRight, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AboutAndFeaturesPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  }

  // Feature data
  const mainFeatures = [
    {
      icon: Bot,
      title: "Multiple AI Models",
      description: "Choose from a diverse range of AI models, each tailored for specific conversation styles and applications."
    },
    {
      icon: Sparkles,
      title: "Smart Context",
      description: "AI that understands context and maintains conversation flow naturally across multiple topics."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security measures to protect your conversations and data."
    },
    {
      icon: Brain,
      title: "Advanced Learning",
      description: "Models that learn and adapt to your communication style and preferences over time."
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Comprehensive history and data management tools for tracking your conversations."
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Robust API endpoints for seamless integration with your existing applications."
    }
  ]


  const staffMembers = [
    {
      name: "Tyler H.",
      role: "Co-Founder & CEO & Head of AI & CTO & CFO",
      description: "Curious by Nature Full-Stack Software Developer who's always aiming for improvement",
      image: "https://codemeapixel.dev/_next/image?url=%2Fcharacter.png&w=640&q=75",
      socialMedia: {
        website: "https://codemeapixel.dev",
        discord: "https://discord.com/users/510065483693817867"
      }
    },
    {
      name: "Ranveer S.",
      role: "Co-Founder & COO",
      description: "Self taught coder & entrepreneur with a passion for AI.",
      image: "https://ranveersoni.me/_next/image?url=%2Ficon.png&w=256&q=75",
      socialMedia: {
        website: "https://ranveersoni.me",
        discord: "https://discord.com/users/787241442770419722"
      }
    },
  ]

  const integrations = [
    {
      name: "Discord",
      description: "Integrate with Discord servers",
      icon: MessageSquare
    },
    {
      name: "Teams",
      description: "Microsoft Teams integration",
      icon: Users
    },
    {
      name: "Custom API",
      description: "Build custom integrations",
      icon: Code
    }
  ]

  // Testimonials for social proof
  const testimonials = [
    {
      text: "cool shit",
      author: "gg",
      role: "gg"
    },
  ]

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-theme">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />

      {/* Hero Section with Gradient Backdrop */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/50 z-0" />
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />

        <div className="container relative z-10">
          <motion.div
            className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Redefining AI Conversations</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-adaptive">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Pixie</span>
            </h1>

            <p className="text-xl text-adaptive-muted max-w-2xl">
              Advanced AI chat platform for seamless conversations and intelligent interactions. We're on a mission to
              make AI communication more natural, helpful, and accessible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="rounded-full px-6 border-theme hover-accent" asChild>
                <Link href="/chat">
                  Start Chatting <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6 border-theme hover-accent" asChild>
                <Link href="/#features">Explore Features</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission with 3D Card Effect */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="container relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft} className="order-2 md:order-1">
              <div className="relative group perspective">
                <div className="relative transform transition-all duration-500 group-hover:rotate-y-6 shadow-xl rounded-2xl overflow-hidden border border-primary/20">
                  <Image
                    src="https://madeto.staytoxic.dev/users/787241442770419722/kZm471k2.png"
                    width={600}
                    height={600}
                    alt="Pixie Conversation"
                    className="rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-primary/10">
                    <p className="text-sm font-medium text-adaptive">Experience AI conversations that feel natural and intuitive</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/5 rounded-2xl -z-10 transform transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-adaptive">Making AI Conversations Human-Centered</h2>
              <div className="w-20 h-1 bg-primary/50 rounded-full" />
              <p className="text-adaptive-muted text-lg">
                At Virulent, we believe AI should enhance human potential, not replace it. We're building technology
                that understands context, emotion, and nuance to create truly meaningful interactions.
              </p>
              <p className="text-adaptive-muted text-lg">
                Our team of AI researchers, engineers, and designers work together to create an experience that feels
                intuitive and natural, while pushing the boundaries of what's possible with artificial intelligence.
              </p>
              <motion.div
                className="pt-4 flex gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">Context-aware</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">Human-like</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">Always learning</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features with Hover Animation */}
      <section id="features" className="container py-20 md:py-28">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
            <Star className="mr-2 h-4 w-4" />
            <span>Core Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-adaptive">What Sets Us Apart</h2>
          <p className="text-lg text-adaptive-muted max-w-2xl mx-auto">
            Advanced capabilities that set us apart in the AI conversation landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "relative overflow-hidden h-full group border-theme",
                "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300"
              )}>
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full group-hover:scale-150 transition-all duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-adaptive">{feature.title}</h3>
                  <p className="text-adaptive-muted">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/10 relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-4">
              <Users className="mr-2 h-4 w-4" />
              <span>What People Say</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-adaptive">Trusted by Users Worldwide</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-background/50 backdrop-blur-sm border border-primary/10 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 pt-8">
                    <div className="absolute -top-5 left-6 bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mb-6 italic text-adaptive-muted">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-adaptive">{testimonial.author}</p>
                        <p className="text-sm text-adaptive-muted">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section with Interactive Hover */}
      <section className="py-24 bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-secondary/10 text-secondary mb-4">
              <Globe className="mr-2 h-4 w-4" />
              <span>Integrations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-adaptive">Seamless Connections</h2>
            <p className="text-lg text-adaptive-muted max-w-2xl mx-auto">
              Connect with your favorite platforms and tools effortlessly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              >
                <Card className="p-8 text-center border border-primary/10 bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                  <div className="bg-primary/10 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <integration.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-adaptive">{integration.name}</h3>
                  <p className="text-sm text-adaptive-muted">{integration.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Hover Effects */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Users className="mr-2 h-4 w-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-adaptive">The Minds Behind Virulent</h2>
            <p className="text-lg text-adaptive-muted">
              A passionate team dedicated to creating the most natural AI conversations.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {staffMembers.map((member, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="overflow-hidden border border-primary/10 rounded-2xl group shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={member.image}
                      fill
                      alt={member.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="p-6 relative">
                    <div className="absolute -top-14 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
                    <CardTitle className="text-xl font-semibold text-adaptive">{member.name}</CardTitle>
                    <CardDescription className="text-adaptive-muted font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-adaptive-muted">{member.description}</p>
                    <div className="flex gap-3 mt-4">
                      {/* Social media icons */}
                      {member.socialMedia.website && (
                        <a href={member.socialMedia.website} target="_blank" rel="noopener noreferrer">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                            <Globe className="h-4 w-4" />
                          </div>
                        </a>
                      )}
                      {member.socialMedia.discord && (
                        <a href={member.socialMedia.discord} target="_blank" rel="noopener noreferrer">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Animated Gradient */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500" />
            <div className="relative rounded-2xl bg-gradient-to-br from-background/90 to-background/50 backdrop-blur-sm p-10 md:p-14 border border-primary/20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-adaptive">Ready to Experience the Future?</h2>
                <p className="text-lg text-adaptive-muted mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already transforming their AI interactions with Pixie's cutting-edge technology.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button asChild size="lg" className="rounded-full px-6 border-theme hover-accent text-black">
                    <Link href="/register">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">No credit card required</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">Free plan available</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-adaptive">Cancel anytime</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
