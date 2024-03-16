# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `nvm use 14 or 18`

### `npm install`

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
# How to work of Flowchart Chat Bot - Explanation:

Flow Running Yang Diminta:

- Tampilkan 1 pesan dari Chat Bot
- User mengetik 'Tampilkan Menu'
- Otomatis Chat Bot akan merespon menampilkan menu dengan pilihan
1. Nasi Goreng
2. Soto
- Apabila tidak mengetik 'Tampilkan Menu' maka menu tidak akan muncul, memberitahukan informasi ke user untuk mengetik 'Tampilkan Menu'
- Lalu jika sudah muncul pilihan menu maka user akan mengetik angka 1 atau 2
- Apabila user tidak mengetik angka 1 atau 2 otomatis chat bot akan merespon untuk user memilih no sesuai menu
- Apabila user sudah mengetik angka 1 atau 2 otomatis chat bot akan merespon pesanan akan segera di siapkan
- Lalu selanjutnya user balas chat bebas
- Chat bot akan merespon dengan kalimat penutup 'Terima kasih'

Flow Running Flowchart Dari Logic yang Saya Bikin:

- Flowchart akan muncul pertama kali pada halaman home page.
- Akan ada chat bot start untuk memulai percakapan
- Lalu kita DRAG 'Message User' pada sidebar
- Hubungkan relasi antara start bot dengan message user baru.
- Pada 'Message User' yang baru dibuat akan menampilkan pesan default 
'Writing text...'
- Untuk merubahnya bisa langsung klik pada flow chart chat box, otomatis di sidebar akan muncul inputan untuk merubah
- Auto change ketika kita merubah, apabila selesai bisa klik button save
- Lalu DRAG 'Message Bot' pada sidebar
- Pada 'Message Bot' yang baru dibuat akan menampilkan pesan default 
'Connect node in here'
- Lalu hubungkan relasi antara 'Message User' ke 'Message Bot'
- Apabila yang di 'Message User' yang di buat tadi memasukan inputan 'Tampilkan Menu' maka otomatis ketika dihubungkan valuenya akan berubah menjadi
'Berikut menu yang ada dikita saat ini! 1. Nasi Goreng 2. Soto ....'
- Apabila yang di 'Message User' memasukan inputan bukan 'Tampilkan Menu' maka otomatis value yang akan di tampilkan adalah
'Silakan ketik Tampilkan Menu untuk melihat menu kami'
- Apabila perubahan tidak terjadi otomatis maka bisa dengan mengklik di luar flow chart chat box, atau bebas dimana saja - Double Click
- Lalu selanjutnya DRAG 'Message User' untuk memilih menu yang akan dipilih
- Bisa langsung juga DRAG 'Message Bot'.
- Isi 'Message User' yang baru di bikin dengan mengetik angka '1' atau '2'
- Lalu hubungkan relasi ke 'Message Bot' yang baru dibikin.
- Apabila 'Message User' mengetik angka '1' maka valuenya di 'Message Bot' akan berubah menjadi 
'Ok, akan segera kami kirim untuk NASI GORENG pesanan Anda. Mohon ditunggu.'
- Apabila 'Message User' mengetik angka '2' maka valuenya di 'Message Bot' akan berubah menjadi 
'Ok, akan segera kami kirim untuk SOTO pesanan Anda. Mohon ditunggu.'
- Jika tidak memasukkan angka sesuai perintah maka value akan berubah menjadi 
'Silakan pilih menu dengan masukan angka no berapa yang mau dipilih'
- Lalu DRAG lagi 'Message User' dan 'Message Bot'
- Dimana 'Message User' yang baru dibikin bebas untuk input apa saja
- Maka ketika di hubungkan relasi 'Message Bot' akan merespon value
'Terima kasih sudah pesan di kami! ditunggu pesanannya.'
- Selesai sampai disini

Noted Tentang Flow Chartnya:

- Akan ada 2 pilihan button untuk bikin chat dari USER & BOT
- Untuk menambahkan Flow Chat baru, caranya harus di DRAG pada menu button 'Message User' / 'Message Bot' pada bagian button ke dalam Flowchart
- Flowchart untuk Start BOT, USER dan BOT sudah dibedakan dari warna dan pesan default yang ditampilkan
- Untuk melihat response untuk bagian Flowchart BOT harus hubungkan relasi
- Untuk mengedit value dari 'Message User' harus klik bagian flowchart chat box nya, nanti di sidebar akan muncul input untuk merubahnya
- Untuk alur flowchartnya bisa dilihat dari catetan dipaling atas 'Flow Running Yang Diminta'
```

