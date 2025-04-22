import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Star,
    LayoutGrid,
    Github,
    Kanban,
    LayoutDashboard,
} from "lucide-react";
import Layout from "../components/layouts";
import { Showcase } from "../components/showcase";
import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { LucideProps } from "lucide-react";

// Định nghĩa type cho feature
interface Feature {
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
}

// Mảng features
const features: Feature[] = [
    {
        title: "Task List",
        description:
            "Organize and manage tasks effortlessly with the task list feature, allowing users to create, prioritize, and track tasks, boosting productivity and streamlining workflows.",
        icon: LayoutGrid,
    },
    {
        title: "Kanban",
        description:
            "The Kanban board visually organizes tasks by workflow stages, helping users track progress, prioritize tasks, and manage work flexibly, enhancing collaboration and efficiency.",
        icon: Kanban,
    },
    {
        title: "Dashboard Insights",
        description:
            "Dashboard insights offer a clear overview of key metrics and performance indicators, empowering users to track progress, identify trends, and make informed, data-driven decisions.",
        icon: LayoutDashboard,
    },
];

const Dashboard = () => {
    const controls = useAnimationControls();

    // Tính toán chiều rộng tổng cộng của carousel
    const featureWidth = 320; // Chiều rộng mỗi feature (max-w-sm ~ 320px)
    const totalWidth = features.length * featureWidth;

    // Animation liên tục
    useEffect(() => {
        controls.start({
            x: -totalWidth,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10, // Tốc độ rất chậm: 20 giây cho 1 chu kỳ
                    ease: "linear",
                },
            },
        });
    }, [controls, totalWidth]);

    return (
        <Layout>
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-[#12121b] dark:via-[#1a1a30] dark:to-[#090916] text-center px-6 text-slate-800 dark:text-white transition-all duration-500 ease-in-out">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-slate-900 dark:text-white">
                    Simple task management <br />
                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 dark:from-amber-300 dark:to-red-400 text-transparent bg-clip-text">
                        Keep your team works on track
                    </span>
                </h1>

                <p className="text-lg sm:text-xl max-w-2xl mb-8 text-slate-600 dark:text-white/90">
                    A lightweight yet powerful platform to manage tasks,
                    collaborate, and ship faster — designed for small teams that
                    get things done.
                </p>

                {/* Avatar + Rating */}
                <div className="flex flex-col items-center justify-center mb-6 space-y-2">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
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
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className="w-4 h-4 fill-current"
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <Link to="/login">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:text-black dark:hover:bg-white/80 px-6 py-3 rounded-lg font-bold shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                            GET STARTED FOR FREE
                        </Button>
                    </Link>
                    <Button
                        asChild
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-white dark:text-white dark:hover:bg-white/10 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                        <a
                            href="https://github.com/dlgkiet/team-tasker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            GIVE ME A STAR
                            <Github className="w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="w-full bg-gradient-to-b from-indigo-100 to-white dark:from-[#090916] dark:to-[#1c1c30] py-20 px-6 transition-all duration-500 ease-in-out">
                <div className="max-w-5xl mx-auto text-center mb-14">
                    <span className="uppercase text-sm font-semibold text-orange-500 tracking-widest">
                        App Features
                    </span>
                    <h2 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                        Explore powerful tools
                    </h2>
                    <p className="text-slate-600 dark:text-white/80 mt-2">
                        Manage your workflow with ease.
                    </p>
                </div>

                {/* Carousel Features */}
                <div className="relative max-w-5xl mx-auto overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={controls}
                        style={{ width: totalWidth * 2 }} // Nhân đôi để lặp lại mượt mà
                        onHoverStart={() => controls.stop()} // Dừng khi hover
                        onHoverEnd={() =>
                            controls.start({
                                x: -totalWidth,
                                transition: {
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 10,
                                        ease: "linear",
                                    },
                                },
                            })
                        } // Tiếp tục khi rời hover
                    >
                        {/* Render features 2 lần để tạo hiệu ứng lặp vô hạn */}
                        {[...features, ...features].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-black/5 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md text-left w-full max-w-sm mx-2"
                                >
                                    <Icon className="w-6 h-6 mb-3 text-indigo-500" />
                                    <h3 className="font-semibold text-lg mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-white/70">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* SHOWCASE SECTION */}
            <Showcase />
        </Layout>
    );
};

export default Dashboard;