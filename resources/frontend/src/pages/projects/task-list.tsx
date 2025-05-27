"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertCircle,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Edit,
    Filter,
    Plus,
    Search,
    Star,
    Trash2,
    Users,
    X,
    Target,
    Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Enhanced interfaces
interface Task {
    id: number;
    name: string;
    description?: string;
    members: string[];
    status: "untagged" | "todo" | "in_progress" | "review" | "done";
    dueDate: string;
    createdAt: string;
    tags: string[];
    progress: number;
    isStarred: boolean;
    estimatedHours?: number;
    actualHours?: number;
}

interface DialogState {
    open: boolean;
    type: "delete" | "complete" | "edit" | "create" | "";
    id: number | null;
}

interface EditTaskState {
    id: number | null;
    name: string;
    description: string;
    members: string[];
    status: Task["status"];
    dueDate: string;
    tags: string[];
    estimatedHours: number;
}

const TaskList: React.FC = () => {
    const mockUsers = [
        {
            id: "RA",
            name: "Robert Anderson",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "C",
            name: "Catherine",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "RC",
            name: "Richard Chen",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "H",
            name: "Helen",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "T",
            name: "Thomas",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "N",
            name: "Nancy",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        {
            id: "D",
            name: "David",
            avatar: "/placeholder.svg?height=32&width=32",
        },
    ];

    const initialTasks: Task[] = [
        {
            id: 1,
            name: "User Acceptance Testing",
            description: "Conduct comprehensive UAT for the new features",
            members: ["RA", "C"],
            status: "todo",
            dueDate: "2025-03-03T09:00:00",
            createdAt: "2025-01-15T10:00:00",
            tags: ["testing", "frontend"],
            progress: 0,
            isStarred: true,
            estimatedHours: 16,
            actualHours: 0,
        },
        {
            id: 2,
            name: "Unit Testing Implementation",
            description: "Write and execute unit tests for core modules",
            members: ["RC", "H"],
            status: "in_progress",
            dueDate: "2025-09-13T16:00:00",
            createdAt: "2025-01-10T10:00:00",
            tags: ["testing", "backend"],
            progress: 65,
            isStarred: false,
            estimatedHours: 24,
            actualHours: 15,
        },
        {
            id: 3,
            name: "API Integration",
            description: "Integrate third-party APIs and handle authentication",
            members: ["T"],
            status: "done",
            dueDate: "2025-04-22T22:00:00",
            createdAt: "2025-01-05T10:00:00",
            tags: ["api", "backend"],
            progress: 100,
            isStarred: false,
            estimatedHours: 12,
            actualHours: 14,
        },
        {
            id: 4,
            name: "Database Schema Design",
            description: "Design and optimize database schema for performance",
            members: ["N", "D"],
            status: "review",
            dueDate: "2025-06-15T14:00:00",
            createdAt: "2025-01-20T10:00:00",
            tags: ["database", "design"],
            progress: 90,
            isStarred: true,
            estimatedHours: 20,
            actualHours: 18,
        },
        {
            id: 5,
            name: "UI/UX Improvements",
            description: "Enhance user interface based on feedback",
            members: ["RA", "C", "H"],
            status: "untagged",
            dueDate: "2025-07-01T12:00:00",
            createdAt: "2025-01-25T10:00:00",
            tags: ["ui", "design"],
            progress: 0,
            isStarred: false,
            estimatedHours: 32,
            actualHours: 0,
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [dialog, setDialog] = useState<DialogState>({
        open: false,
        type: "",
        id: null,
    });
    const [editTask, setEditTask] = useState<EditTaskState>({
        id: null,
        name: "",
        description: "",
        members: [],
        status: "todo",
        dueDate: "",
        tags: [],
        estimatedHours: 0,
    });

    // Filter and search tasks
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                task.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesStatus =
                statusFilter === "all" || task.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, searchQuery, statusFilter]);

    // Calculate deadline info
    const formatDeadlineInfo = (dueDate: string) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diffMs = due.getTime() - now.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        let remaining: string;
        let isOverdue = false;
        let urgency: "low" | "medium" | "high" = "low";

        if (diffMs < 0) {
            remaining = "Overdue";
            isOverdue = true;
            urgency = "high";
        } else if (diffDays === 0) {
            remaining = `${diffHours}h left`;
            urgency = "high";
        } else if (diffDays <= 3) {
            remaining = `${diffDays}d left`;
            urgency = "medium";
        } else {
            remaining = `${diffDays}d left`;
            urgency = "low";
        }

        return {
            deadline: due.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            remaining,
            isOverdue,
            urgency,
        };
    };

    // Status configurations
    const statusConfig = {
        untagged: {
            label: "Untagged",
            color: "bg-gray-100 text-gray-800 border-gray-200",
            icon: Target,
        },
        todo: {
            label: "To Do",
            color: "bg-blue-100 text-blue-800 border-blue-200",
            icon: Clock,
        },
        in_progress: {
            label: "In Progress",
            color: "bg-yellow-100 text-yellow-800 border-yellow-200",
            icon: Timer,
        },
        review: {
            label: "Review",
            color: "bg-purple-100 text-purple-800 border-purple-200",
            icon: Search,
        },
        done: {
            label: "Done",
            color: "bg-green-100 text-green-800 border-green-200",
            icon: CheckCircle2,
        },
    };

    // Handlers
    const toggleSelectAll = () => {
        if (selectedIds.length === filteredTasks.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredTasks.map((t) => t.id));
        }
    };

    const toggleTaskSelection = (taskId: number) => {
        setSelectedIds((prev) =>
            prev.includes(taskId)
                ? prev.filter((id) => id !== taskId)
                : [...prev, taskId]
        );
    };

    const handleEdit = (task: Task) => {
        setEditTask({
            id: task.id,
            name: task.name,
            description: task.description || "",
            members: task.members,
            status: task.status,
            dueDate: task.dueDate,
            tags: task.tags,
            estimatedHours: task.estimatedHours || 0,
        });
        setDialog({ open: true, type: "edit", id: task.id });
    };

    const handleDelete = (taskId: number) => {
        setDialog({ open: true, type: "delete", id: taskId });
    };

    const handleComplete = (taskId: number) => {
        setDialog({ open: true, type: "complete", id: taskId });
    };

    const toggleStar = (taskId: number) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, isStarred: !t.isStarred } : t
            )
        );
    };

    const confirmAction = () => {
        if (dialog.type === "delete" && dialog.id) {
            setTasks((prev) => prev.filter((t) => t.id !== dialog.id));
            setSelectedIds((prev) => prev.filter((id) => id !== dialog.id));
            toast.success("Task deleted successfully!");
        }

        if (dialog.type === "complete" && dialog.id) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === dialog.id
                        ? { ...t, status: "done", progress: 100 }
                        : t
                )
            );
            toast.success("Task completed!");
        }

        if (dialog.type === "edit" && dialog.id) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === dialog.id
                        ? {
                              ...t,
                              name: editTask.name,
                              description: editTask.description,
                              members: editTask.members,
                              status: editTask.status,
                              dueDate: editTask.dueDate,
                              tags: editTask.tags,
                              estimatedHours: editTask.estimatedHours,
                          }
                        : t
                )
            );
            toast.success("Task updated successfully!");
        }

        setDialog({ open: false, type: "", id: null });
    };

    const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId
                    ? {
                          ...t,
                          status: newStatus,
                          progress:
                              newStatus === "done"
                                  ? 100
                                  : newStatus === "in_progress"
                                  ? Math.max(t.progress, 10)
                                  : t.progress,
                      }
                    : t
            )
        );
    };

    // Calculate stats
    const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "done").length,
        inProgress: tasks.filter((t) => t.status === "in_progress").length,
        overdue: tasks.filter(
            (t) =>
                formatDeadlineInfo(t.dueDate).isOverdue && t.status !== "done"
        ).length,
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Tasks
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total}
                                </p>
                            </div>
                            <Target className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.completed}
                                </p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    In Progress
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.inProgress}
                                </p>
                            </div>
                            <Timer className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Overdue
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.overdue}
                                </p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>
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
                                    placeholder="Search tasks, descriptions, or tags..."
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
                                    <SelectItem value="untagged">
                                        Untagged
                                    </SelectItem>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="review">
                                        Review
                                    </SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedIds.length > 0 && (
                        <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {selectedIds.length} tasks selected
                            </span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                    Mark Complete
                                </Button>
                                <Button size="sm" variant="destructive">
                                    Delete Selected
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Tasks Display */}
            {filteredTasks.length > 0 ? (
                <>
                    {/* Table View */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={
                                                    selectedIds.length ===
                                                        filteredTasks.length &&
                                                    filteredTasks.length > 0
                                                }
                                                onCheckedChange={
                                                    toggleSelectAll
                                                }
                                            />
                                        </TableHead>
                                        <TableHead>Task</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead>Assignees</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead className="w-32">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTasks.map((task) => {
                                        const deadlineInfo = formatDeadlineInfo(
                                            task.dueDate
                                        );

                                        return (
                                            <TableRow
                                                key={task.id}
                                                className={cn(
                                                    "hover:bg-muted/50 transition-colors",
                                                    selectedIds.includes(
                                                        task.id
                                                    ) && "bg-muted/50"
                                                )}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedIds.includes(
                                                            task.id
                                                        )}
                                                        onCheckedChange={() =>
                                                            toggleTaskSelection(
                                                                task.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-medium">
                                                                {task.name}
                                                            </h3>
                                                            {task.isStarred && (
                                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            )}
                                                        </div>
                                                        {task.description && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                                                                {
                                                                    task.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={task.status}
                                                        onValueChange={(
                                                            value: Task["status"]
                                                        ) =>
                                                            updateTaskStatus(
                                                                task.id,
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger
                                                            className={cn(
                                                                "w-auto h-8 text-xs",
                                                                statusConfig[
                                                                    task.status
                                                                ].color
                                                            )}
                                                        >
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Object.entries(
                                                                statusConfig
                                                            ).map(
                                                                ([
                                                                    key,
                                                                    config,
                                                                ]) => (
                                                                    <SelectItem
                                                                        key={
                                                                            key
                                                                        }
                                                                        value={
                                                                            key
                                                                        }
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <config.icon className="h-3 w-3" />
                                                                            {
                                                                                config.label
                                                                            }
                                                                        </div>
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {task.tags
                                                            .slice(0, 2)
                                                            .map((tag) => (
                                                                <Badge
                                                                    key={tag}
                                                                    variant="secondary"
                                                                    className="text-xs"
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        {task.tags.length >
                                                            2 && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                +
                                                                {task.tags
                                                                    .length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex -space-x-1">
                                                            {task.members
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        memberId
                                                                    ) => {
                                                                        const member =
                                                                            mockUsers.find(
                                                                                (
                                                                                    u
                                                                                ) =>
                                                                                    u.id ===
                                                                                    memberId
                                                                            );
                                                                        return (
                                                                            <Avatar
                                                                                key={
                                                                                    memberId
                                                                                }
                                                                                className="h-6 w-6 border-2 border-background"
                                                                            >
                                                                                <AvatarImage
                                                                                    src={
                                                                                        member?.avatar ||
                                                                                        "/placeholder.svg"
                                                                                    }
                                                                                    alt={
                                                                                        member?.name
                                                                                    }
                                                                                />
                                                                                <AvatarFallback className="text-xs">
                                                                                    {
                                                                                        memberId
                                                                                    }
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                        );
                                                                    }
                                                                )}
                                                            {task.members
                                                                .length > 3 && (
                                                                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                                                                    +
                                                                    {task
                                                                        .members
                                                                        .length -
                                                                        3}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <Users className="h-3 w-3" />
                                                            <span>
                                                                {
                                                                    task.members
                                                                        .length
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>
                                                                {
                                                                    deadlineInfo.deadline
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                "flex items-center gap-1 text-xs",
                                                                deadlineInfo.isOverdue
                                                                    ? "text-red-600"
                                                                    : deadlineInfo.urgency ===
                                                                      "high"
                                                                    ? "text-orange-600"
                                                                    : deadlineInfo.urgency ===
                                                                      "medium"
                                                                    ? "text-yellow-600"
                                                                    : "text-muted-foreground"
                                                            )}
                                                        >
                                                            <Clock className="h-3 w-3" />
                                                            <span>
                                                                {
                                                                    deadlineInfo.remaining
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                handleEdit(
                                                                    task
                                                                );
                                                            }}
                                                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                toggleStar(
                                                                    task.id
                                                                );
                                                            }}
                                                            className={cn(
                                                                "h-8 w-8 p-0",
                                                                task.isStarred
                                                                    ? "hover:bg-yellow-100 text-yellow-500 hover:text-yellow-600"
                                                                    : "hover:bg-yellow-100 hover:text-yellow-600"
                                                            )}
                                                        >
                                                            <Star
                                                                className={cn(
                                                                    "h-4 w-4",
                                                                    task.isStarred &&
                                                                        "fill-current"
                                                                )}
                                                            />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                handleComplete(
                                                                    task.id
                                                                );
                                                            }}
                                                            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                handleDelete(
                                                                    task.id
                                                                );
                                                            }}
                                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            ) : (
                /* Empty State */
                <Card className="text-center py-12">
                    <CardContent>
                        <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            {searchQuery || statusFilter !== "all"
                                ? "No tasks found"
                                : "No tasks yet"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search criteria or filters."
                                : "Create your first task to get started."}
                        </p>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Task
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Dialogs */}
            <Dialog
                open={
                    dialog.open &&
                    (dialog.type === "delete" || dialog.type === "complete")
                }
                onOpenChange={(open) =>
                    !open && setDialog({ open: false, type: "", id: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialog.type === "delete"
                                ? "Delete Task"
                                : "Complete Task"}
                        </DialogTitle>
                        <DialogDescription>
                            {dialog.type === "delete"
                                ? "Are you sure you want to delete this task? This action cannot be undone."
                                : "Are you sure you want to mark this task as complete?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDialog({ open: false, type: "", id: null })
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmAction}
                            variant={
                                dialog.type === "delete"
                                    ? "destructive"
                                    : "default"
                            }
                        >
                            {dialog.type === "delete" ? "Delete" : "Complete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                open={dialog.open && dialog.type === "edit"}
                onOpenChange={(open) =>
                    !open && setDialog({ open: false, type: "", id: null })
                }
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                            Update task details and settings.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="task-name">Task Name</Label>
                            <Input
                                id="task-name"
                                value={editTask.name}
                                onChange={(e) =>
                                    setEditTask({
                                        ...editTask,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="task-description">
                                Description
                            </Label>
                            <Textarea
                                id="task-description"
                                value={editTask.description}
                                onChange={(e) =>
                                    setEditTask({
                                        ...editTask,
                                        description: e.target.value,
                                    })
                                }
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    value={editTask.status}
                                    onValueChange={(value: Task["status"]) =>
                                        setEditTask({
                                            ...editTask,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusConfig).map(
                                            ([key, config]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
                                                    {config.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Team Members</Label>
                            <div className="flex flex-wrap gap-2">
                                {mockUsers.map((user) => (
                                    <Badge
                                        key={user.id}
                                        variant="secondary"
                                        className={cn(
                                            "cursor-pointer transition-all hover:scale-105",
                                            editTask.members.includes(user.id)
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground"
                                        )}
                                        onClick={() => {
                                            const isSelected =
                                                editTask.members.includes(
                                                    user.id
                                                );
                                            setEditTask({
                                                ...editTask,
                                                members: isSelected
                                                    ? editTask.members.filter(
                                                          (m) => m !== user.id
                                                      )
                                                    : [
                                                          ...editTask.members,
                                                          user.id,
                                                      ],
                                            });
                                        }}
                                    >
                                        {user.id}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="due-date">Due Date</Label>
                                <Input
                                    id="due-date"
                                    type="datetime-local"
                                    value={editTask.dueDate.slice(0, 16)}
                                    onChange={(e) =>
                                        setEditTask({
                                            ...editTask,
                                            dueDate: e.target.value + ":00",
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="estimated-hours">
                                    Estimated Hours
                                </Label>
                                <Input
                                    id="estimated-hours"
                                    type="number"
                                    value={editTask.estimatedHours}
                                    onChange={(e) =>
                                        setEditTask({
                                            ...editTask,
                                            estimatedHours: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDialog({ open: false, type: "", id: null })
                            }
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmAction}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TaskList;
