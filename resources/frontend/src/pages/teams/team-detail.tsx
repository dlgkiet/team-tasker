import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    CheckCircle2,
    Clock,
    FolderOpen,
    MoreHorizontal,
    Plus,
    Settings,
    Users,
    UserPlus,
    AlertCircle,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Layout from "../../components/layouts";

// Mock data based on the database schema
const teamData = {
    id: 1,
    name: "Design Team",
    created_at: "2024-01-15T10:00:00Z",
    memberCount: 8,
    projectCount: 5,
    activeTaskCount: 23,
};

const teamMembers = [
    {
        id: 1,
        user: {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah@company.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        role: "Team Lead",
        joinedAt: "2024-01-15T10:00:00Z",
    },
    {
        id: 2,
        user: {
            id: 2,
            name: "Mike Chen",
            email: "mike@company.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        role: "Senior Designer",
        joinedAt: "2024-01-20T10:00:00Z",
    },
    {
        id: 3,
        user: {
            id: 3,
            name: "Emily Rodriguez",
            email: "emily@company.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        role: "UX Designer",
        joinedAt: "2024-02-01T10:00:00Z",
    },
    {
        id: 4,
        user: {
            id: 4,
            name: "David Kim",
            email: "david@company.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        role: "UI Designer",
        joinedAt: "2024-02-10T10:00:00Z",
    },
    {
        id: 5,
        user: {
            id: 5,
            name: "Lisa Wang",
            email: "lisa@company.com",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        role: "Designer",
        joinedAt: "2024-02-15T10:00:00Z",
    },
];

const projects = [
    {
        id: 1,
        name: "Mobile App Redesign",
        description: "Complete redesign of the mobile application interface",
        team_id: 1,
        created_at: "2024-01-20T10:00:00Z",
        taskCount: 12,
        completedTasks: 8,
        memberCount: 4,
    },
    {
        id: 2,
        name: "Website Refresh",
        description: "Update the company website with new branding",
        team_id: 1,
        created_at: "2024-02-01T10:00:00Z",
        taskCount: 8,
        completedTasks: 3,
        memberCount: 3,
    },
    {
        id: 3,
        name: "Design System",
        description: "Create a comprehensive design system for all products",
        team_id: 1,
        created_at: "2024-02-10T10:00:00Z",
        taskCount: 15,
        completedTasks: 5,
        memberCount: 5,
    },
];

const recentTasks = [
    {
        id: 1,
        title: "Create wireframes for login flow",
        status: "completed",
        assigned_to: 2,
        assignee_name: "Mike Chen",
        project_name: "Mobile App Redesign",
        due_date: "2024-01-25T10:00:00Z",
    },
    {
        id: 2,
        title: "Design homepage hero section",
        status: "in_progress",
        assigned_to: 3,
        assignee_name: "Emily Rodriguez",
        project_name: "Website Refresh",
        due_date: "2024-01-28T10:00:00Z",
    },
    {
        id: 3,
        title: "Review color palette",
        status: "pending",
        assigned_to: 1,
        assignee_name: "Sarah Johnson",
        project_name: "Design System",
        due_date: "2024-01-30T10:00:00Z",
    },
    {
        id: 4,
        title: "Create button components",
        status: "overdue",
        assigned_to: 4,
        assignee_name: "David Kim",
        project_name: "Design System",
        due_date: "2024-01-22T10:00:00Z",
    },
];

function getRoleColor(role: string) {
    switch (role.toLowerCase()) {
        case "team lead":
            return "bg-purple-100 text-purple-800";
        case "senior designer":
            return "bg-blue-100 text-blue-800";
        case "ux designer":
            return "bg-green-100 text-green-800";
        case "ui designer":
            return "bg-orange-100 text-orange-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800";
        case "in_progress":
            return "bg-blue-100 text-blue-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "overdue":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function getStatusIcon(status: string) {
    switch (status) {
        case "completed":
            return <CheckCircle2 className="h-4 w-4" />;
        case "in_progress":
            return <Clock className="h-4 w-4" />;
        case "overdue":
            return <AlertCircle className="h-4 w-4" />;
        default:
            return <Clock className="h-4 w-4" />;
    }
}

export default function TeamDetail() {
    return (
        <Layout>
            <div className="container mx-auto p-6 space-y-6">
                {/* Team Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{teamData.name}</h1>
                        <p className="text-muted-foreground">
                            Created on{" "}
                            {new Date(teamData.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite Member
                        </Button>
                        <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Project
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Team Members
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {teamData.memberCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active members
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Projects
                            </CardTitle>
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {teamData.projectCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                In progress
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Tasks
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {teamData.activeTaskCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all projects
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="activity">
                            Recent Activity
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Team Members Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        Team Members
                                        <Button variant="ghost" size="sm">
                                            View All
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>
                                        {teamMembers.length} members in this
                                        team
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {teamMembers.slice(0, 4).map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            member.user
                                                                .avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={member.user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {member.user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {member.user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {member.user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={getRoleColor(
                                                    member.role
                                                )}
                                            >
                                                {member.role}
                                            </Badge>
                                        </div>
                                    ))}
                                    {teamMembers.length > 4 && (
                                        <p className="text-sm text-muted-foreground text-center">
                                            +{teamMembers.length - 4} more
                                            members
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Recent Projects */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        Active Projects
                                        <Button variant="ghost" size="sm">
                                            View All
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>
                                        {projects.length} active projects
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {projects.slice(0, 3).map((project) => (
                                        <div
                                            key={project.id}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">
                                                    {project.name}
                                                </h4>
                                                <span className="text-xs text-muted-foreground">
                                                    {project.memberCount}{" "}
                                                    members
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {project.description}
                                            </p>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>Progress</span>
                                                    <span>
                                                        {project.completedTasks}
                                                        /{project.taskCount}{" "}
                                                        tasks
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={
                                                        (project.completedTasks /
                                                            project.taskCount) *
                                                        100
                                                    }
                                                    className="h-2"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="members" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>
                                    Manage your team members and their roles
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            member.user
                                                                .avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={member.user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {member.user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {member.user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {member.user.email}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Joined{" "}
                                                        {new Date(
                                                            member.joinedAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge
                                                    className={getRoleColor(
                                                        member.role
                                                    )}
                                                >
                                                    {member.role}
                                                </Badge>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            Edit Role
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            Remove from Team
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project) => (
                                <Card key={project.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            {project.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Progress
                                            </span>
                                            <span>
                                                {project.completedTasks}/
                                                {project.taskCount} tasks
                                            </span>
                                        </div>
                                        <Progress
                                            value={
                                                (project.completedTasks /
                                                    project.taskCount) *
                                                100
                                            }
                                            className="h-2"
                                        />
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                                <Users className="h-4 w-4" />
                                                <span>
                                                    {project.memberCount}{" "}
                                                    members
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(
                                                        project.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                        >
                                            View Project
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest tasks and updates from your team
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentTasks.map((task, index) => (
                                        <div key={task.id}>
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`p-2 rounded-full ${getStatusColor(
                                                            task.status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(
                                                            task.status
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {task.title}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {task.project_name}{" "}
                                                            • Assigned to{" "}
                                                            {task.assignee_name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Due:{" "}
                                                            {new Date(
                                                                task.due_date
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={getStatusColor(
                                                        task.status
                                                    )}
                                                >
                                                    {task.status.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </Badge>
                                            </div>
                                            {index < recentTasks.length - 1 && (
                                                <Separator className="my-2" />
                                            )}
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
}
