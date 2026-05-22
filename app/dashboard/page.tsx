"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardCheck() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // 1. Kalau belum login (ga ada token), tendang balik ke halaman login
        if (!token) {
            router.push("/login");
            return;
        }

        // 2. Kalau ada token, arahkan ke dashboard yang sesuai
        if (role === "admin") {
            router.push("/dashboard/admin");
        } else {
            router.push("/dashboard/user");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-mono text-sm gap-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-400">Memeriksa hak akses...</p>
        </div>
    );
}