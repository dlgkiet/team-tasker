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
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Moon, Sun } from "lucide-react";
import { Switch } from "../../ui/switch";
import { cn } from "../../../lib/utils";

const navLinks = [
    { name: "Homepage", path: "/" },
    { name: "Projects", path: "/projects" },
];

export default function Header() {
    const [theme, setTheme] = useState("light");
    const location = useLocation(); // Hook để lấy đường dẫn hiện tại

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
        <header className="sticky top-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-white via-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-[#12121b] dark:via-[#1a1a30] dark:to-[#090916] border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-sm px-6 py-4 flex items-center justify-between transition-colors duration-300">
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
            {/* Chỉ hiển thị nếu đường dẫn không phải là '/' */}
            {location.pathname !== "/" && (
                <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-sm font-medium text-slate-700 dark:text-white/80 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-white/5 px-3 py-2 rounded-md transition-all cursor-pointer"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            )}

            {/* Right: Theme Toggle + Avatar/Buttons */}
            <div className="flex-shrink-0 z-10 flex items-center gap-4">
                {/* Theme Toggle Button */}
                <div className="flex items-center space-x-2">
                    <Sun
                        className={cn(
                            "h-4 w-4 transition-all duration-300",
                            theme === "dark"
                                ? "text-gray-400 opacity-50 scale-90"
                                : "text-amber-500 opacity-100 scale-100"
                        )}
                    />

                    <Switch
                        checked={theme === "dark"}
                        onCheckedChange={toggleTheme}
                        className={cn(
                            "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-amber-300",
                            "transition-all duration-300"
                        )}
                    />

                    <Moon
                        className={cn(
                            "h-4 w-4 transition-all duration-300",
                            theme === "dark"
                                ? "text-blue-400 opacity-100 scale-100"
                                : "text-gray-400 opacity-50 scale-90"
                        )}
                    />
                </div>

                {/* Nếu không phải trang '/', hiển thị Avatar Dropdown */}
                {location.pathname !== "/" ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="default" // Sử dụng variant hợp lệ
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
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="outline" className="cursor-pointer py-2 px-4 rounded-md border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-white dark:text-white dark:hover:bg-white/10 transition-all duration-300">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="cursor-pointer py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-300">
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
