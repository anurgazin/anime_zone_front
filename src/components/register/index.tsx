"use client";

import { useState, FormEvent } from "react";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

export default function RegistrationForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [logo, setLogo] = useState<File | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files && e.target.files[0];
        if (selectedImage) {
            setLogo(selectedImage);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const form_payload = new FormData();
        form_payload.append("email", email);
        form_payload.append("username", username);
        form_payload.append("bio", bio);
        form_payload.append("password", password);
        if (logo) {
            form_payload.append("logo", logo);
        }
        try {
            const response = await registerUser(form_payload);

            if (response.status == 201) {
                router.push("/login");
            } else {
                setError("Registration failed");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data || 'An error occurred during registration');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Create Account</h2>

            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-gray-700 font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Enter your email"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="username" className="text-gray-700 font-medium">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Enter your username"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="bio" className="text-gray-700 font-medium">Bio:</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                    placeholder="Tell us a bit about yourself (optional)"
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
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Enter your password"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="logo" className="text-gray-700 font-medium">Logo (Optional):</label>
                <input
                    type="file"
                    id="logo"
                    onChange={handleImageChange}
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-medium p-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
                {loading ? "Registering..." : "Register"}
            </Button>

            <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                    Sign in
                </Link>
            </p>
        </form>
    );
}
