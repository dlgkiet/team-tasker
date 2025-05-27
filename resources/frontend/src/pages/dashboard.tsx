"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    LayoutGrid,
    Github,
    Kanban,
    LayoutDashboard,
    ArrowRight,
    CheckCircle,
    Users,
    Zap,
    Shield,
    Sparkles,
    TrendingUp,
    Clock,
    Target,
    Play,
    ChevronRight,
} from "lucide-react";
import Layout from "../components/layouts";
import { Showcase } from "../components/showcase";
import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Định nghĩa type cho feature
interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    gradient: string;
}

// Mảng features với enhanced styling
const features: Feature[] = [
    {
        title: "Smart Task Management",
        description:
            "Organize and manage tasks effortlessly with AI-powered prioritization, smart deadlines, and automated workflows that boost productivity.",
        icon: LayoutGrid,
        color: "text-blue-500",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Visual Kanban Boards",
        description:
            "Visualize your workflow with beautiful, customizable Kanban boards featuring drag-and-drop functionality and real-time collaboration.",
        icon: Kanban,
        color: "text-purple-500",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Advanced Analytics",
        description:
            "Get deep insights with comprehensive dashboards, performance metrics, and predictive analytics to make data-driven decisions.",
        icon: LayoutDashboard,
        color: "text-emerald-500",
        gradient: "from-emerald-500 to-teal-500",
    },
];

// Stats data
const stats = [
    {
        label: "Active Users",
        value: "10K+",
        icon: Users,
        color: "text-blue-500",
    },
    {
        label: "Tasks Completed",
        value: "1M+",
        icon: CheckCircle,
        color: "text-green-500",
    },
    { label: "Teams", value: "500+", icon: Target, color: "text-purple-500" },
    { label: "Uptime", value: "99.9%", icon: Zap, color: "text-yellow-500" },
];

// Benefits data
const benefits = [
    { text: "Increase productivity by 40%", icon: TrendingUp },
    { text: "Save 2+ hours daily", icon: Clock },
    { text: "Improve team collaboration", icon: Users },
    { text: "Real-time project tracking", icon: Target },
];

const Dashboard = () => {
    const controls = useAnimationControls();
    const [currentFeature, setCurrentFeature] = useState(0);

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Floating animation for hero elements
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        },
    };

    return (
        <Layout>
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl"
                    animate={{
                        ...floatingAnimation,
                        transition: {
                            ...floatingAnimation.transition,
                            delay: 1,
                        },
                    }}
                />

                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <Badge
                            variant="secondary"
                            className="px-4 py-2 text-sm font-medium bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            New: Task Management
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="text-slate-900 dark:text-white">
                            Transform Your
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                            Team Productivity
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        The most intuitive project management platform that
                        helps teams collaborate seamlessly, track progress
                        effortlessly, and deliver exceptional results faster
                        than ever.
                    </motion.p>

                    {/* Benefits List */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
                    >
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                            >
                                <benefit.icon className="w-4 h-4 text-green-500" />
                                <span>{benefit.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <div className="flex -space-x-2 mb-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <img
                                    key={i}
                                    src={`https://randomuser.me/api/portraits/men/${
                                        i + 10
                                    }.jpg`}
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-black shadow-sm"
                                    alt="user"
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className="w-4 h-4 fill-current"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Link to="/login" className="flex items-center">
                                <Play className="w-4 h-4 mr-2" />
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="group border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            <a
                                href="https://github.com/dlgkiet/team-tasker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                View on GitHub
                                <Star className="w-4 h-4 ml-2 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-colors" />
                            </a>
                        </Button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* STATS SECTION */}
            <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className="text-center"
                            >
                                <div
                                    className={cn(
                                        "inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4",
                                        stat.color
                                    )}
                                >
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <Badge variant="secondary" className="mb-4">
                            <Zap className="w-4 h-4 mr-2" />
                            Powerful Features
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Everything you need to succeed
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Discover the tools that will transform how your team
                            works together and achieves goals.
                        </p>
                    </motion.div>

                    {/* Interactive Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="group"
                                >
                                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                                        <CardContent className="p-8">
                                            <div
                                                className={cn(
                                                    "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r mb-6",
                                                    feature.gradient
                                                )}
                                            >
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                                {feature.description}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="group/btn p-0 h-auto font-medium text-blue-600 dark:text-blue-400"
                                            >
                                                Learn more
                                                <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECURITY & TRUST SECTION */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-4 mb-8">
                            <Shield className="w-8 h-8 text-green-500" />
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                Enterprise-grade security & compliance
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                            {["SOC 2", "GDPR", "ISO 27001", "HIPAA"].map(
                                (cert, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <Shield className="w-8 h-8 text-slate-500" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            {cert}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SHOWCASE SECTION */}
            <Showcase />

            {/* CTA SECTION */}
            <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to transform your workflow?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of teams who have already
                            revolutionized their productivity with TeamTasker.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                                className="bg-white text-slate-900 hover:bg-slate-100"
                            >
                                <Link to="/login">
                                    Start Your Free Trial
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white hover:bg-white/10"
                            >
                                <Link to="/demo">
                                    Watch Demo
                                    <Play className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
