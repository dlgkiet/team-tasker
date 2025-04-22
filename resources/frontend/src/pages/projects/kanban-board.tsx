import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

interface Task {
    id: number;
    name: string;
    members: string[];
    status: "To Do" | "Doing" | "Done";
    dueDate: string;
}

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

const KanbanBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const columns: ("To Do" | "Doing" | "Done")[] = ["To Do", "Doing", "Done"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {columns.map((col) => (
                <div key={col}>
                    <h2 className="text-xl font-bold mb-4">{col}</h2>
                    <div className="space-y-4">
                        {tasks
                            .filter((task) => task.status === col)
                            .map((task) => (
                                <Card
                                    key={task.id}
                                    className="rounded-2xl shadow-sm"
                                >
                                    <CardContent className="p-4 space-y-2">
                                        <h3 className="text-lg font-semibold">
                                            {task.name}
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            Due:{" "}
                                            {new Date(
                                                task.dueDate
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {task.members.map((m, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
