"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import { Barang } from "../../../lib/types"; // <-- Import tipe data dari Postman tadi

export default function UserDashboard() {
    const [daftarBarang, setDaftarBarang] = useState<Barang[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const ambilBarangToko = async () => {
            try {
                // Menembak endpoint GET barang toko online sesuai Postman
                const data = await apiFetch<Barang[]>("/user/barang"); // Sesuaikan route aslinya di Postman
                setDaftarBarang(data);
            } catch (err) {
                console.error("Gagal memuat barang:", err);
            } finally {
                setLoading(false);
            }
        };

        ambilBarangToko();
    }, []);

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <main className="p-8 bg-slate-950 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-blue-400">🛍️ Katalog Toko Online</h1>
                <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition text-sm">
                    Logout
                </button>
            </div>

            {loading ? (
                <p className="text-center text-zinc-500">Memuat produk toko...</p>
            ) : (
                // Grid System untuk menampilkan barang dagangan
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {daftarBarang.map((barang) => (
                        <div key={barang.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md">
                            <div>
                                {/* Gabungkan BASE URL Image dari .env dengan image_path dari Postman */}
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${barang.image_path}`}
                                    alt={barang.nama_barang}
                                    className="w-full h-40 object-cover rounded-xl mb-4 bg-zinc-800"
                                />
                                <h3 className="font-semibold text-lg">{barang.nama_barang}</h3>
                                <p className="text-sm text-zinc-400 font-mono mt-1">Rp {barang.harga.toLocaleString()}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center text-xs text-zinc-500">
                                <span>Stok: {barang.stok} pcs</span>
                                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                                    Beli
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}