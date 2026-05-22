"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";       // <--- Folder lib sejajar app
import Input from "../../components/input";     // <--- Folder components sejajar app (huruf kecil)
import Button from "../../components/button";   // <--- Folder components sejajar app (huruf kecil)

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const router = useRouter();

    // Ditambahkan tipe data : React.FormEvent biar TypeScript tidak error
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiFetch("/register", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Register Berhasil!");
                router.push("/login");
            } else {
                alert(data.message || "Register Gagal");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
            <form onSubmit={handleRegister} className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 w-full max-w-sm space-y-4 shadow-2xl">
                <h2 className="text-2xl font-bold text-center">Buat Akun Toko</h2>

                {/* Ditambahkan : any di event-nya agar tidak bentrok type antara JS component dan TSX page */}
                <Input
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Yahya Fahmi"
                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="yahya@smktelkom.com"
                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                />

                <div className="w-full space-y-1 text-left">
                    <label className="text-sm font-medium text-white/60">Pilih Role</label>
                    <select
                        className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                        onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="user">User / Pelanggan</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <Button variant="primary">Daftar Akun</Button>
            </form>
        </main>
    );
}