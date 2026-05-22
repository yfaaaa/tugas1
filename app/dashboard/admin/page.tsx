"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import { Barang } from "../../../lib/types"; // Menggunakan tipe data yang dicopy dari Postman

export default function AdminDashboard() {
    const [daftarBarang, setDaftarBarang] = useState<Barang[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // State untuk form tambah barang (Sesuai dengan POST Insert Barang di Postman)
    const [formTambah, setFormTambah] = useState({
        nama_barang: "",
        harga: 0,
        stok: 0,
        image_path: "/uploads/default.jpg", // path default bawaan api toko online
    });

    // 1. Fungsi Mengambil Data Barang (Sesuai GET Get Barang di Postman Admin)
    const ambilBarangAdmin = async () => {
        try {
            const data = await apiFetch<Barang[]>("/admin/barang"); // Sesuaikan route asli dari Postman lu
            setDaftarBarang(data);
        } catch (err) {
            console.error("Gagal mengambil data barang:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        ambilBarangAdmin();
    }, []);

    // 2. Fungsi Menambah Barang Baru (Sesuai POST Insert Barang di Postman Admin)
    const handleTambahBarang = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiFetch("/admin/barang", {
                method: "POST",
                body: JSON.stringify(formTambah),
            });
            alert("Barang Baru Berhasil Ditambahkan! 🔥");
            // Reset form dan reload data biar barang barunya langsung muncul
            setFormTambah({ nama_barang: "", harga: 0, stok: 0, image_path: "/uploads/default.jpg" });
            ambilBarangAdmin();
        } catch (err) {
            alert("Gagal menambahkan barang");
        }
    };

    const logout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <main className="p-6 md:p-10 bg-slate-950 min-h-screen text-white grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* KIRI: Form Kelola/Tambah Barang Baru */}
            <div className="lg:col-span-1 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md h-fit">
                <h2 className="text-xl font-bold text-red-400 mb-4">🛡️ Tambah Produk Baru</h2>
                <form onSubmit={handleTambahBarang} className="space-y-4">
                    <div>
                        <label className="text-xs text-zinc-400 font-mono">NAMA PRODUK</label>
                        <input
                            type="text"
                            value={formTambah.nama_barang}
                            placeholder="Contoh: Sepatu Specs"
                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl mt-1 text-sm focus:outline-none focus:border-red-500"
                            onChange={(e) => setFormTambah({ ...formTambah, nama_barang: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 font-mono">HARGA (RP)</label>
                        <input
                            type="number"
                            value={formTambah.harga || ""}
                            placeholder="Contoh: 150000"
                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl mt-1 text-sm focus:outline-none focus:border-red-500"
                            onChange={(e) => setFormTambah({ ...formTambah, harga: Number(e.target.value) })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 font-mono">JUMLAH STOK</label>
                        <input
                            type="number"
                            value={formTambah.stok || ""}
                            placeholder="Contoh: 24"
                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl mt-1 text-sm focus:outline-none focus:border-red-500"
                            onChange={(e) => setFormTambah({ ...formTambah, stok: Number(e.target.value) })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 font-semibold text-sm rounded-xl transition shadow-lg shadow-red-900/20">
                        Simpan ke Toko
                    </button>
                </form>
            </div>

            {/* KANAN: Tabel / List Monitoring Seluruh Barang */}
            <div className="lg:col-span-2 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-100">Daftar Inventaris Produk</h1>
                    <button onClick={logout} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-mono transition">
                        LOGOUT ADMIN
                    </button>
                </div>

                {loading ? (
                    <p className="text-zinc-500 text-center py-10">Membaca database produk...</p>
                ) : (
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-400">
                                    <th className="p-4">Foto</th>
                                    <th className="p-4">Nama Produk</th>
                                    <th className="p-4">Harga</th>
                                    <th className="p-4 text-center">Stok</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {daftarBarang.map((barang) => (
                                    <tr key={barang.id} className="hover:bg-white/[0.01] transition-colors">
                                        <td className="p-4">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${barang.image_path}`}
                                                alt={barang.nama_barang}
                                                className="w-12 h-12 object-cover rounded-lg bg-zinc-800 border border-white/10"
                                            />
                                        </td>
                                        <td className="p-4 font-medium text-zinc-200">{barang.nama_barang}</td>
                                        <td className="p-4 font-mono text-zinc-400">Rp {barang.harga.toLocaleString()}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-mono ${barang.stok > 5 ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                                {barang.stok} pcs
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </main>
    );
}