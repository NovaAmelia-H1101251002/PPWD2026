// ===== 1. Mode gelap / terang (sama dengan portal, tersimpan di localStorage) =====
const tombolTema = document.getElementById("tombol-tema");

function terapkanTema(gelap) {
    document.body.classList.toggle("gelap", gelap);
    tombolTema.textContent = gelap ? "Mode terang" : "Mode gelap";
}

try { terapkanTema(localStorage.getItem("tema") === "gelap"); } catch (e) {}

tombolTema.addEventListener("click", function () {
    const gelap = !document.body.classList.contains("gelap");
    terapkanTema(gelap);
    try { localStorage.setItem("tema", gelap ? "gelap" : "terang"); } catch (e) {}
});

// ===== 2. Buku tamu =====
const daftar = document.getElementById("daftar");
const kosong = document.getElementById("kosong");
const kotakNama = document.getElementById("nama");
const kotakInstansi = document.getElementById("instansi");
const errorNama = document.getElementById("error-nama");

document.getElementById("simpan").addEventListener("click", function () {
    const nama = kotakNama.value.trim();
    const instansi = kotakInstansi.value.trim();

    // Validasi: nama wajib diisi
    if (nama === "") {
        kotakNama.classList.add("salah");
        errorNama.style.display = "block";
        kotakNama.focus();
        return;
    }
    kotakNama.classList.remove("salah");
    errorNama.style.display = "none";

    // Buat item daftar baru lalu tambahkan ke halaman
    const item = document.createElement("li");
    const tebal = document.createElement("strong");
    tebal.textContent = nama;
    item.appendChild(tebal);
    item.appendChild(document.createTextNode(instansi ? " - " + instansi : ""));
    daftar.appendChild(item);
    kosong.style.display = "none";

    // Kosongkan isian
    kotakNama.value = "";
    kotakInstansi.value = "";
});

// Hilangkan tanda error saat pengguna mulai mengetik lagi
kotakNama.addEventListener("input", function () {
    kotakNama.classList.remove("salah");
    errorNama.style.display = "none";
});