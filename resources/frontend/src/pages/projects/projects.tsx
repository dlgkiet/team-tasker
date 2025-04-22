import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Giả lập dữ liệu nhiều hơn để demo phân trang
const mockProjects = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    description: `Description for project ${i + 1}`,
}));

const ITEMS_PER_PAGE = 9;

const Projects = () => {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState(mockProjects);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
    });

    // Xử lý tạo project
    const handleCreateProject = async () => {
        // Gọi API tạo project
        console.log("Creating new project:", newProject);
        // Mô phỏng API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Project created successfully!");
        // Reset form và đóng dialog
        setNewProject({ name: "", description: "" });
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const filteredProjects = mockProjects.filter((project) =>
            project.name.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(filteredProjects);
        setCurrentPage(1);
    }, [search]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedProjects = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <Layout>
            <div className="px-6 py-8 max-w-7xl mx-auto bg-white dark:bg-[#020817] min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {paginatedProjects.map((project) => (
                        <div key={project.id} className="relative group">
                            {/* Dash border placeholder - chỉ hiển thị khi hover */}
                            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Card với hiệu ứng di chuyển */}
                            <Card
                                onClick={() =>
                                    navigate(`/project-detail`)
                                }
                                className="cursor-pointer transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 relative z-10 bg-white dark:bg-[#0F172A] dark:border-white"
                            >
                                <CardContent className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold text-primary">
                                        {project.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <span className="text-sm px-4">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* New Project Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                            Enter details for your new project
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Project name"
                                className="col-span-3"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Project description"
                                className="col-span-3"
                                rows={3}
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleCreateProject}>Create Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default Projects;