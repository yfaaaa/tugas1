"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";
import Input from "../../components/input";
import Button from "../../components/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // Menambahkan tipe data : React.FormEvent agar TypeScript tidak error
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiFetch("/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                alert("Login Sukses!");
                router.push("/dashboard");
            } else {
                alert(data.message || "Email atau Password salah");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
            <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 w-full max-w-sm space-y-5 shadow-2xl">
                <h2 className="text-2xl font-bold text-center tracking-wide">Welcome Back</h2>

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="nama@smktelkom.com"
                    onChange={(e: any) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    onChange={(e: any) => setPassword(e.target.value)}
                />

                <Button variant="success">Sign In</Button>
            </form>
        </main>
    );
}