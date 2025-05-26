import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Pencil, Clock } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define interfaces for our types
interface Task {
    id: number;
    name: string;
    members: string[];
    status: "Untagged" | "To Do" | "Processing" | "Done";
    dueDate: string;
}

interface DialogState {
    open: boolean;
    type: "delete" | "check" | "edit" | "";
    id: number | null;
}

interface EditTaskState {
    id: number | null;
    name: string;
    members: string;
    status: "Untagged" | "To Do" | "Processing" | "Done";
    dueDate: string;
}

const TaskList: React.FC = () => {
    const mockUsers = ["RA", "C", "RC", "H", "T", "N", "D"];
    const initialTasks: Task[] = [
        {
            id: 1,
            name: "User Acceptance Testing",
            members: ["RA", "C"],
            status: "To Do",
            dueDate: "2025-03-03T09:00:00",
        },
        {
            id: 2,
            name: "Unit Testing",
            members: ["RC", "H"],
            status: "Processing",
            dueDate: "2025-09-13T16:00:00",
        },
        {
            id: 3,
            name: "API Integration",
            members: ["T"],
            status: "Done",
            dueDate: "2025-04-22T22:00:00",
        },
        {
            id: 4,
            name: "Database Design",
            members: ["N", "D"],
            status: "Untagged",
            dueDate: "2025-06-15T14:00:00",
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [dialog, setDialog] = useState<DialogState>({
        open: false,
        type: "",
        id: null,
    });
    const [editTask, setEditTask] = useState<EditTaskState>({
        id: null,
        name: "",
        members: "",
        status: "Untagged",
        dueDate: "",
    });

    // Calculate remaining time for due dates
    const formatDeadlineInfo = (
        dueDate: string
    ): { deadline: string; remaining: string; isOverdue: boolean } => {
        const due = new Date(dueDate);
        const now = new Date();
        const deadline = due.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        const diffMs = due.getTime() - now.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        let remaining: string;
        let isOverdue = false;

        if (diffMs < 0) {
            remaining = "Overdue";
            isOverdue = true;
        } else if (diffDays > 0) {
            remaining = `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
        } else {
            remaining = `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
        }

        return { deadline, remaining, isOverdue };
    };

    const toggleSelectAll = (): void => {
        if (selectedIds.length === tasks.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(tasks.map((t) => t.id));
        }
    };

    const handleDelete = (id: number): void => {
        setDialog({ open: true, type: "delete", id });
    };

    const handleCheckToggle = (id: number): void => {
        setDialog({ open: true, type: "check", id });
    };

    const handleEdit = (task: Task): void => {
        setEditTask({
            id: task.id,
            name: task.name,
            members: task.members.join(", "),
            status: task.status,
            dueDate: task.dueDate,
        });
        setDialog({ open: true, type: "edit", id: task.id });
    };

    const confirmAction = (): void => {
        if (dialog.type === "delete" && dialog.id) {
            setTasks((prev) => prev.filter((t) => t.id !== dialog.id));
            setSelectedIds((prev) => prev.filter((i) => i !== dialog.id));
            toast.success("Task deleted successfully!");
        }
        if (dialog.type === "check" && dialog.id) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === dialog.id ? { ...t, status: "Done" } : t
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
                              members: editTask.members
                                  .split(",")
                                  .map((m) => m.trim()),
                              status: editTask.status,
                              dueDate: editTask.dueDate,
                          }
                        : t
                )
            );
            toast.success("Task updated successfully!");
        }
        setDialog({ open: false, type: "", id: null });
    };

    const getStatusVariant = (
        status: "Untagged" | "To Do" | "Processing" | "Done"
    ) => {
        switch (status) {
            case "Untagged":
                return "secondary";
            case "To Do":
                return "outline";
            case "Processing":
                return "default";
            case "Done":
                return "default";
            default:
                return "secondary";
        }
    };

    const getStatusColor = (
        status: "Untagged" | "To Do" | "Processing" | "Done"
    ): string => {
        switch (status) {
            case "Untagged":
                return "bg-muted text-muted-foreground border-muted";
            case "To Do":
                return "bg-red-200 text-red-800 border-red-300 dark:bg-red-300/20 dark:text-red-300 dark:border-red-300";
            case "Processing":
                return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-200/20 dark:text-amber-300 dark:border-amber-200";
            case "Done":
                return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800";
            default:
                return "bg-muted text-muted-foreground border-muted";
        }
    };

    return (
        <Card className="w-full bg-background py-0">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left p-4 w-12">
                                    <Checkbox
                                        checked={
                                            selectedIds.length ===
                                                tasks.length && tasks.length > 0
                                        }
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                    Name
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                    Members
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                    Status
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                    Due Date
                                </th>
                                <th className="text-left p-4 font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b border-border hover:bg-muted/30 transition-colors"
                                >
                                    <td className="p-4">
                                        <Checkbox
                                            checked={selectedIds.includes(
                                                task.id
                                            )}
                                            onCheckedChange={(
                                                checked:
                                                    | boolean
                                                    | "indeterminate"
                                            ) =>
                                                setSelectedIds((prev) =>
                                                    checked === true
                                                        ? [...prev, task.id]
                                                        : prev.filter(
                                                              (id) =>
                                                                  id !== task.id
                                                          )
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-foreground">
                                            {task.name}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex -space-x-2">
                                            {task.members.map((m, i) => (
                                                <Avatar
                                                    key={i}
                                                    className="w-7 h-7 border-2 border-background"
                                                >
                                                    <AvatarFallback className="text-xs font-medium">
                                                        {m}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Select
                                            value={task.status}
                                            onValueChange={(
                                                val:
                                                    | "Untagged"
                                                    | "To Do"
                                                    | "Processing"
                                                    | "Done"
                                            ) =>
                                                setTasks((prev) =>
                                                    prev.map((t) =>
                                                        t.id === task.id
                                                            ? {
                                                                  ...t,
                                                                  status: val,
                                                              }
                                                            : t
                                                    )
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    "w-32 h-8 text-xs",
                                                    getStatusColor(task.status)
                                                )}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Untagged">
                                                    Untagged
                                                </SelectItem>
                                                <SelectItem value="To Do">
                                                    To Do
                                                </SelectItem>
                                                <SelectItem value="Processing">
                                                    Processing
                                                </SelectItem>
                                                <SelectItem value="Done">
                                                    Done
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="p-4">
                                        {(() => {
                                            const {
                                                deadline,
                                                remaining,
                                                isOverdue,
                                            } = formatDeadlineInfo(
                                                task.dueDate
                                            );
                                            return (
                                                <div className="space-y-1">
                                                    <div className="text-sm font-medium text-foreground">
                                                        {deadline}
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            "text-xs flex items-center gap-1",
                                                            isOverdue
                                                                ? "text-destructive"
                                                                : "text-muted-foreground"
                                                        )}
                                                    >
                                                        <Clock className="w-3 h-3" />
                                                        {remaining}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(task)}
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleCheckToggle(task.id)
                                                }
                                                className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>

            {/* Confirmation Dialog */}
            <Dialog
                open={
                    dialog.open &&
                    (dialog.type === "delete" || dialog.type === "check")
                }
                onOpenChange={(open: boolean) =>
                    !open && setDialog({ open: false, type: "", id: null })
                }
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {dialog.type === "delete"
                                ? "Delete Task"
                                : "Mark as Complete"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to{" "}
                            {dialog.type === "delete"
                                ? "delete this task? This action cannot be undone."
                                : "mark this task as complete?"}
                        </p>
                    </div>
                    <DialogFooter className="gap-2">
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
                            {dialog.type === "delete"
                                ? "Delete"
                                : "Mark Complete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                open={dialog.open && dialog.type === "edit"}
                onOpenChange={(open: boolean) =>
                    !open && setDialog({ open: false, type: "", id: null })
                }
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Task Name</Label>
                            <Input
                                id="name"
                                value={editTask.name}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setEditTask({
                                        ...editTask,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Team Members</Label>
                            <div className="flex flex-wrap gap-2">
                                {mockUsers.map((user) => (
                                    <Badge
                                        key={user}
                                        variant="secondary"
                                        onClick={() => {
                                            const selected = editTask.members
                                                .split(",")
                                                .map((m) => m.trim())
                                                .filter((m) => m);
                                            const isSelected =
                                                selected.includes(user);
                                            const updated = isSelected
                                                ? selected.filter(
                                                      (m) => m !== user
                                                  )
                                                : [...selected, user];
                                            setEditTask({
                                                ...editTask,
                                                members: updated.join(", "),
                                            });
                                        }}
                                        className={cn(
                                            "cursor-pointer transition-colors hover:scale-105",
                                            editTask.members
                                                .split(",")
                                                .map((m) => m.trim())
                                                .includes(user)
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        )}
                                    >
                                        {user}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={editTask.status}
                                onValueChange={(
                                    value:
                                        | "Untagged"
                                        | "To Do"
                                        | "Processing"
                                        | "Done"
                                ) =>
                                    setEditTask({ ...editTask, status: value })
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Untagged">
                                        Untagged
                                    </SelectItem>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="Processing">
                                        Processing
                                    </SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="datetime-local"
                                value={editTask.dueDate.slice(0, 16)}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setEditTask({
                                        ...editTask,
                                        dueDate: e.target.value + ":00",
                                    })
                                }
                                className="[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:dark:filter [&::-webkit-calendar-picker-indicator]:dark:invert"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
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
        </Card>
    );
};

export default TaskList;
