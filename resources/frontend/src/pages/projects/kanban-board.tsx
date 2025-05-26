"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DndContext,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    DragOverlay,
    rectIntersection,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createPortal } from "react-dom";
import {
    Calendar,
    Clock,
    MoreHorizontal,
    Plus,
    Target,
    Users,
    CheckCircle2,
    Timer,
    Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
    id: number;
    name: string;
    description?: string;
    members: string[];
    status: "Untagged" | "To Do" | "Processing" | "Done";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
    progress?: number;
    tags?: string[];
    estimatedHours?: number;
}

const initialTasks: Task[] = [
    {
        id: 1,
        name: "User Acceptance Testing",
        description: "Conduct comprehensive UAT for the new features",
        members: ["RA", "C"],
        status: "To Do",
        priority: "high",
        dueDate: "2025-03-03T09:00:00",
        progress: 0,
        tags: ["testing", "frontend"],
        estimatedHours: 16,
    },
    {
        id: 2,
        name: "Unit Testing Implementation",
        description: "Write and execute unit tests for core modules",
        members: ["RC", "H"],
        status: "Processing",
        priority: "medium",
        dueDate: "2025-09-13T16:00:00",
        progress: 65,
        tags: ["testing", "backend"],
        estimatedHours: 24,
    },
    {
        id: 3,
        name: "API Integration",
        description: "Integrate third-party APIs and handle authentication",
        members: ["T"],
        status: "Done",
        priority: "urgent",
        dueDate: "2025-04-22T22:00:00",
        progress: 100,
        tags: ["api", "backend"],
        estimatedHours: 12,
    },
    {
        id: 4,
        name: "Database Schema Design",
        description: "Design and optimize database schema for performance",
        members: ["N", "D"],
        status: "Untagged",
        priority: "medium",
        dueDate: "2025-06-15T14:00:00",
        progress: 0,
        tags: ["database", "design"],
        estimatedHours: 20,
    },
    {
        id: 5,
        name: "UI/UX Improvements",
        description: "Enhance user interface based on feedback",
        members: ["RA", "C", "H"],
        status: "Processing",
        priority: "low",
        dueDate: "2025-07-01T12:00:00",
        progress: 30,
        tags: ["ui", "design"],
        estimatedHours: 32,
    },
];

// Mock users data
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
    { id: "H", name: "Helen", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "T", name: "Thomas", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "N", name: "Nancy", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "D", name: "David", avatar: "/placeholder.svg?height=32&width=32" },
];

