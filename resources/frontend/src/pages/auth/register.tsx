// app/register/page.tsx hoặc src/pages/register.tsx tùy cấu trúc
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-[#0d0b1f] dark:via-[#1b1032] dark:to-[#080613] transition-colors">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Create Your Account
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                        />
                    </div>
                    <Button className="w-full">Sign Up</Button>
                    <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
