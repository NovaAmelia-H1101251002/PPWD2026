<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Myself - Nova Amelia</title>
    
    <!-- Memanggil font tulisan tangan (Caveat) dari Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet">
    
    <!---Panggil style css--->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        
        <!-- BAGIAN KIRI: TEKS -->
        <div class="kolom-kiri">
            <div class="hello-badge">hello!</div>
            
            <?php
                $nama = "Nova Amelia";
                $status = "Information System student";
                $kampus = "Universitas Tanjungpura";
            ?>

            <p>I'm <strong><?php echo $nama; ?></strong>, a <?php echo $status; ?> at <?php echo $kampus; ?>, i love about creative, visual, and user experience.</p>
            
            <p>I have broadened my expertise across web development, UI/UX design, and coding, working to make plain pages look incredibly attractive and aesthetic.</p>
            
            <p>I have a soft spot for capturing photos that carry a deep, meaningful vibe. I also love connecting with new people and learning fresh perspectives from their 
                experiences. When it comes to expressing myself, you'll usually find me playing with my cat, 
                Tole, or baking something sweet in the kitchen.</p>
            
            <p>I’m a huge fan of movies and dramas—whether it’s Korean, Western, or Indonesian. Looking ahead, I really want to dive deeper into the tech world and expand my 
                knowledge, especially when it comes to UI/UX design and i want to learn freediving so much.</p>
        </div>

        <!-- BAGIAN KANAN: FOTO DAN TULISAN MELAYANG -->
        <div class="kolom-kanan">
            
            <div class="tulisan-tangan">
                about<br>my<br>self
            </div>
            
            <div class="filmstrip">
                <img src="saya.jpg.png" alt="Foto Nova">
                <img src="tole-removebg-preview.png" alt="Foto Tole">
                <img src="saya.jpg.png" alt="Foto Nova">
            </div>

        </div>

    </div>

</body>
</html>