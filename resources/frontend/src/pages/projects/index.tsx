import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Search,
    Filter,
    Grid3X3,
    List,
    Calendar,
    Users,
    MoreHorizontal,
    Star,
    FolderOpen,
    Activity,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "../../components/layouts";

// Enhanced mock data with more realistic project information
const generateMockProjects = () => {
    const projectNames = [
        "E-commerce Platform",
        "Mobile Banking App",
        "Social Media Dashboard",
        "AI Chatbot Integration",
        "Cloud Migration",
        "Data Analytics Platform",
        "Customer Portal",
        "Inventory Management",
        "Video Streaming Service",
        "IoT Device Manager",
        "Learning Management System",
        "Healthcare Portal",
        "Real Estate Platform",
        "Food Delivery App",
        "Travel Booking System",
        "Project Management Tool",
        "CRM System",
        "HR Management Platform",
        "Financial Dashboard",
        "Marketing Automation",
    ];

    const teams = [
        "Design Team",
        "Development Team",
        "Marketing Team",
        "Product Team",
        "QA Team",
    ];

    return Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name:
            projectNames[i % projectNames.length] +
            (i >= projectNames.length
                ? ` ${Math.floor(i / projectNames.length) + 1}`
                : ""),
        description: `Comprehensive ${projectNames[
            i % projectNames.length
        ].toLowerCase()} solution with modern features and scalable architecture.`,
        progress: Math.floor(Math.random() * 100),
        team: teams[Math.floor(Math.random() * teams.length)],
        memberCount: Math.floor(Math.random() * 8) + 3,
        taskCount: Math.floor(Math.random() * 50) + 10,
        completedTasks: Math.floor(Math.random() * 30) + 5,
        dueDate: new Date(
            Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ).toISOString(),
        createdAt: new Date(
            Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
        ).toISOString(),
        members: Array.from(
            { length: Math.floor(Math.random() * 4) + 2 },
            (_, j) => ({
                id: j + 1,
                name: `Member ${j + 1}`,
                avatar: `/placeholder.svg?height=32&width=32`,
            })
        ),
    }));
};

interface Project {
    id: number;
    name: string;
    description: string;
    progress: number;
    team: string;
    memberCount: number;
    taskCount: number;
    completedTasks: number;
    dueDate: string;
    createdAt: string;
    members: Array<{
        id: number;
        name: string;
        avatar: string;
    }>;
}

