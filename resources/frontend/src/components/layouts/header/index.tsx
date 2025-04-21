import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Projects", path: "/projects" },
];

export default function Header() {
    const [theme, setTheme] = useState("light");

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle(
            "dark",
            savedTheme === "dark"
        );
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <header className="w-full shadow-md bg-white dark:bg-[#0F172A] border-b border-border px-6 py-4 relative flex items-center justify-between z-50">
            {/* Left: Logo */}
            <div className="flex-shrink-0 z-10">
                <Link
                    to="/"
                    className="text-xl font-bold text-primary hover:text-primary/80 dark:hover:text-primary/90 transition-colors cursor-pointer"
                >
                    TeamTasker
                </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="text-sm font-medium text-foreground/80 dark:text-foreground/80 hover:text-primary dark:hover:text-primary hover:bg-accent/50 dark:hover:bg-accent/50 px-3 py-2 rounded-md transition-all cursor-pointer"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Right: Theme Toggle + Avatar */}
            <div className="flex-shrink-0 z-10 flex items-center gap-4">
                {/* Theme Toggle Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full h-9 w-9 border border-input hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                    aria-label="Toggle Theme"
                >
                    {theme === "light" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </Button>

                {/* Avatar Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="p-0 rounded-full cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/50"
                        >
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="Avatar"
                                />
                                <AvatarFallback>TT</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer hover:bg-accent dark:hover:bg-accent">
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-accent dark:hover:bg-accent">
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-accent dark:hover:bg-accent">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
