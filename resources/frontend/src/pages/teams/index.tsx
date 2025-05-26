import React from "react";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Calendar,
    FolderOpen,
    MoreHorizontal,
    Plus,
    Users,
    Trash2,
    Edit,
    Eye,
    Activity,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    X,
} from "lucide-react";
import Layout from "../../components/layouts";

// Mock data cho teams (mở rộng để test pagination)
const generateMockTeams = () => {
    const baseTeams = [
        {
            id: 1,
            name: "Design Team",
            description:
                "Responsible for all design-related projects and user experience",
            created_at: "2024-01-15T10:00:00Z",
            memberCount: 8,
            projectCount: 5,
            activeTaskCount: 23,
            recentActivity: "2 hours ago",
            members: [
                {
                    id: 1,
                    name: "Sarah Johnson",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 2,
                    name: "Mike Chen",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 3,
                    name: "Emily Rodriguez",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 2,
            name: "Development Team",
            description:
                "Frontend and backend development for all company products",
            created_at: "2024-01-10T10:00:00Z",
            memberCount: 12,
            projectCount: 8,
            activeTaskCount: 45,
            recentActivity: "30 minutes ago",
            members: [
                {
                    id: 4,
                    name: "John Doe",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 5,
                    name: "Jane Smith",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 6,
                    name: "Alex Wilson",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 3,
            name: "Marketing Team",
            description:
                "Digital marketing, content creation, and brand management",
            created_at: "2024-02-01T10:00:00Z",
            memberCount: 6,
            projectCount: 3,
            activeTaskCount: 15,
            recentActivity: "1 day ago",
            members: [
                {
                    id: 7,
                    name: "Lisa Wang",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 8,
                    name: "Tom Brown",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 4,
            name: "Product Team",
            description:
                "Product strategy, roadmap planning, and feature prioritization",
            created_at: "2024-01-20T10:00:00Z",
            memberCount: 5,
            projectCount: 4,
            activeTaskCount: 18,
            recentActivity: "5 hours ago",
            members: [
                {
                    id: 9,
                    name: "David Kim",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 10,
                    name: "Maria Garcia",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 5,
            name: "QA Team",
            description: "Quality assurance and testing for all products",
            created_at: "2024-01-25T10:00:00Z",
            memberCount: 4,
            projectCount: 6,
            activeTaskCount: 12,
            recentActivity: "3 hours ago",
            members: [
                {
                    id: 11,
                    name: "Robert Lee",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 12,
                    name: "Anna Smith",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 6,
            name: "DevOps Team",
            description:
                "Infrastructure, deployment, and system administration",
            created_at: "2024-02-05T10:00:00Z",
            memberCount: 3,
            projectCount: 2,
            activeTaskCount: 8,
            recentActivity: "1 hour ago",
            members: [
                {
                    id: 13,
                    name: "Chris Wilson",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 14,
                    name: "Sophie Turner",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 7,
            name: "Sales Team",
            description: "Customer acquisition and business development",
            created_at: "2024-01-30T10:00:00Z",
            memberCount: 7,
            projectCount: 3,
            activeTaskCount: 20,
            recentActivity: "4 hours ago",
            members: [
                {
                    id: 15,
                    name: "Michael Brown",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 16,
                    name: "Jessica Davis",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 8,
            name: "Support Team",
            description: "Customer support and technical assistance",
            created_at: "2024-02-10T10:00:00Z",
            memberCount: 6,
            projectCount: 2,
            activeTaskCount: 14,
            recentActivity: "2 hours ago",
            members: [
                {
                    id: 17,
                    name: "Kevin Johnson",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 18,
                    name: "Rachel Green",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 9,
            name: "HR Team",
            description: "Human resources and talent management",
            created_at: "2024-01-18T10:00:00Z",
            memberCount: 4,
            projectCount: 1,
            activeTaskCount: 6,
            recentActivity: "6 hours ago",
            members: [
                {
                    id: 19,
                    name: "Amanda White",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 20,
                    name: "Daniel Miller",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
        {
            id: 10,
            name: "Finance Team",
            description: "Financial planning and budget management",
            created_at: "2024-02-15T10:00:00Z",
            memberCount: 3,
            projectCount: 2,
            activeTaskCount: 5,
            recentActivity: "1 day ago",
            members: [
                {
                    id: 21,
                    name: "Steven Clark",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 22,
                    name: "Michelle Lewis",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        },
    ];

    // Tạo thêm teams để test pagination
    const additionalTeams = [];
    for (let i = 11; i <= 25; i++) {
        additionalTeams.push({
            id: i,
            name: `Team ${i}`,
            description: `Description for team ${i} with various responsibilities`,
            created_at: new Date(
                2024,
                Math.floor(Math.random() * 2),
                Math.floor(Math.random() * 28) + 1
            ).toISOString(),
            memberCount: Math.floor(Math.random() * 15) + 3,
            projectCount: Math.floor(Math.random() * 10) + 1,
            activeTaskCount: Math.floor(Math.random() * 50) + 5,
            recentActivity: `${Math.floor(Math.random() * 24)} hours ago`,
            members: [
                {
                    id: i * 10,
                    name: `Member ${i}A`,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: i * 10 + 1,
                    name: `Member ${i}B`,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
        });
    }

    return [...baseTeams, ...additionalTeams];
};

interface Team {
    id: number;
    name: string;
    description: string;
    created_at: string;
    memberCount: number;
    projectCount: number;
    activeTaskCount: number;
    recentActivity: string;
    members: Array<{
        id: number;
        name: string;
        avatar: string;
    }>;
}

const Teams: React.FC = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Team[]>(generateMockTeams());
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<
        "name" | "created_at" | "memberCount" | "projectCount"
    >("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    // Filter and search logic
    const filteredAndSortedTeams = useMemo(() => {
        const filtered = teams.filter(
            (team) =>
                team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                team.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );

        // Sort teams
        filtered.sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (sortBy) {
                case "name":
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case "created_at":
                    aValue = new Date(a.created_at).getTime();
                    bValue = new Date(b.created_at).getTime();
                    break;
                case "memberCount":
                    aValue = a.memberCount;
                    bValue = b.memberCount;
                    break;
                case "projectCount":
                    aValue = a.projectCount;
                    bValue = b.projectCount;
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
    }, [teams, searchQuery, sortBy, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredAndSortedTeams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTeams = filteredAndSortedTeams.slice(startIndex, endIndex);

    // Reset to first page when search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy, sortOrder]);

    const handleCreateTeam = () => {
        if (formData.name.trim()) {
            const newTeam: Team = {
                id: Math.max(...teams.map((t) => t.id)) + 1,
                name: formData.name,
                description: formData.description,
                created_at: new Date().toISOString(),
                memberCount: 1,
                projectCount: 0,
                activeTaskCount: 0,
                recentActivity: "Just created",
                members: [],
            };
            setTeams([...teams, newTeam]);
            setFormData({ name: "", description: "" });
            setIsCreateDialogOpen(false);
        }
    };

    const handleEditTeam = () => {
        if (selectedTeam && formData.name.trim()) {
            setTeams(
                teams.map((team) =>
                    team.id === selectedTeam.id
                        ? {
                              ...team,
                              name: formData.name,
                              description: formData.description,
                          }
                        : team
                )
            );
            setFormData({ name: "", description: "" });
            setIsEditDialogOpen(false);
            setSelectedTeam(null);
        }
    };

    const handleDeleteTeam = () => {
        if (selectedTeam) {
            setTeams(teams.filter((team) => team.id !== selectedTeam.id));
            setIsDeleteDialogOpen(false);
            setSelectedTeam(null);
        }
    };

    const openEditDialog = (team: Team) => {
        setSelectedTeam(team);
        setFormData({ name: team.name, description: team.description });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (team: Team) => {
        setSelectedTeam(team);
        setIsDeleteDialogOpen(true);
    };

    const handleViewTeam = (teamId: number) => {
        navigate(`/teams/${teamId}`);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const totalStats = {
        totalTeams: teams.length,
        totalMembers: teams.reduce((sum, team) => sum + team.memberCount, 0),
        totalProjects: teams.reduce((sum, team) => sum + team.projectCount, 0),
        totalTasks: teams.reduce((sum, team) => sum + team.activeTaskCount, 0),
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Teams</h1>
                        <p className="text-muted-foreground">
                            Manage your teams and collaborate effectively
                        </p>
                    </div>
                    <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Team</DialogTitle>
                                <DialogDescription>
                                    Create a new team to organize your projects
                                    and collaborate with team members.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="team-name">Team Name</Label>
                                    <Input
                                        id="team-name"
                                        placeholder="Enter team name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="team-description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="team-description"
                                        placeholder="Enter team description (optional)"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateTeam}
                                    disabled={!formData.name.trim()}
                                >
                                    Create Team
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Teams
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalStats.totalTeams}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active teams
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Members
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalStats.totalMembers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all teams
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Projects
                            </CardTitle>
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalStats.totalProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active projects
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tasks
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalStats.totalTasks}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active tasks
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter Controls */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search teams by name or description..."
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
                                            onClick={clearSearch}
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Sort Controls */}
                            <div className="flex gap-2">
                                <Select
                                    value={sortBy}
                                    onValueChange={(value: any) =>
                                        setSortBy(value)
                                    }
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">
                                            Name
                                        </SelectItem>
                                        <SelectItem value="created_at">
                                            Created Date
                                        </SelectItem>
                                        <SelectItem value="memberCount">
                                            Members
                                        </SelectItem>
                                        <SelectItem value="projectCount">
                                            Projects
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={sortOrder}
                                    onValueChange={(value: any) =>
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

                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) =>
                                        setItemsPerPage(Number(value))
                                    }
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">
                                            6 per page
                                        </SelectItem>
                                        <SelectItem value="9">
                                            9 per page
                                        </SelectItem>
                                        <SelectItem value="12">
                                            12 per page
                                        </SelectItem>
                                        <SelectItem value="18">
                                            18 per page
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Search Results Info */}
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div>
                                {searchQuery ? (
                                    <span>
                                        Found {filteredAndSortedTeams.length}{" "}
                                        team
                                        {filteredAndSortedTeams.length !== 1
                                            ? "s"
                                            : ""}{" "}
                                        matching "{searchQuery}"
                                    </span>
                                ) : (
                                    <span>
                                        Showing {filteredAndSortedTeams.length}{" "}
                                        teams
                                    </span>
                                )}
                            </div>
                            <div>
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Teams Grid */}
                {currentTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentTeams.map((team) => (
                            <Card
                                key={team.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">
                                                {team.name}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {team.description}
                                            </CardDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleViewTeam(team.id)
                                                    }
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Team
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openEditDialog(team)
                                                    }
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit Team
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openDeleteDialog(team)
                                                    }
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Team
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Team Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">
                                                {team.memberCount}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Members
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">
                                                {team.projectCount}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Projects
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-orange-600">
                                                {team.activeTaskCount}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Tasks
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Members Preview */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                                Team Members
                                            </span>
                                            {team.memberCount > 3 && (
                                                <Badge variant="secondary">
                                                    +{team.memberCount - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex -space-x-2">
                                            {team.members
                                                .slice(0, 3)
                                                .map((member) => (
                                                    <Avatar
                                                        key={member.id}
                                                        className="h-8 w-8 border-2 border-background"
                                                    >
                                                        <AvatarImage
                                                            src={
                                                                member.avatar ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={member.name}
                                                        />
                                                        <AvatarFallback className="text-xs">
                                                            {member.name
                                                                .split(" ")
                                                                .map(
                                                                    (n) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            {team.memberCount === 0 && (
                                                <div className="text-sm text-muted-foreground">
                                                    No members yet
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Team Info */}
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                Created{" "}
                                                {new Date(
                                                    team.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Activity className="h-4 w-4" />
                                            <span>{team.recentActivity}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        onClick={() => handleViewTeam(team.id)}
                                        className="w-full"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Team
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <Card className="text-center py-12">
                        <CardContent>
                            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {searchQuery
                                    ? "No teams found"
                                    : "No teams yet"}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery
                                    ? `No teams match your search "${searchQuery}". Try adjusting your search terms.`
                                    : "Create your first team to start collaborating with your colleagues."}
                            </p>
                            {searchQuery ? (
                                <Button onClick={clearSearch} variant="outline">
                                    Clear Search
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsCreateDialogOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Team
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing {startIndex + 1} to{" "}
                                    {Math.min(
                                        endIndex,
                                        filteredAndSortedTeams.length
                                    )}{" "}
                                    of {filteredAndSortedTeams.length} teams
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

                                    {/* Page Numbers */}
                                    <div className="flex items-center space-x-1">
                                        {Array.from(
                                            { length: Math.min(5, totalPages) },
                                            (_, i) => {
                                                let pageNumber;
                                                if (totalPages <= 5) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNumber = i + 1;
                                                } else if (
                                                    currentPage >=
                                                    totalPages - 2
                                                ) {
                                                    pageNumber =
                                                        totalPages - 4 + i;
                                                } else {
                                                    pageNumber =
                                                        currentPage - 2 + i;
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
                                                            goToPage(pageNumber)
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
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => goToPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronsRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Edit Team Dialog */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Team</DialogTitle>
                            <DialogDescription>
                                Update your team information and settings.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-team-name">
                                    Team Name
                                </Label>
                                <Input
                                    id="edit-team-name"
                                    placeholder="Enter team name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-team-description">
                                    Description
                                </Label>
                                <Textarea
                                    id="edit-team-description"
                                    placeholder="Enter team description (optional)"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleEditTeam}
                                disabled={!formData.name.trim()}
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the team "
                                {selectedTeam?.name}" and remove all associated
                                projects and tasks.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteTeam}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Delete Team
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Layout>
    );
};

export default Teams;
