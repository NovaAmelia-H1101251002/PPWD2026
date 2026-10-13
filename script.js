/* ============================================================
   GLOW BEAUTY - JQUERY SCRIPT
   Praktikum Pemrograman Web Dasar
   + Latihan 1: Diskon 10% jika total > Rp 100.000
   + Latihan 2: Simpan riwayat ke localStorage
   + Latihan 3: Form data pembeli dengan validasi
   ============================================================ */
$(document).ready(function () {

    /* 1. DATA PRODUK */
    const produkData = [
        // foto: letakkan file di folder images/ (rasio 1:1, 600 x 600 px, JPG/WebP, maks ±150 KB)
        // --- LIP PRODUCT (4) ---
        { id: 1, nama: 'Matte Lip Cream', harga: 65000, kategori: 'lip-product', foto: 'image/lm.jpg', desc: 'Warna pekat, hasil matte nyaman', badge: 'Best Seller', badgeType: 'hot' },
        { id: 2, nama: 'Glossy Lip Tint', harga: 49000, kategori: 'lip-product', foto: 'image/lt.jpg', desc: 'Warna segar, tahan seharian', badge: 'Favorit', badgeType: '' },
        { id: 3, nama: 'Tinted Lip Balm', harga: 39000, kategori: 'lip-product', foto: 'image/lb.jpg', desc: 'Melembapkan dengan sentuhan warna', badge: '', badgeType: '' },
        { id: 4, nama: 'Lip Liner Pencil', harga: 35000, kategori: 'lip-product', foto: 'image/ll.jpg', desc: 'Membentuk garis bibir lebih rapi', badge: 'Baru', badgeType: '' },
        // --- COMPLEXION (4) ---
        { id: 5, nama: 'Cushion', harga: 300000, kategori: 'complexion', foto: 'image/tr.jpg', desc: 'Coverage ringan, hasil natural', badge: 'Best Seller', badgeType: 'hot' },
        { id: 6, nama: 'Liquid Concealer', harga: 75000, kategori: 'complexion', foto: 'image/cr.jpg', desc: 'Menutup noda dan lingkar mata', badge: '', badgeType: '' },
        { id: 7, nama: 'Loose Powder', harga: 68000, kategori: 'complexion', foto: 'image/ls.jpg', desc: 'Hasil matte, kontrol minyak', badge: 'Favorit', badgeType: '' },
        { id: 8, nama: 'Face Primer', harga: 85000, kategori: 'complexion', foto: 'image/pm.jpg', desc: 'Makeup lebih halus dan tahan lama', badge: '', badgeType: '' },
        // --- MAKEUP REMOVER (2) ---
        { id: 9, nama: 'Micellar Water', harga: 59000, kategori: 'makeup-remover', foto: 'image/mw.jpg', desc: 'Angkat makeup tanpa dibilas', badge: 'Baru', badgeType: '' },
        { id: 10, nama: 'Cleansing Balm', harga: 89000, kategori: 'makeup-remover', foto: 'image/cb.jpg', desc: 'Lembut mengangkat makeup waterproof', badge: '', badgeType: '' },
        // --- BLUSH ON (2) ---
        { id: 11, nama: 'Liquid Blush', harga: 550000, kategori: 'blush-on', foto: 'image/bc.jpg', desc: 'Pipi merona alami, mudah diblend', badge: 'Best Seller', badgeType: 'hot' },
        { id: 12, nama: 'Powder Blush', harga: 62000, kategori: 'blush-on', foto: 'image/pb.jpg', desc: 'Pigmen halus, warna tahan lama', badge: '', badgeType: '' }
    ];

    /* 2. STATE */
    let cart = [];
    let currentFilter = 'all';
    let searchKeyword = '';
    const BATAS_DISKON = 100000;   // Latihan 1
    const PERSEN_DISKON = 0.1;

    const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');

    /* 3. RENDER PRODUK */
    function renderProduk() {
        const $grid = $('#produkGrid');
        $grid.empty();

        const kw = searchKeyword.toLowerCase();
        const filtered = produkData.filter(function (p) {
            const matchKategori = currentFilter === 'all' || p.kategori === currentFilter;
            const matchSearch = p.nama.toLowerCase().includes(kw) || p.desc.toLowerCase().includes(kw);
            return matchKategori && matchSearch;
        });

        if (filtered.length === 0) {
            $grid.html(`
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #bbb;">
          <i class="fas fa-search" style="font-size: 3.5rem; color: #f6dde0; margin-bottom: 20px; display: block;"></i>
          <h3 style="color: #999; font-weight: 600; margin-bottom: 8px;">Produk tidak ditemukan</h3>
          <p style="font-size: 0.9rem;">Coba kata kunci atau kategori lain</p>
        </div>`);
            return;
        }

        filtered.forEach(function (p) {
            const badgeHtml = p.badge ? `<div class="produk-badge ${p.badgeType}">${p.badge}</div>` : '';
            const card = `
        <div class="produk-card" data-id="${p.id}" data-kategori="${p.kategori}">
          ${badgeHtml}
          <div class="produk-img" data-label="Foto Produk&#10;600 × 600 px">
              <img src="${p.foto}" alt="${p.nama}" loading="lazy" onerror="this.style.display='none'">
            </div>
          <div class="produk-info">
            <h3>${p.nama}</h3>
            <p class="desc">${p.desc}</p>
            <div class="produk-footer">
              <div class="produk-price">${rupiah(p.harga)}<small>per pcs</small></div>
              <button class="btn-add-cart" data-id="${p.id}" title="Tambah ke keranjang"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>`;
            $grid.append(card);
        });
    }

    /* 4. FILTER (Navbar) */
    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(`.filter-btn[data-cat="${currentFilter}"]`).addClass('active');
        renderProduk();
    });

    /* 5. FILTER (Tombol) */
    $('.filter-btn').click(function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('cat');
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-filter="${currentFilter}"]`).addClass('active');
        renderProduk();
    });

    /* 6. PENCARIAN REAL-TIME */
    $('#searchProduk').on('input', function () {
        searchKeyword = $(this).val();
        renderProduk();
    });

    /* 7. TAMBAH KE KERANJANG */
    $(document).on('click', '.btn-add-cart', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        const produk = produkData.find(p => p.id === id);
        if (!produk) return;

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: produk.id, nama: produk.nama, harga: produk.harga, foto: produk.foto, qty: 1 });
        }

        updateCartUI();
        showToast(`💄 ${produk.nama} ditambahkan!`);

        $(this).css('transform', 'rotate(90deg) scale(1.3)');
        setTimeout(() => $(this).css('transform', ''), 300);
        $('#cartBadge').css('transform', 'scale(1.4)');
        setTimeout(() => $('#cartBadge').css('transform', 'scale(1)'), 200);
    });

    /* 8. HITUNG TOTAL (dengan diskon - Latihan 1) */
    function hitungTotal() {
        const subtotal = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        const qty = cart.reduce((sum, item) => sum + item.qty, 0);
        const diskon = subtotal > BATAS_DISKON ? subtotal * PERSEN_DISKON : 0;
        return { subtotal, diskon, total: subtotal - diskon, qty };
    }

    /* 9. UPDATE UI KERANJANG */
    function updateCartUI() {
        const $cartItems = $('#cartItems');
        const { subtotal, diskon, total, qty } = hitungTotal();

        $('#cartBadge').text(qty);

        // Latihan 1: tampilkan harga coret + harga setelah diskon
        if (diskon > 0) {
            $('#cartTotal').html(`<span class="total-old">${rupiah(subtotal)}</span>${rupiah(total)}`);
            $('#diskonInfo').html(`<i class="fas fa-tags"></i> Diskon 10% aktif! Hemat ${rupiah(diskon)}`).show();
        } else {
            $('#cartTotal').text(rupiah(total));
            $('#diskonInfo').hide();
        }

        if (cart.length === 0) {
            $cartItems.html(`
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Keranjang masih kosong</p>
          <small>Yuk pilih produk favoritmu dulu!</small>
        </div>`);
            return;
        }

        let html = '';
        cart.forEach(function (item) {
            html += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-icon"><img src="${item.foto}" alt="${item.nama}" onerror="this.style.display='none'"></div>
          <div class="cart-item-info">
            <h5>${item.nama}</h5>
            <div class="price">${rupiah(item.harga * item.qty)}</div>
            <div class="qty-control">
              <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" title="Hapus"><i class="fas fa-trash"></i></button>
        </div>`;
        });
        $cartItems.html(html);
    }

    /* 10. KONTROL QTY */
    $(document).on('click', '.qty-btn', function () {
        const action = $(this).data('action');
        const id = $(this).data('id');
        const item = cart.find(i => i.id === id);
        if (!item) return;

        if (action === 'plus') {
            item.qty += 1;
        } else if (action === 'minus') {
            item.qty -= 1;
            if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        }
        updateCartUI();
    });

    /* 11. HAPUS ITEM */
    $(document).on('click', '.cart-item-remove', function () {
        const id = $(this).data('id');
        const item = cart.find(i => i.id === id);
        if (item) showToast(`🗑️ ${item.nama} dihapus dari keranjang`);
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
    });

    /* 12. BUKA/TUTUP KERANJANG */
    $('#cartBtn').click(function () {
        $('#cartSidebar').addClass('open');
        $('#cartOverlay').fadeIn(300);
    });
    function tutupKeranjang() {
        $('#cartSidebar').removeClass('open');
        $('#cartOverlay').fadeOut(300);
    }
    $('#cartClose, #cartOverlay').click(tutupKeranjang);

    /* 13. RIWAYAT localStorage (Latihan 2) */
    function simpanRiwayat(total, qty, pembeli) {
        try {
            const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
            riwayat.push({ tanggal: new Date().toISOString(), total, qty, pembeli: pembeli || null });
            localStorage.setItem('riwayat', JSON.stringify(riwayat));
        } catch (err) {
            console.warn('Gagal menyimpan riwayat:', err);
        }
    }

    /* 14. MODAL FORM PEMBELI + VALIDASI (Latihan 3) */
    function bukaModal() {
        const { total, qty } = hitungTotal();
        $('#ringkasanPesanan').html(`<span>${qty} item</span><strong>${rupiah(total)}</strong>`);
        $('#formPembeli .form-group').removeClass('invalid');
        $('#modalOverlay').css('display', 'flex').hide().fadeIn(250);
        setTimeout(() => $('#inputNama').trigger('focus'), 280);
    }
    function tutupModal() {
        $('#modalOverlay').fadeOut(200);
    }

    function setError(inputSel, errSel, pesan) {
        const $grp = $(inputSel).closest('.form-group');
        if (pesan) {
            $(errSel).text(pesan);
            $grp.addClass('invalid');
            return false;
        }
        $grp.removeClass('invalid');
        return true;
    }

    function validasiNama() {
        const v = $('#inputNama').val().trim();
        if (v === '') return setError('#inputNama', '#errNama', 'Nama wajib diisi.');
        if (v.length < 3) return setError('#inputNama', '#errNama', 'Nama minimal 3 karakter.');
        if (!/^[A-Za-z\s.'-]+$/.test(v)) return setError('#inputNama', '#errNama', 'Nama hanya boleh berisi huruf.');
        return setError('#inputNama', '#errNama', '');
    }
    function validasiAlamat() {
        const v = $('#inputAlamat').val().trim();
        if (v === '') return setError('#inputAlamat', '#errAlamat', 'Alamat wajib diisi.');
        if (v.length < 10) return setError('#inputAlamat', '#errAlamat', 'Alamat terlalu singkat (min. 10 karakter).');
        return setError('#inputAlamat', '#errAlamat', '');
    }
    function validasiHp() {
        const v = $('#inputHp').val().trim().replace(/[\s-]/g, '');
        if (v === '') return setError('#inputHp', '#errHp', 'No. HP wajib diisi.');
        if (!/^(08|\+628|628)\d{8,11}$/.test(v)) return setError('#inputHp', '#errHp', 'Format tidak valid. Contoh: 081234567890');
        return setError('#inputHp', '#errHp', '');
    }

    // Validasi saat user mengetik/keluar dari kolom
    $('#inputNama').on('blur input', validasiNama);
    $('#inputAlamat').on('blur input', validasiAlamat);
    $('#inputHp').on('blur input', validasiHp);

    $('#modalClose').click(tutupModal);
    $('#modalOverlay').click(function (e) { if (e.target === this) tutupModal(); });
    $(document).on('keydown', function (e) { if (e.key === 'Escape') tutupModal(); });

    /* 15. CHECKOUT */
    $('#btnCheckout').click(function () {
        if (cart.length === 0) {
            showToast('❌ Keranjang masih kosong!');
            return;
        }
        bukaModal();
    });

    $('#formPembeli').on('submit', function (e) {
        e.preventDefault();

        // jalankan semua validasi (bukan berhenti di yang pertama gagal)
        const ok = [validasiNama(), validasiAlamat(), validasiHp()].every(Boolean);
        if (!ok) {
            showToast('⚠️ Periksa kembali data yang diisi');
            return;
        }

        const pembeli = {
            nama: $('#inputNama').val().trim(),
            alamat: $('#inputAlamat').val().trim(),
            hp: $('#inputHp').val().trim()
        };
        const { total, qty } = hitungTotal();

        const $btn = $('#btnKonfirmasi');
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Memproses...').prop('disabled', true);

        setTimeout(function () {
            $btn.html('<i class="fas fa-check-circle"></i> Konfirmasi Pesanan').prop('disabled', false);

            simpanRiwayat(total, qty, pembeli);   // Latihan 2

            cart = [];
            updateCartUI();
            $('#formPembeli')[0].reset();
            tutupModal();
            tutupKeranjang();

            showToast(`✅ Terima kasih, ${pembeli.nama}! ${qty} item · ${rupiah(total)}`);
        }, 1500);
    });

    /* 16. TOAST */
    let toastTimer;
    function showToast(message) {
        clearTimeout(toastTimer);
        $('#toastMsg').text(message);
        $('#toast').addClass('show');
        toastTimer = setTimeout(() => $('#toast').removeClass('show'), 2500);
    }

    /* 17. HAMBURGER MENU */
    $('#hamburger').click(function () {
        $('#navMenu').toggleClass('show');
        const icon = $(this).find('i');
        if ($('#navMenu').hasClass('show')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });
    $('.nav-link').click(function () {
        if (window.innerWidth <= 768) {
            $('#navMenu').removeClass('show');
            $('#hamburger').find('i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    /* 18. INISIALISASI */
    renderProduk();
    updateCartUI();
    console.log('%c💄 Glow Beauty - Siap!', 'color:#ff6b9d;font-size:16px;font-weight:bold;');
    console.log('%cTotal produk: ' + produkData.length, 'color:#2d1b3d;font-size:12px;');
    console.log('Riwayat tersimpan:', JSON.parse(localStorage.getItem('riwayat') || '[]'));
});