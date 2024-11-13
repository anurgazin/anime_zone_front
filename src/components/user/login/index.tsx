"use client";

import { useState, FormEvent } from "react";
import { loginUser } from "@/lib/api";
import { LoginUser, TokenInfo } from "@/lib/types";
import { setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import Link from 'next/link'
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast()

    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const payload: LoginUser = { email, password }
        try {
            const response = await loginUser(payload);

            if (response.data.token) {
                const decoded = jwtDecode<TokenInfo>(response.data.token);
                if (decoded.id != "") {
                    setCookie("token", response.data.token)
                    setCookie("id", decoded.id)
                }
                toast({
                    title: "Success",
                    description: "Welcome back!",
                });
                router.push('/anime');
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: 'Login failed: No token received',
                    variant: "destructive",
                })
                setLoading(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data || 'An error occurred during login',
                variant: "destructive",
            })
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-gray-700 font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter your email"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-gray-700 font-medium">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter your password"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-medium p-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
                Login
            </Button>
            <p className="text-center text-gray-600 text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                    Register now!
                </Link>
            </p>
        </form>
    );
}
