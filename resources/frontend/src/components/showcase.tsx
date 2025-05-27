"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, TrendingUp, Users, Zap } from "lucide-react";

const showcases = [
    {
        id: 1,
        title: "Kanban Board Pro",
        description:
            "Advanced Kanban boards with real-time collaboration, custom workflows, and powerful automation features.",
        image: "https://static.shuffle.dev/components/preview/a1e10615-6acd-4c10-8b03-948ca1a14394/kanban-boards/kanban-board01.webp",
        category: "Workflow",
        features: ["Drag & Drop", "Real-time Sync", "Custom Fields"],
        rating: 4.9,
        users: "2.5K+",
    },
    {
        id: 2,
        title: "Smart Analytics",
        description:
            "Comprehensive analytics dashboard with AI-powered insights, predictive analytics, and custom reporting.",
        image: "https://v0.dev/_next/image?url=%2Fapi%2FtzCpxJliJF3%2Fimage&w=640&q=75",
        category: "Analytics",
        features: ["AI Insights", "Custom Reports", "Predictive Analytics"],
        rating: 4.8,
        users: "1.8K+",
    },
    {
        id: 3,
        title: "Team Collaboration",
        description:
            "Enhanced team collaboration tools with video calls, screen sharing, and integrated communication.",
        image: "https://deifkwefumgah.cloudfront.net/screenshots/thumbnail/georgegriff-react-dnd-kit-tailwind-shadcn-ui-thumbnail-2x.webp",
        category: "Collaboration",
        features: ["Video Calls", "Screen Share", "Chat Integration"],
        rating: 4.7,
        users: "3.2K+",
    },
];

export const Showcase = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        <Star className="w-4 h-4 mr-2" />
                        Featured Solutions
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Powerful tools for every workflow
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Discover how TeamTasker adapts to your unique needs with
                        specialized features and integrations.
                    </p>
                </motion.div>

                {/* Showcase Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {showcases.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.2,
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 },
                            }}
                            className="group"
                        >
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800">
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Category Badge */}
                                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 backdrop-blur-sm">
                                        {item.category}
                                    </Badge>

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 text-slate-900 backdrop-blur-sm"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Demo
                                        </Button>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-medium">
                                                {item.rating}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.features.map((feature, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{item.users} users</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Growing</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        Want to see more? Explore our complete feature set and
                        integrations.
                    </p>
                    <Button variant="outline" size="lg" className="group">
                        <Zap className="w-4 h-4 mr-2" />
                        Explore All Features
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
