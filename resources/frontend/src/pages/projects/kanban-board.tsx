import React, { useState, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
    DndContext,
    closestCorners,
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
import { ScrollArea } from "../../components/ui/scroll-area";
import { createPortal } from "react-dom";

interface Task {
    id: number;
    name: string;
    members: string[];
    status: "Untagged" | "To Do" | "Doing" | "Done";
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

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`rounded-xl shadow-md bg-background hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing ${
                isOverlay ? "ring-2 ring-white" : ""
            }`}
        >
            <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">
                    {task.name}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-2">
                    {task.members.map((m, idx) => (
                        <span
                            key={idx}
                            className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-indigo-900 dark:text-indigo-200"
                        >
                            {m}
                        </span>
                    ))}
                </div>
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === "To Do"
                            ? "bg-red-200 text-red-800 dark:bg-red-300/20 dark:text-red-300"
                            : task.status === "Doing"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-200/20 dark:text-amber-300"
                            : task.status === "Done"?
                            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
                            : "bg-muted text-muted-foreground"
                    }`}
                >
                    {task.status}
                </span>
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
    status: "Untagged" | "To Do" | "Doing" | "Done";
    tasks: Task[];
    isOverlay?: boolean;
}) => {
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    return (
        <div
            className={`bg-white dark:bg-[#2F2F2F] rounded-xl p-4 shadow-sm w-full max-w-full flex-shrink-0 ${
                isOverlay ? "ring-2 ring-white" : ""
            }`}
        >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-between">
                {status}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tasks.length}
                </span>
            </h2>
            <ScrollArea className="h-[500px]">
                <DroppableColumnZone id={status.replace(/\s/g, "")}>
                    <SortableContext
                        items={tasksIds}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4 p-2 min-h-[60px]">
                            {tasks.map((task) => (
                                <SortableTask key={task.id} task={task} />
                            ))}
                        </div>
                    </SortableContext>
                </DroppableColumnZone>
            </ScrollArea>
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
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef} className="min-h-[20px]">
            {children}
        </div>
    );
};

const KanbanBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const columns: ("Untagged" | "To Do" | "Doing" | "Done")[] = ["Untagged", "To Do", "Doing", "Done"];
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

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen">
                <SortableContext items={columnsId}>
                    {columns.map((col) => (
                        <BoardColumn
                            key={col}
                            status={col}
                            tasks={tasks.filter((task) => task.status === col)}
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
    );
};

export default KanbanBoard;
