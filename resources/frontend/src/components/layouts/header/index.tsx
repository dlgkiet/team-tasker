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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { Switch } from "../../ui/switch";
import { cn } from "../../../lib/utils";
import { useAuthStore } from "../../../stores/auth-store";

const navLinks = [
    { name: "Homepage", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Projects", path: "/projects" },
];

export default function Header() {
    const [theme, setTheme] = useState("light");
    const location = useLocation();
    const isAuthenticated = useAuthStore.use._ia();

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
        <header className="sticky top-0 w-full z-50 bg-background border-b border-border shadow-sm px-6 py-4 flex items-center justify-between transition-colors duration-300">
            {/* Left: Logo */}
            <div className="flex-shrink-0 z-10">
                <Link
                    to="/"
                    className="text-xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                    TeamTasker
                </Link>
            </div>

            {/* Center: Navigation (Desktop) */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all cursor-pointer"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Right: Theme Toggle + Avatar/Buttons (Desktop) */}
            <div className="flex-shrink-0 z-10 hidden md:flex items-center gap-4">
                {/* Theme Toggle Button */}
                <div className="flex items-center space-x-2">
                    <Sun
                        className={cn(
                            "h-4 w-4 transition-all duration-300",
                            theme === "dark"
                                ? "text-muted-foreground opacity-50 scale-90"
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
                                : "text-muted-foreground opacity-50 scale-90"
                        )}
                    />
                </div>

                {isAuthenticated ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-0 rounded-full cursor-pointer hover:bg-accent"
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
                            <Link to="/profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button
                                variant="outline"
                                className="cursor-pointer py-2 px-4"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="cursor-pointer py-2 px-4">
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile: Hamburger Menu */}
            <div className="md:hidden z-10">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[250px] sm:w-[300px]"
                    >
                        <div className="flex flex-col gap-6 mt-6">
                            {/* Mobile Menu Content */}
                            {isAuthenticated ? (
                                <>
                                    {/* Theme Toggle + Avatar (Horizontal) */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Sun
                                                className={cn(
                                                    "h-4 w-4 transition-all duration-300",
                                                    theme === "dark"
                                                        ? "text-muted-foreground opacity-50 scale-90"
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
                                                        : "text-muted-foreground opacity-50 scale-90"
                                                )}
                                            />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="p-0 rounded-full cursor-pointer hover:bg-accent"
                                                >
                                                    <Avatar>
                                                        <AvatarImage
                                                            src="https://github.com/shadcn.png"
                                                            alt="Avatar"
                                                        />
                                                        <AvatarFallback>
                                                            TT
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    My Account
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    Logout
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {/* NavLinks (Left-aligned) */}
                                    <nav className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all cursor-pointer text-left"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </>
                            ) : (
                                <>
                                    {/* Theme Toggle (Centered) */}
                                    <div className="flex justify-center items-center space-x-2">
                                        <Sun
                                            className={cn(
                                                "h-4 w-4 transition-all duration-300",
                                                theme === "dark"
                                                    ? "text-muted-foreground opacity-50 scale-90"
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
                                                    : "text-muted-foreground opacity-50 scale-90"
                                            )}
                                        />
                                    </div>
                                    {/* NavLinks (Left-aligned) */}
                                    <nav className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all cursor-pointer text-left"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>
                                    {/* Login/Register Buttons (Bottom, Centered) */}
                                    <div className="flex flex-col gap-4 mt-auto">
                                        <Link to="/login">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button className="w-full">
                                                Register
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
