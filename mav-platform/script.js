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

// ===== 2. Menu per peran =====
// Daftar menu untuk setiap peran
const menuPerPeran = {
    admin: ["Dashboard", "Kelola pengguna", "Kelola layanan"],
    staf: ["Dashboard", "Layanan saya"],
    tamu: ["Daftar layanan"]
};

const pilihPeran = document.getElementById("peran");
const daftarMenu = document.getElementById("menu");

function tampilkanMenu() {
    const menu = menuPerPeran[pilihPeran.value];
    daftarMenu.innerHTML = "";
    menu.forEach(function (nama) {
        const item = document.createElement("li");
        item.textContent = nama;
        daftarMenu.appendChild(item);
    });
}

pilihPeran.addEventListener("change", tampilkanMenu);
tampilkanMenu(); // tampilkan menu saat halaman pertama dibuka