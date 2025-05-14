"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FiMessageSquare,
  FiBarChart2,
  FiArrowRight,
  FiPieChart,
  FiTrendingUp,
  FiCalendar,
  FiClock,
  FiZap,
  FiAward,
  FiMaximize2,
  FiGrid,
  FiList,
} from "react-icons/fi"

export interface ChatStatsItem {
  id: string
  title: string | null
  count: number
}

interface ChatStatsProps {
  totalChats: number
  totalMessages: number
  perChat: ChatStatsItem[]
}

export function ChatStats({ totalChats, totalMessages, perChat }: ChatStatsProps) {
  // Sort chats by message count (descending)
  const sortedChats = [...perChat].sort((a, b) => b.count - a.count)

  // Calculate average messages per chat
  const avgMessages = totalChats > 0 ? Math.round(totalMessages / totalChats) : 0

  // Calculate top chat percentage (how much of total messages are in the top chat)
  const topChatPercentage = sortedChats.length > 0 ? Math.round((sortedChats[0]?.count / totalMessages) * 100) || 0 : 0

  // Calculate activity score (arbitrary metric for gamification)
  const activityScore = Math.min(100, Math.round(totalMessages / 100 + totalChats * 5))

  // Calculate distribution metrics
  const chatDistribution = calculateDistribution(sortedChats)

  // State for view mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Simulated data for the activity heatmap
  const [activityData, setActivityData] = useState<number[]>([])

  useEffect(() => {
    // Generate random activity data for demonstration
    const generateActivityData = () => {
      return Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
    }

    setActivityData(generateActivityData())
  }, [])

  // Get top 3 chats
  const topChats = sortedChats.slice(0, 3)

  // Calculate message distribution percentages for visualization
  const messageDistribution = calculateMessageDistribution(sortedChats, totalMessages)

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-background/50 backdrop-blur-sm border border-border/30">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FiPieChart size={16} />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FiBarChart2 size={16} />
              <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <FiTrendingUp size={16} />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`p-2 h-8 w-8 ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FiGrid size={16} />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`p-2 h-8 w-8 ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FiList size={16} />
              <span className="sr-only">List View</span>
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0">
          <Card className="border border-border/50 shadow-md bg-gradient-to-br from-background to-background-darker overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FiPieChart size={18} />
                </div>
                Chat Analytics Overview
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <motion.div variants={containerVariants} className="space-y-6">
                {/* Key Metrics */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FiMessageSquare size={18} />
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Total
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Chats</p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-3xl font-bold tracking-tight">{totalChats}</p>
                      {totalChats > 10 && (
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">Active User</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FiBarChart2 size={18} />
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Total
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-3xl font-bold tracking-tight">{totalMessages}</p>
                      {totalMessages > 100 && (
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">Power User</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FiZap size={18} />
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Average
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Messages/Chat</p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-3xl font-bold tracking-tight">{avgMessages}</p>
                      {avgMessages > 10 && (
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">Engaged</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <FiAward size={18} />
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Score
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Activity Level</p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-3xl font-bold tracking-tight">{activityScore}</p>
                      <div className="w-12 h-6">
                        <Progress value={activityScore} className="h-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top Chats */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiAward className="text-primary" size={18} />
                    Top Performing Chats
                  </h3>

                  <div className="space-y-4">
                    {topChats.map((chat, index) => (
                      <div key={chat.id} className="relative">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="font-semibold">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/chat/${chat.id}`}
                              className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                            >
                              {chat.title || `Chat ${chat.id.substring(0, 8)}...`}
                            </Link>
                          </div>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {chat.count} messages
                          </Badge>
                        </div>
                        <div className="ml-11 mt-1">
                          <Progress value={(chat.count / (sortedChats[0]?.count || 1)) * 100} className="h-1.5" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{Math.round((chat.count / totalMessages) * 100)}% of total</span>
                            <Link
                              href={`/chat/${chat.id}`}
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              View <FiArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}

                    {topChats.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">No chat data available</div>
                    )}
                  </div>
                </motion.div>

                {/* Distribution */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FiPieChart className="text-primary" size={18} />
                      Message Distribution
                    </h3>

                    <div className="space-y-4">
                      {messageDistribution.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FiMaximize2 className="text-primary" size={18} />
                      Chat Size Distribution
                    </h3>

                    <div className="space-y-4">
                      {chatDistribution.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium">{item.count} chats</span>
                          </div>
                          <Progress value={(item.count / totalChats) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          <Card className="border border-border/50 shadow-md bg-gradient-to-br from-background to-background-darker overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FiBarChart2 size={18} />
                </div>
                Detailed Chat Metrics
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {sortedChats.map((chat, index) => (
                      <motion.div
                        key={chat.id}
                        variants={itemVariants}
                        className="bg-gradient-to-br from-background-lighter to-background rounded-xl border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                {index < 3 ? <FiAward size={16} /> : <FiMessageSquare size={14} />}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-medium text-sm line-clamp-1">
                                  {chat.title || `Chat ${chat.id.substring(0, 8)}...`}
                                </h4>
                                <p className="text-xs text-muted-foreground">ID: {chat.id.substring(0, 8)}...</p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`
                                ${
                                  index === 0
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : index < 3
                                      ? "bg-accent/10 text-accent-foreground border-accent/20"
                                      : "bg-muted/30 text-muted-foreground border-muted/30"
                                }
                              `}
                            >
                              {index === 0 ? "Top" : index < 3 ? `#${index + 1}` : `#${index + 1}`}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Messages</span>
                              <span className="font-medium">{chat.count}</span>
                            </div>
                            <Progress value={(chat.count / (sortedChats[0]?.count || 1)) * 100} className="h-1.5" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{Math.round((chat.count / totalMessages) * 100)}% of total</span>
                              <span>{Math.round((chat.count / avgMessages) * 10) / 10}x avg</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 bg-muted/10 p-3 flex justify-between items-center border-t border-border/30">
                          <span className="text-xs text-muted-foreground">{getMessageSizeLabel(chat.count)}</span>
                          <Link
                            href={`/chat/${chat.id}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                          >
                            View Chat <FiArrowRight size={12} />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border/30">
                      <div className="col-span-1">#</div>
                      <div className="col-span-5">Chat</div>
                      <div className="col-span-2 text-right">Messages</div>
                      <div className="col-span-2 text-right">% of Total</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {sortedChats.map((chat, index) => (
                      <motion.div
                        key={chat.id}
                        variants={itemVariants}
                        className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg border border-border/30 bg-background-lighter hover:bg-background transition-colors"
                      >
                        <div className="col-span-1 flex items-center">
                          <div
                            className={`
                            flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium
                            ${
                              index === 0
                                ? "bg-primary/20 text-primary"
                                : index < 3
                                  ? "bg-accent/20 text-accent-foreground"
                                  : "bg-muted/30 text-muted-foreground"
                            }
                          `}
                          >
                            {index + 1}
                          </div>
                        </div>

                        <div className="col-span-5 flex items-center min-w-0">
                          <div className="truncate">
                            <p className="font-medium text-sm truncate">
                              {chat.title || `Chat ${chat.id.substring(0, 8)}...`}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">ID: {chat.id}</p>
                          </div>
                        </div>

                        <div className="col-span-2 flex items-center justify-end">
                          <Badge variant="outline" className="bg-background/50">
                            {chat.count}
                          </Badge>
                        </div>

                        <div className="col-span-2 flex items-center justify-end">
                          <div className="flex items-center gap-1">
                            <div className="w-12 bg-muted/30 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${Math.round((chat.count / totalMessages) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{Math.round((chat.count / totalMessages) * 100)}%</span>
                          </div>
                        </div>

                        <div className="col-span-2 flex items-center justify-end">
                          <Button variant="ghost" size="sm" asChild className="h-7 px-2">
                            <Link href={`/chat/${chat.id}`}>
                              <span className="sr-only">View</span>
                              <FiArrowRight size={14} />
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}

                    {sortedChats.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">No chat data available</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <Card className="border border-border/50 shadow-md bg-gradient-to-br from-background to-background-darker overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FiTrendingUp size={18} />
                </div>
                Activity Patterns
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <motion.div variants={containerVariants} className="space-y-6">
                {/* Activity Heatmap */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiCalendar className="text-primary" size={18} />
                    Recent Activity
                  </h3>

                  <div className="grid grid-cols-30 gap-1 mb-2">
                    {activityData.map((value, index) => (
                      <div
                        key={index}
                        className={`h-8 rounded-sm ${getActivityColor(value)}`}
                        title={`${value} messages`}
                      ></div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-primary/10"></div>
                      <span>Less</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-primary/30"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-primary/50"></div>
                      <span>More</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
                      <span>Most</span>
                    </div>
                  </div>
                </motion.div>

                {/* Activity Insights */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FiClock className="text-primary" size={18} />
                      Usage Insights
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Average Messages per Chat</p>
                          <p className="text-xs text-muted-foreground">How many messages you typically exchange</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{avgMessages}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Top Chat Concentration</p>
                          <p className="text-xs text-muted-foreground">Percentage of messages in your top chat</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{topChatPercentage}%</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Activity Score</p>
                          <p className="text-xs text-muted-foreground">Overall engagement level</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={activityScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{activityScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background-lighter to-background rounded-xl p-5 border border-border/30 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FiZap className="text-primary" size={18} />
                      Achievements
                    </h3>

                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${totalChats >= 5 ? "bg-primary/10 border border-primary/20" : "bg-muted/10 border border-muted/20 opacity-50"}`}
                      >
                        <div
                          className={`p-2 rounded-full ${totalChats >= 5 ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground"}`}
                        >
                          <FiAward size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Conversation Starter</p>
                          <p className="text-xs text-muted-foreground">Start 5 or more chats</p>
                        </div>
                        <div className="ml-auto">
                          {totalChats >= 5 ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20">Unlocked</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {totalChats}/5
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${totalMessages >= 100 ? "bg-primary/10 border border-primary/20" : "bg-muted/10 border border-muted/20 opacity-50"}`}
                      >
                        <div
                          className={`p-2 rounded-full ${totalMessages >= 100 ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground"}`}
                        >
                          <FiMessageSquare size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Chatty</p>
                          <p className="text-xs text-muted-foreground">Exchange 100+ messages</p>
                        </div>
                        <div className="ml-auto">
                          {totalMessages >= 100 ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20">Unlocked</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {totalMessages}/100
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg ${avgMessages >= 15 ? "bg-primary/10 border border-primary/20" : "bg-muted/10 border border-muted/20 opacity-50"}`}
                      >
                        <div
                          className={`p-2 rounded-full ${avgMessages >= 15 ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground"}`}
                        >
                          <FiBarChart2 size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Deep Diver</p>
                          <p className="text-xs text-muted-foreground">Average 15+ messages per chat</p>
                        </div>
                        <div className="ml-auto">
                          {avgMessages >= 15 ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20">Unlocked</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {avgMessages}/15
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

// Helper functions
function calculateDistribution(chats: ChatStatsItem[]) {
  const small = chats.filter((chat) => chat.count <= 5).length
  const medium = chats.filter((chat) => chat.count > 5 && chat.count <= 15).length
  const large = chats.filter((chat) => chat.count > 15 && chat.count <= 30).length
  const veryLarge = chats.filter((chat) => chat.count > 30).length

  return [
    { label: "Small (1-5 messages)", count: small },
    { label: "Medium (6-15 messages)", count: medium },
    { label: "Large (16-30 messages)", count: large },
    { label: "Very Large (30+ messages)", count: veryLarge },
  ]
}

function calculateMessageDistribution(chats: ChatStatsItem[], totalMessages: number) {
  // Top chat
  const topChat = chats.length > 0 ? chats[0] : { count: 0 }
  const topChatPercentage = Math.round((topChat.count / totalMessages) * 100) || 0

  // Top 3 chats (excluding the top one)
  const top3Chats = chats.slice(1, 3)
  const top3Count = top3Chats.reduce((sum, chat) => sum + chat.count, 0)
  const top3Percentage = Math.round((top3Count / totalMessages) * 100) || 0

  // Rest of chats
  const restCount = totalMessages - topChat.count - top3Count
  const restPercentage = Math.round((restCount / totalMessages) * 100) || 0

  return [
    { label: "Top Chat", percentage: topChatPercentage },
    { label: "Next 2 Chats", percentage: top3Percentage },
    { label: "All Other Chats", percentage: restPercentage },
  ]
}

function getMessageSizeLabel(count: number) {
  if (count <= 5) return "Small Chat"
  if (count <= 15) return "Medium Chat"
  if (count <= 30) return "Large Chat"
  return "Very Large Chat"
}

function getActivityColor(value: number) {
  if (value === 0) return "bg-muted/20"
  if (value <= 3) return "bg-primary/10"
  if (value <= 6) return "bg-primary/30"
  if (value <= 8) return "bg-primary/50"
  return "bg-primary/80"
}
