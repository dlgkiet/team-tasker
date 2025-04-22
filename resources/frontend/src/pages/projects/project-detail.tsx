import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import TaskList from "./task-list";
import KanbanBoard from "./kanban-board";
import Layout from "../../components/layouts";
import { toast } from "sonner";

// Mock users for the member selection
const mockUsers = ["John", "Sarah", "Mike", "Emma", "Alex"];

const ProjectDetail = () => {
    // State for managing the dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    
    // State for the new task form
    const [newTask, setNewTask] = useState({
        name: "",
        members: "",
        status: "To Do",
        dueDate: ""
    });

    // Function to handle adding a new task
    const handleAddTask = () => {
        // Here you would typically save the task to your data store
        console.log("Adding new task:", newTask);
        toast.success("Task created successfully!");
        // Reset form and close dialog
        setNewTask({
            name: "",
            members: "",
            status: "To Do",
            dueDate: ""
        });
        setDialogOpen(false);
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Project Details</h1>
                    <Button onClick={() => setDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> New Task
                    </Button>
                </div>
                
                <Tabs defaultValue="task-list" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="task-list">Task List</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                    </TabsList>

                    <TabsContent value="task-list">
                        <TaskList />
                    </TabsContent>

                    <TabsContent value="kanban">
                        <KanbanBoard />
                    </TabsContent>
                </Tabs>
            </div>

            {/* New Task Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Task Name</Label>
                            <Input
                                id="name"
                                value={newTask.name}
                                onChange={(e) => setNewTask({
                                    ...newTask,
                                    name: e.target.value
                                })}
                                placeholder="Enter task name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="members">Members</Label>
                            <div className="flex flex-wrap gap-2">
                                {mockUsers.map((user) => (
                                    <Badge
                                        key={user}
                                        onClick={() => {
                                            const selected = newTask.members
                                                .split(",")
                                                .map((m) => m.trim())
                                                .filter(Boolean);
                                            const isSelected = selected.includes(user);
                                            const updated = isSelected
                                                ? selected.filter((m) => m !== user)
                                                : [...selected, user];
                                            setNewTask({
                                                ...newTask,
                                                members: updated.join(", ")
                                            });
                                        }}
                                        className={`cursor-pointer ${
                                            newTask.members
                                                .split(",")
                                                .map((m) => m.trim())
                                                .includes(user)
                                                ? "bg-blue-500 text-white"
                                                : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                    >
                                        {user}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={newTask.status}
                                onValueChange={(value) => setNewTask({ 
                                    ...newTask, 
                                    status: value 
                                })}
                            >
                                <SelectTrigger id="status">
                                    {newTask.status}
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
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({
                                    ...newTask,
                                    dueDate: e.target.value
                                })}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddTask}>
                            Add Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default ProjectDetail;