const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12, 18, 24];

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>(generateMockProjects());
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        team: "",
        priority: "medium",
    });

    // Filter and sort projects
    const filteredAndSortedProjects = useMemo(() => {
        const filtered = projects.filter((project) => {
            const matchesSearch =
                project.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchesSearch;
        });

        // Sort projects
        filtered.sort((a, b) => {
            let aValue: any, bValue: any;

            switch (sortBy) {
                case "name":
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case "progress":
                    aValue = a.progress;
                    bValue = b.progress;
                    break;
                case "dueDate":
                    aValue = new Date(a.dueDate).getTime();
                    bValue = new Date(b.dueDate).getTime();
                    break;
                case "createdAt":
                    aValue = new Date(a.createdAt).getTime();
                    bValue = new Date(b.createdAt).getTime();
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [
        projects,
        searchQuery,
        statusFilter,
        priorityFilter,
        sortBy,
        sortOrder,
    ]);

    // Pagination
    const totalPages = Math.ceil(
        filteredAndSortedProjects.length / itemsPerPage
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProjects = filteredAndSortedProjects.slice(
        startIndex,
        endIndex
    );

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

    const handleCreateProject = async () => {
        if (!newProject.name.trim()) {
            toast.error("Project name is required");
            return;
        }

        const project: Project = {
            id: Math.max(...projects.map((p) => p.id)) + 1,
            name: newProject.name,
            description: newProject.description,
            progress: 0,
            team: newProject.team || "Unassigned",
            memberCount: 1,
            taskCount: 0,
            completedTasks: 0,
            dueDate: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            createdAt: new Date().toISOString(),
            members: [],
        };

        setProjects([project, ...projects]);
        setNewProject({
            name: "",
            description: "",
            team: "",
            priority: "medium",
        });
        setIsCreateDialogOpen(false);
        toast.success("Project created successfully!");
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setPriorityFilter("all");
        setSortBy("name");
        setSortOrder("asc");
    };

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Projects</h1>
                        <p className="text-muted-foreground">
                            Manage and track your project portfolio
                        </p>
                    </div>
                    <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button size="lg" className="shadow-lg">
                                <Plus className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Start a new project and begin collaborating
                                    with your team.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="project-name">
                                        Project Name
                                    </Label>
                                    <Input
                                        id="project-name"
                                        placeholder="Enter project name"
                                        value={newProject.name}
                                        onChange={(e) =>
                                            setNewProject({
                                                ...newProject,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="project-description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="project-description"
                                        placeholder="Enter project description"
                                        value={newProject.description}
                                        onChange={(e) =>
                                            setNewProject({
                                                ...newProject,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="project-team">
                                            Team
                                        </Label>
                                        <Select
                                            value={newProject.team}
                                            onValueChange={(value) =>
                                                setNewProject({
                                                    ...newProject,
                                                    team: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Design Team">
                                                    Design Team
                                                </SelectItem>
                                                <SelectItem value="Development Team">
                                                    Development Team
                                                </SelectItem>
                                                <SelectItem value="Marketing Team">
                                                    Marketing Team
                                                </SelectItem>
                                                <SelectItem value="Product Team">
                                                    Product Team
                                                </SelectItem>
                                                <SelectItem value="QA Team">
                                                    QA Team
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="project-priority">
                                            Priority
                                        </Label>
                                        <Select
                                            value={newProject.priority}
                                            onValueChange={(value) =>
                                                setNewProject({
                                                    ...newProject,
                                                    priority: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High
                                                </SelectItem>
                                                <SelectItem value="urgent">
                                                    Urgent
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateProject}>
                                    Create Project
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters and Controls */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search projects..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10 pr-10"
                                    />
                                    {searchQuery && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-2">
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="planning">
                                            Planning
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="review">
                                            Review
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="on_hold">
                                            On Hold
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={priorityFilter}
                                    onValueChange={setPriorityFilter}
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Priority
                                        </SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                        <SelectItem value="urgent">
                                            Urgent
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={sortBy}
                                    onValueChange={setSortBy}
                                >
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">
                                            Name
                                        </SelectItem>
                                        <SelectItem value="progress">
                                            Progress
                                        </SelectItem>
                                        <SelectItem value="dueDate">
                                            Due Date
                                        </SelectItem>
                                        <SelectItem value="createdAt">
                                            Created
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={sortOrder}
                                    onValueChange={(value: "asc" | "desc") =>
                                        setSortOrder(value)
                                    }
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asc">Asc</SelectItem>
                                        <SelectItem value="desc">
                                            Desc
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View Mode Toggle */}
                                <div className="flex border rounded-md">
                                    <Button
                                        variant={
                                            viewMode === "grid"
                                                ? "default"
                                                : "ghost"
                                        }
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="rounded-r-none"
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            viewMode === "list"
                                                ? "default"
                                                : "ghost"
                                        }
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className="rounded-l-none"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>

                                {(searchQuery ||
                                    statusFilter !== "all" ||
                                    priorityFilter !== "all") && (
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                    >
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Results Info */}
                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                            <div>
                                {searchQuery ||
                                statusFilter !== "all" ||
                                priorityFilter !== "all" ? (
                                    <span>
                                        Found {filteredAndSortedProjects.length}{" "}
                                        projects
                                    </span>
                                ) : (
                                    <span>
                                        Showing{" "}
                                        {filteredAndSortedProjects.length}{" "}
                                        projects
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Show:</span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) =>
                                        setItemsPerPage(Number(value))
                                    }
                                >
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ITEMS_PER_PAGE_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option.toString()}
                                                >
                                                    {option}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Display */}
                {currentProjects.length > 0 ? (
                    <>
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentProjects.map((project) => (
                                    <Card
                                        key={project.id}
                                        className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
                                        onClick={() =>
                                            navigate(`/projects/${project.id}`)
                                        }
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                        {project.name}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1 line-clamp-2">
                                                        {project.description}
                                                    </CardDescription>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/projects/${project.id}`
                                                                    )
                                                                }
                                                            >
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Edit Project
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent
                                            className="space-y-4"
                                            onClick={() =>
                                                navigate(
                                                    `/projects/${project.id}`
                                                )
                                            }
                                        >
                                            {/* Progress */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Progress
                                                    </span>
                                                    <span className="font-medium">
                                                        {project.progress}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={project.progress}
                                                    className="h-2"
                                                />
                                            </div>

                                            {/* Team and Stats */}
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        {project.memberCount}{" "}
                                                        members
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Activity className="h-4 w-4" />
                                                    <span>
                                                        {project.completedTasks}
                                                        /{project.taskCount}{" "}
                                                        tasks
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Team Members */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex -space-x-2">
                                                    {project.members
                                                        .slice(0, 3)
                                                        .map((member) => (
                                                            <Avatar
                                                                key={member.id}
                                                                className="h-6 w-6 border-2 border-background"
                                                            >
                                                                <AvatarImage
                                                                    src={
                                                                        member.avatar ||
                                                                        "/placeholder.svg"
                                                                    }
                                                                    alt={
                                                                        member.name
                                                                    }
                                                                />
                                                                <AvatarFallback className="text-xs">
                                                                    {member.name
                                                                        .split(
                                                                            " "
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n
                                                                            ) =>
                                                                                n[0]
                                                                        )
                                                                        .join(
                                                                            ""
                                                                        )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    {project.memberCount >
                                                        3 && (
                                                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                                                            +
                                                            {project.memberCount -
                                                                3}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>
                                                        Due{" "}
                                                        {new Date(
                                                            project.dueDate
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-3">
                                {currentProjects.map((project) => (
                                    <Card
                                        key={project.id}
                                        className="hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() =>
                                            navigate(`/projects/${project.id}`)
                                        }
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold">
                                                                {project.name}
                                                            </h3>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            {
                                                                project.description
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    project.memberCount
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Activity className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    project.completedTasks
                                                                }
                                                                /
                                                                {
                                                                    project.taskCount
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="w-24">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span>
                                                                    Progress
                                                                </span>
                                                                <span>
                                                                    {
                                                                        project.progress
                                                                    }
                                                                    %
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={
                                                                    project.progress
                                                                }
                                                                className="h-1"
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>
                                                                {new Date(
                                                                    project.dueDate
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Edit Project
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Duplicate
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            Showing {startIndex + 1} to{" "}
                                            {Math.min(
                                                endIndex,
                                                filteredAndSortedProjects.length
                                            )}{" "}
                                            of{" "}
                                            {filteredAndSortedProjects.length}{" "}
                                            projects
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToPage(1)}
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronsLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    goToPage(currentPage - 1)
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>

                                            <div className="flex items-center space-x-1">
                                                {Array.from(
                                                    {
                                                        length: Math.min(
                                                            5,
                                                            totalPages
                                                        ),
                                                    },
                                                    (_, i) => {
                                                        let pageNumber;
                                                        if (totalPages <= 5) {
                                                            pageNumber = i + 1;
                                                        } else if (
                                                            currentPage <= 3
                                                        ) {
                                                            pageNumber = i + 1;
                                                        } else if (
                                                            currentPage >=
                                                            totalPages - 2
                                                        ) {
                                                            pageNumber =
                                                                totalPages -
                                                                4 +
                                                                i;
                                                        } else {
                                                            pageNumber =
                                                                currentPage -
                                                                2 +
                                                                i;
                                                        }

                                                        return (
                                                            <Button
                                                                key={pageNumber}
                                                                variant={
                                                                    currentPage ===
                                                                    pageNumber
                                                                        ? "default"
                                                                        : "outline"
                                                                }
                                                                size="sm"
                                                                onClick={() =>
                                                                    goToPage(
                                                                        pageNumber
                                                                    )
                                                                }
                                                                className="w-8 h-8 p-0"
                                                            >
                                                                {pageNumber}
                                                            </Button>
                                                        );
                                                    }
                                                )}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    goToPage(currentPage + 1)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    goToPage(totalPages)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                <ChevronsRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <Card className="text-center py-12">
                        <CardContent>
                            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {searchQuery ||
                                statusFilter !== "all" ||
                                priorityFilter !== "all"
                                    ? "No projects found"
                                    : "No projects yet"}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery ||
                                statusFilter !== "all" ||
                                priorityFilter !== "all"
                                    ? "Try adjusting your search criteria or filters."
                                    : "Create your first project to get started with project management."}
                            </p>
                            {searchQuery ||
                            statusFilter !== "all" ||
                            priorityFilter !== "all" ? (
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                >
                                    Clear Filters
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsCreateDialogOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Project
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default Projects;
