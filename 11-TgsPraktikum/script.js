// Matikan animasi jika pengguna memilih reduced motion
jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {
    var isMobile = function () { return window.innerWidth <= 768; };

    // ===== EFEK 1: Hero muncul berurutan (fadeIn + delay) =====
    $('.hero-text').children().each(function (i) {
        $(this).css({ opacity: 0, display: 'none' }).delay(i * 250).fadeIn(600).css('opacity', 1);
    });

    // ===== Navbar: hamburger & dropdown =====
    $('.nav-toggle').on('click', function () { $('.nav-list').stop(true, true).slideToggle(250); });

    // EFEK 2: dropdown slideDown/slideUp (hover di desktop, klik di mobile)
    $('.dropdown')
        .on('mouseenter', function () { if (!isMobile()) $(this).find('.dropdown-menu').stop(true, true).slideDown(200); })
        .on('mouseleave', function () { if (!isMobile()) $(this).find('.dropdown-menu').stop(true, true).slideUp(200); });
    $('.dropdown-btn').on('click', function () {
        if (isMobile()) $(this).siblings('.dropdown-menu').stop(true, true).slideToggle(200);
    });
    $(window).on('resize', function () {
        if (!isMobile()) { $('.nav-list').removeAttr('style'); $('.dropdown-menu').removeAttr('style'); }
    });

    // ===== Toast =====
    function tampilkanToast(pesan, tipe) {
        $('#toast').stop(true, true).removeClass('success error info').addClass(tipe)
            .text(pesan).fadeIn(250).delay(2600).fadeOut(400);
    }

    // ===== NAVIGASI TAB (fadeIn) =====
    function bukaTab(target) {
        $('.tab').removeClass('active').filter('[data-target="' + target + '"]').addClass('active');
        $('.tab-panel').hide();
        $(target).fadeIn(350);
    }
    $('.tab-panel').hide().first().show();
    $('.tab').on('click', function () { bukaTab($(this).data('target')); });

    // ===== Scroll halus ke bagian tujuan =====
    function scrollKe(selector) {
        var $t = $(selector);
        if (!$t.length) return;
        $('html, body').stop().animate({ scrollTop: $t.offset().top - $('.navbar').outerHeight() + 1 }, 600);
    }
    $('a[href^="#"]').on('click', function (e) {
        var href = $(this).attr('href');
        if (href.length < 2) return;
        e.preventDefault();
        var tab = $(this).data('tab');
        if (tab) bukaTab(tab);
        scrollKe(href);
        if (isMobile()) $('.nav-list').slideUp(200);
    });

    // ===== EFEK 3: kartu menu naik saat di-hover (animate) =====
    $('.menu-card')
        .on('mouseenter', function () { $(this).stop().animate({ top: '-8px' }, 150); })
        .on('mouseleave', function () { $(this).stop().animate({ top: '0px' }, 150); });

    // ===== EFEK 4: FAQ accordion (slideToggle) =====
    $('.faq-q').on('click', function () {
        var $a = $(this).next('.faq-a');
        $('.faq-a').not($a).slideUp(250).prev().removeClass('open');
        $a.slideToggle(250);
        $(this).toggleClass('open');
    });

    // ===== EFEK 5: tombol kembali ke atas (fadeIn/fadeOut + animate) =====
    var $top = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) $top.fadeIn(200); else $top.fadeOut(200);
    });
    $top.on('click', function () { $('html, body').animate({ scrollTop: 0 }, 500); });

    // ===== Tombol "Pesan" di kartu: isi form & scroll =====
    $('.btn-pesan').on('click', function () {
        var nama = $(this).data('nama');
        $('#fMenu').val(nama).removeClass('is-error');
        scrollKe('#preorder');
        tampilkanToast(nama + ' dipilih. Lengkapi formulir pre-order.', 'info');
    });

    // ===== Form: tanggal minimal besok, hitung karakter ucapan =====
    var besok = new Date(); besok.setDate(besok.getDate() + 1);
    var minTanggal = besok.toISOString().slice(0, 10);
    $('#fTanggal').attr('min', minTanggal);
    $('#fCatatan').on('input', function () { $('#hitung').text($(this).val().length); });

    // ===== jQuery VALIDATION PLUGIN + custom method =====
    $.validator.addMethod('nomorHp', function (v, el) {
        return this.optional(el) || /^(08|628)[0-9]{8,11}$/.test(v);
    }, 'Gunakan format 08xxxxxxxxxx (10–13 digit)');

    $.validator.addMethod('hurufSpasi', function (v, el) {
        return this.optional(el) || /^[A-Za-z\s.'-]+$/.test(v);
    }, 'Nama hanya boleh berisi huruf');

    $.validator.addMethod('tanggalMinimal', function (v, el) {
        return this.optional(el) || v >= minTanggal;
    }, 'Pre-order minimal H-1 dari hari ini');

    var validator = $('#formPreorder').validate({
        onkeyup: function (el) { $(el).valid(); },
        onfocusout: function (el) { $(el).valid(); },
        rules: {
            nama: { required: true, minlength: 3, hurufSpasi: true },
            email: { required: true, email: true },
            hp: { required: true, nomorHp: true },
            tanggal: { required: true, tanggalMinimal: true },
            menu: { required: true },
            jumlah: { required: true, digits: true, min: 1, max: 20 },
            metode: { required: true },
            catatan: { maxlength: 80 },
            setuju: { required: true }
        },
        messages: {
            nama: { required: 'Nama wajib diisi', minlength: 'Nama minimal 3 karakter' },
            email: { required: 'Email wajib diisi', email: 'Format email belum benar' },
            hp: { required: 'Nomor WhatsApp wajib diisi' },
            tanggal: { required: 'Pilih tanggal ambil' },
            menu: { required: 'Pilih dessert yang ingin dipesan' },
            jumlah: { required: 'Jumlah wajib diisi', digits: 'Jumlah harus berupa angka bulat', min: 'Minimal 1 potong', max: 'Maksimal 20 potong per pesanan' },
            metode: { required: 'Pilih metode pengambilan' },
            catatan: { maxlength: 'Ucapan maksimal 80 karakter' },
            setuju: { required: 'Centang persetujuan untuk melanjutkan' }
        },
        errorElement: 'div',
        errorClass: 'pesan-error',
        errorPlacement: function (error, el) {
            if (el.is(':radio') || el.is(':checkbox')) error.appendTo(el.closest('.form-group'));
            else error.insertAfter(el);
        },
        highlight: function (el) { $(el).addClass('is-error').removeClass('is-valid'); },
        unhighlight: function (el) { $(el).removeClass('is-error').addClass('is-valid'); },
        submitHandler: function (form) {
            var nama = $('#fNama').val().trim();
            var menu = $('#fMenu').val();
            tampilkanToast('Terima kasih, ' + nama + '! Pre-order ' + menu + ' diterima.', 'success');
            $('#sukses').stop(true, true).slideDown(300).delay(4000).slideUp(300);
            form.reset();
            validator.resetForm();
            $('#hitung').text(0);
            $('#formPreorder .is-error, #formPreorder .is-valid').removeClass('is-error is-valid');
        }
    });
});