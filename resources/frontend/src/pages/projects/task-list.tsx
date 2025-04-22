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
import { Trash2, Check, Pencil } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { toast } from "sonner";

// Define interfaces for our types
interface Task {
    id: number;
    name: string;
    members: string[];
    status: "To Do" | "Doing" | "Done";
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
    status: "To Do" | "Doing" | "Done";
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
            status: "Doing",
            dueDate: "2025-09-13T16:00:00",
        },
        {
            id: 3,
            name: "API Integration",
            members: ["T"],
            status: "Done",
            dueDate: "2025-04-22T22:00:00",
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
        status: "To Do",
        dueDate: "",
    });

    // Calculate remaining time for due dates
    const formatDeadlineInfo = (
        dueDate: string
    ): { deadline: string; remaining: string } => {
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
        if (diffMs < 0) {
            remaining = "Overdue";
        } else if (diffDays > 0) {
            remaining = `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
        } else {
            remaining = `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
        }

        return { deadline, remaining };
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
        }
        setDialog({ open: false, type: "", id: null });
    };

    const getStatusColor = (status: "To Do" | "Doing" | "Done"): string => {
        switch (status) {
            case "To Do":
                return "text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-100";
            case "Doing":
                return "text-yellow-800 bg-yellow-200 dark:bg-yellow-400 dark:text-white hover:dark:bg-yellow-400";
            case "Done":
                return "text-green-800 bg-green-200 dark:bg-green-400 dark:text-white hover:dark:bg-green-400";
            default:
                return "bg-slate-300 text-slate-800";
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-md shadow overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
                    <tr>
                        <th className="text-left p-3 w-10">
                            <Checkbox
                                checked={
                                    selectedIds.length === tasks.length &&
                                    tasks.length > 0
                                }
                                onCheckedChange={toggleSelectAll}
                            />
                        </th>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Members</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Due Date</th>
                        <th className="text-left p-3">Tools</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tasks.map((task) => (
                        <tr
                            key={task.id}
                            className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            <td className="p-3">
                                <Checkbox
                                    checked={selectedIds.includes(task.id)}
                                    onCheckedChange={(
                                        checked: boolean | "indeterminate"
                                    ) =>
                                        setSelectedIds((prev) =>
                                            checked === true
                                                ? [...prev, task.id]
                                                : prev.filter(
                                                      (id) => id !== task.id
                                                  )
                                        )
                                    }
                                />
                            </td>
                            <td className="p-3 font-medium">{task.name}</td>
                            <td className="p-3 flex -space-x-2">
                                {task.members.map((m, i) => (
                                    <Avatar
                                        key={i}
                                        className="w-6 h-6 border-2 border-white dark:border-slate-900"
                                    >
                                        <AvatarFallback>{m}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </td>
                            <td className="p-3">
                                <Select
                                    value={task.status}
                                    onValueChange={(
                                        val: "To Do" | "Doing" | "Done"
                                    ) =>
                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === task.id
                                                    ? { ...t, status: val }
                                                    : t
                                            )
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        className={clsx(
                                            "w-32",
                                            getStatusColor(task.status)
                                        )}
                                    >
                                        {task.status}
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To Do">
                                            To Do
                                        </SelectItem>
                                        <SelectItem value="Doing">
                                            Doing
                                        </SelectItem>
                                        <SelectItem value="Done">
                                            Done
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </td>
                            <td className="p-3">
                                {(() => {
                                    const { deadline, remaining } =
                                        formatDeadlineInfo(task.dueDate);
                                    return (
                                        <div>
                                            <div>{deadline}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {remaining}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </td>

                            <td className="p-3">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(task)}
                                        className="w-8 h-8"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            handleCheckToggle(task.id)
                                        }
                                        className="w-8 h-8"
                                    >
                                        <Check className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(task.id)}
                                        className="w-8 h-8"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialog.type === "delete"
                                ? "Delete Task"
                                : "Mark as Done"}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Are you sure you want to{" "}
                        {dialog.type === "delete"
                            ? "delete this task"
                            : "mark it as done"}
                        ?
                    </p>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDialog({ open: false, type: "", id: null })
                            }
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmAction}>Confirm</Button>
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
                    <div className="space-y-4 py-2">
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
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="members">Members</Label>
                            <div className="flex flex-wrap gap-2">
                                {mockUsers.map((user) => (
                                    <Badge
                                        key={user}
                                        onClick={() => {
                                            const selected = editTask.members
                                                .split(",")
                                                .map((m) => m.trim());
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
                                        className={clsx(
                                            "cursor-pointer",
                                            editTask.members
                                                .split(",")
                                                .map((m) => m.trim())
                                                .includes(user)
                                                ? "bg-blue-500 text-white"
                                                : "bg-slate-200 dark:bg-slate-700"
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
                                    value: "To Do" | "Doing" | "Done"
                                ) =>
                                    setEditTask({ ...editTask, status: value })
                                }
                            >
                                <SelectTrigger id="status">
                                    {editTask.status}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="Doing">Doing</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                value={editTask.dueDate}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setEditTask({
                                        ...editTask,
                                        dueDate: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
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