// Component cho mỗi task có thể kéo thả
const SortableTask = ({
    task,
    isOverlay,
}: {
    task: Task;
    isOverlay?: boolean;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: { type: "Task", task },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: transition || "transform 200ms ease",
        opacity: isDragging && !isOverlay ? 0.3 : 1,
        zIndex: isDragging ? 100 : 0,
    };

    // Calculate deadline info
    const formatDeadlineInfo = (dueDate: string) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diffMs = due.getTime() - now.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        let isOverdue = false;
        let urgency: "low" | "medium" | "high" = "low";

        if (diffMs < 0) {
            isOverdue = true;
            urgency = "high";
        } else if (diffDays <= 3) {
            urgency = "high";
        } else if (diffDays <= 7) {
            urgency = "medium";
        }

        return {
            deadline: due.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            isOverdue,
            urgency,
            diffDays: Math.abs(diffDays),
        };
    };

    const deadlineInfo = formatDeadlineInfo(task.dueDate);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "bg-red-100 text-red-800 border-red-200";
            case "high":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "medium":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "low":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group hover:shadow-lg transition-all duration-300 cursor-grab active:cursor-grabbing border-0 shadow-md",
                isOverlay && "ring-2 ring-primary shadow-2xl",
                isDragging && "shadow-2xl"
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                            {task.name}
                        </h3>
                        {task.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {task.description}
                            </p>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
                {/* Priority and Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === "To Do"
                            ? "bg-red-200 text-red-800 dark:bg-red-300/20 dark:text-red-300"
                            : task.status === "Processing"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-200/20 dark:text-amber-300"
                            : task.status === "Done"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground"
                    }`}
                >
                    {task.status}
                </span>
                    {task.tags?.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs h-5"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {task.tags && task.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs h-5">
                            +{task.tags.length - 2}
                        </Badge>
                    )}
                </div>

                {/* Team Members */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                        {task.members.slice(0, 3).map((memberId) => {
                            const member = mockUsers.find(
                                (u) => u.id === memberId
                            );
                            return (
                                <Avatar
                                    key={memberId}
                                    className="h-6 w-6 border-2 border-background"
                                >
                                    <AvatarImage
                                        src={
                                            member?.avatar || "/placeholder.svg"
                                        }
                                        alt={member?.name}
                                    />
                                    <AvatarFallback className="text-xs font-medium">
                                        {memberId}
                                    </AvatarFallback>
                                </Avatar>
                            );
                        })}
                        {task.members.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                                +{task.members.length - 3}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{task.members.length}</span>
                    </div>
                </div>

                {/* Due Date and Time */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{deadlineInfo.deadline}</span>
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-1",
                            deadlineInfo.isOverdue
                                ? "text-red-600"
                                : deadlineInfo.urgency === "high"
                                ? "text-orange-600"
                                : deadlineInfo.urgency === "medium"
                                ? "text-yellow-600"
                                : "text-muted-foreground"
                        )}
                    >
                        <Clock className="h-3 w-3" />
                        <span>
                            {deadlineInfo.isOverdue
                                ? "Overdue"
                                : deadlineInfo.diffDays === 0
                                ? "Today"
                                : `${deadlineInfo.diffDays}d left`}
                        </span>
                    </div>
                </div>

                {/* Estimated Hours */}
                {task.estimatedHours && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Timer className="h-3 w-3" />
                        <span>{task.estimatedHours}h estimated</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Component cho mỗi cột
const BoardColumn = ({
    status,
    tasks,
    isOverlay,
}: {
    status: "Untagged" | "To Do" | "Processing" | "Done";
    tasks: Task[];
    isOverlay?: boolean;
}) => {
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const getColumnConfig = (status: string) => {
        switch (status) {
            case "Untagged":
                return {
                    title: "Untagged",
                    icon: Circle,
                    color: "bg-gray-50 border-gray-200",
                    headerColor: "text-gray-700",
                    count: tasks.length,
                };
            case "To Do":
                return {
                    title: "To Do",
                    icon: Target,
                    color: "bg-blue-50 border-blue-200",
                    headerColor: "text-blue-700",
                    count: tasks.length,
                };
            case "Processing":
                return {
                    title: "In Progress",
                    icon: Timer,
                    color: "bg-yellow-50 border-yellow-200",
                    headerColor: "text-yellow-700",
                    count: tasks.length,
                };
            case "Done":
                return {
                    title: "Completed",
                    icon: CheckCircle2,
                    color: "bg-green-50 border-green-200",
                    headerColor: "text-green-700",
                    count: tasks.length,
                };
            default:
                return {
                    title: status,
                    icon: Circle,
                    color: "bg-gray-50 border-gray-200",
                    headerColor: "text-gray-700",
                    count: tasks.length,
                };
        }
    };

    const config = getColumnConfig(status);
    const IconComponent = config.icon;

    return (
        <div
            className={cn(
                "rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col h-full",
                config.color,
                isOverlay && "ring-2 ring-primary"
            )}
        >
            {/* Column Header */}
            <div className="p-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <IconComponent
                            className={cn("h-5 w-5", config.headerColor)}
                        />
                        <h2
                            className={cn(
                                "font-semibold text-lg",
                                config.headerColor
                            )}
                        >
                            {config.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {config.count}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 px-4 pb-4">
                <ScrollArea className="h-[calc(100vh-280px)]">
                    <DroppableColumnZone id={status.replace(/\s/g, "")}>
                        <SortableContext
                            items={tasksIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3 min-h-[100px] pb-4">
                                {tasks.map((task) => (
                                    <SortableTask key={task.id} task={task} />
                                ))}
                                {tasks.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <IconComponent className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            No tasks yet
                                        </p>
                                        <p className="text-xs text-muted-foreground/70">
                                            Drag tasks here or create new ones
                                        </p>
                                    </div>
                                )}
                            </div>
                        </SortableContext>
                    </DroppableColumnZone>
                </ScrollArea>
            </div>
        </div>
    );
};

const DroppableColumnZone = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "min-h-[100px] transition-all duration-200 rounded-lg",
                isOver && "bg-primary/5 ring-2 ring-primary/20"
            )}
        >
            {children}
        </div>
    );
};

const KanbanBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const columns: ("Untagged" | "To Do" | "Processing" | "Done")[] = [
        "Untagged",
        "To Do",
        "Processing",
        "Done",
    ];
    const columnsId = useMemo(
        () => columns.map((col) => col.replace(/\s/g, "")),
        []
    );

    // Thiết lập sensors
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Xử lý khi bắt đầu kéo
    const onDragStart = (event: any) => {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
        }
    };

    // Xử lý khi kéo qua
    const onDragOver = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Kéo task qua task khác
        if (isActiveATask && isOverATask) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (t) => t.id === activeId
                );
                const overIndex = prevTasks.findIndex((t) => t.id === overId);
                const activeTask = prevTasks[activeIndex];
                const overTask = prevTasks[overIndex];

                if (
                    activeTask &&
                    overTask &&
                    activeTask.status !== overTask.status
                ) {
                    activeTask.status = overTask.status;
                    return arrayMove(prevTasks, activeIndex, overIndex - 1);
                }

                return arrayMove(prevTasks, activeIndex, overIndex);
            });
        }

        // Kéo task qua cột
        const isOverAColumn = columnsId.includes(over.id);
        if (isActiveATask && isOverAColumn) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (t) => t.id === activeId
                );
                const activeTask = prevTasks[activeIndex];
                if (activeTask) {
                    activeTask.status = columns.find(
                        (col) => col.replace(/\s/g, "") === over.id
                    ) as Task["status"];
                    return arrayMove(prevTasks, activeIndex, activeIndex);
                }
                return prevTasks;
            });
        }
    };

    // Xử lý khi thả
    const onDragEnd = (event: any) => {
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Thả task vào task khác
        if (isActiveATask && isOverATask) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (t) => t.id === activeId
                );
                const overIndex = prevTasks.findIndex((t) => t.id === overId);
                const activeTask = prevTasks[activeIndex];
                const overTask = prevTasks[overIndex];

                if (
                    activeTask &&
                    overTask &&
                    activeTask.status !== overTask.status
                ) {
                    activeTask.status = overTask.status;
                    return arrayMove(prevTasks, activeIndex, overIndex - 1);
                }

                return arrayMove(prevTasks, activeIndex, overIndex);
            });
        }

        // Thả task vào cột
        const isOverAColumn = columnsId.includes(over.id);

        if (isActiveATask && isOverAColumn) {
            setTasks((prevTasks) => {
                const activeIndex = prevTasks.findIndex(
                    (t) => t.id === activeId
                );
                const activeTask = prevTasks[activeIndex];
                if (activeTask) {
                    activeTask.status = columns.find(
                        (col) => col.replace(/\s/g, "") === over.id
                    ) as Task["status"];
                    return arrayMove(prevTasks, activeIndex, activeIndex);
                }
                return prevTasks;
            });
        }
    };

    // Calculate board stats
    const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "Done").length,
        inProgress: tasks.filter((t) => t.status === "Processing").length,
        overdue: tasks.filter((t) => {
            const due = new Date(t.dueDate);
            const now = new Date();
            return due < now && t.status !== "Done";
        }).length,
    };

    return (
        <div className="space-y-6">
            {/* Board Header with Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Project Board</h1>
                    <p className="text-muted-foreground">
                        Manage your tasks with drag and drop
                    </p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="text-center">
                        <div className="font-semibold text-lg">
                            {stats.total}
                        </div>
                        <div className="text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-lg text-green-600">
                            {stats.completed}
                        </div>
                        <div className="text-muted-foreground">Done</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-lg text-yellow-600">
                            {stats.inProgress}
                        </div>
                        <div className="text-muted-foreground">In Progress</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold text-lg text-red-600">
                            {stats.overdue}
                        </div>
                        <div className="text-muted-foreground">Overdue</div>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <BoardColumn
                                key={col}
                                status={col}
                                tasks={tasks.filter(
                                    (task) => task.status === col
                                )}
                            />
                        ))}
                    </SortableContext>
                </div>
                {"document" in window &&
                    createPortal(
                        <DragOverlay>
                            {activeTask && (
                                <SortableTask task={activeTask} isOverlay />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
