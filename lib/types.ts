// Tipe data ketika User/Admin berhasil Login (berdasarkan endpoint POST Login di Postman)
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: "admin" | "user"; // Hanya boleh diisi admin atau user sesuai Postman
    };
}

// Tipe data untuk objek Barang (berdasarkan endpoint Get Barang / Insert Barang Admin di Postman)
export interface Barang {
    id: number;
    nama_barang: string;
    harga: number;
    stok: number;
    image_path: string; // Ini nanti yang digabung sama Base URL Image (.env)
}