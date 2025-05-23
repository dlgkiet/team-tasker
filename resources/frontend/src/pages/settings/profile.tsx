import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    CalendarDays,
    Mail,
    MapPin,
    Phone,
    Edit,
    BarChart3,
    Users,
    CheckCircle2,
} from "lucide-react";
import Layout from "../../components/layouts";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <Layout>
            <div className="px-6 py-8 max-w-7xl mx-auto min-h-screen">
                {/* Profile Header */}
                <div className="py-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24 border-4 border-background">
                            <AvatarImage
                                src="/placeholder.svg?height=96&width=96"
                                alt="User profile"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-grow space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h1 className="text-2xl font-bold">John Doe</h1>
                                <p className="text-muted-foreground">
                                    Senior Project Manager
                                </p>
                            </div>
                            <Button className="w-full sm:w-auto" size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Mail className="mr-1 h-4 w-4" />
                                john.doe@example.com
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="mr-1 h-4 w-4" />
                                (123) 456-7890
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-4 w-4" />
                                San Francisco, CA
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarDays className="mr-1 h-4 w-4" />
                                Joined Jan 2023
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">
                                Project Management
                            </Badge>
                            <Badge variant="secondary">Team Leadership</Badge>
                            <Badge variant="secondary">Agile</Badge>
                            <Badge variant="secondary">Scrum</Badge>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <Tabs
                    defaultValue="overview"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Stats Cards */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Tasks
                                    </CardTitle>
                                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        128
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +14% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Completion Rate
                                    </CardTitle>
                                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        87%
                                    </div>
                                    <Progress value={87} className="h-2 mt-2" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Team Members
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-muted-foreground">
                                        Across 4 active projects
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* About Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Experienced project manager with over 8
                                    years of experience in leading
                                    cross-functional teams and delivering
                                    complex projects on time and within budget.
                                    Skilled in Agile methodologies, risk
                                    management, and stakeholder communication.
                                    Passionate about building efficient
                                    workflows and fostering team collaboration.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Your latest actions and updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            action: "Completed task",
                                            item: "Update project timeline",
                                            time: "2 hours ago",
                                        },
                                        {
                                            action: "Commented on",
                                            item: "Design review meeting notes",
                                            time: "Yesterday",
                                        },
                                        {
                                            action: "Created task",
                                            item: "Prepare Q3 report",
                                            time: "2 days ago",
                                        },
                                        {
                                            action: "Updated",
                                            item: "Team availability calendar",
                                            time: "3 days ago",
                                        },
                                        {
                                            action: "Assigned",
                                            item: "Website redesign tasks to design team",
                                            time: "1 week ago",
                                        },
                                    ].map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {activity.action}{" "}
                                                    <span className="font-semibold">
                                                        {activity.item}
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {activity.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Tasks</CardTitle>
                                <CardDescription>
                                    Manage and track your assigned tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: "Finalize Q3 budget report",
                                            priority: "High",
                                            status: "In Progress",
                                            due: "May 25, 2025",
                                        },
                                        {
                                            title: "Review team performance metrics",
                                            priority: "Medium",
                                            status: "Not Started",
                                            due: "May 27, 2025",
                                        },
                                        {
                                            title: "Prepare client presentation",
                                            priority: "High",
                                            status: "In Progress",
                                            due: "May 24, 2025",
                                        },
                                        {
                                            title: "Update project documentation",
                                            priority: "Low",
                                            status: "Completed",
                                            due: "May 20, 2025",
                                        },
                                        {
                                            title: "Schedule team building event",
                                            priority: "Medium",
                                            status: "Not Started",
                                            due: "June 10, 2025",
                                        },
                                    ].map((task, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b last:border-0 last:pb-0"
                                        >
                                            <div>
                                                <h3 className="font-medium">
                                                    {task.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Due: {task.due}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                                <Badge
                                                    variant={
                                                        task.status ===
                                                        "Completed"
                                                            ? "outline"
                                                            : task.priority ===
                                                              "High"
                                                            ? "destructive"
                                                            : task.priority ===
                                                              "Medium"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {task.priority}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        task.status ===
                                                        "Completed"
                                                            ? "success"
                                                            : task.status ===
                                                              "In Progress"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                >
                                                    {task.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Task Metrics</CardTitle>
                                <CardDescription>
                                    Your task performance overview
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">
                                                Tasks Completed
                                            </span>
                                            <span className="text-sm font-medium">
                                                24/32
                                            </span>
                                        </div>
                                        <Progress value={75} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">
                                                On-time Completion
                                            </span>
                                            <span className="text-sm font-medium">
                                                92%
                                            </span>
                                        </div>
                                        <Progress value={92} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">
                                                Task Efficiency
                                            </span>
                                            <span className="text-sm font-medium">
                                                83%
                                            </span>
                                        </div>
                                        <Progress value={83} className="h-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Team Tab */}
                    <TabsContent value="team" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Team</CardTitle>
                                <CardDescription>
                                    People you work with on projects
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            name: "Sarah Johnson",
                                            role: "UI/UX Designer",
                                            email: "sarah.j@example.com",
                                            avatar: "SJ",
                                        },
                                        {
                                            name: "Michael Chen",
                                            role: "Frontend Developer",
                                            email: "michael.c@example.com",
                                            avatar: "MC",
                                        },
                                        {
                                            name: "Emily Rodriguez",
                                            role: "Product Manager",
                                            email: "emily.r@example.com",
                                            avatar: "ER",
                                        },
                                        {
                                            name: "David Kim",
                                            role: "Backend Developer",
                                            email: "david.k@example.com",
                                            avatar: "DK",
                                        },
                                        {
                                            name: "Lisa Wang",
                                            role: "QA Engineer",
                                            email: "lisa.w@example.com",
                                            avatar: "LW",
                                        },
                                        {
                                            name: "James Wilson",
                                            role: "Data Analyst",
                                            email: "james.w@example.com",
                                            avatar: "JW",
                                        },
                                    ].map((member, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-3 rounded-lg border"
                                        >
                                            <Avatar>
                                                <AvatarFallback>
                                                    {member.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.role}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {member.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Current Projects</CardTitle>
                                <CardDescription>
                                    Projects your team is working on
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "Website Redesign",
                                            progress: 75,
                                            members: 4,
                                            deadline: "June 15, 2025",
                                        },
                                        {
                                            name: "Mobile App Development",
                                            progress: 40,
                                            members: 6,
                                            deadline: "August 30, 2025",
                                        },
                                        {
                                            name: "Marketing Campaign",
                                            progress: 90,
                                            members: 3,
                                            deadline: "May 31, 2025",
                                        },
                                        {
                                            name: "Data Migration",
                                            progress: 20,
                                            members: 5,
                                            deadline: "July 22, 2025",
                                        },
                                    ].map((project, index) => (
                                        <div
                                            key={index}
                                            className="space-y-2 pb-4 border-b last:border-0 last:pb-0"
                                        >
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">
                                                    {project.name}
                                                </h3>
                                                <span className="text-sm text-muted-foreground">
                                                    {project.progress}%
                                                </span>
                                            </div>
                                            <Progress
                                                value={project.progress}
                                                className="h-2"
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>
                                                    {project.members} team
                                                    members
                                                </span>
                                                <span>
                                                    Deadline: {project.deadline}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default Profile;
