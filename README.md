# <div align='center'>Dokumentasi Sistem Events Dabi-Ai</div>

## 🅒 Code Source
[![Dabi-Ai](https://github.com/Dabilines/Dabi-Ai)

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

<h3>
 <p align="center">
  <a href="https://id.m.wikipedia.org/wiki/JavaScript">
   <img src="https://img.shields.io/badge/JavaScript-0?style=for-the-badge&logo=javascript&logoColor=F7DF1E&logoSize=3&color=323330" alt="JavaScript" />
  </a>
 </p>
</h3>

## Panduan lengkap

<p align="left">
Berikut adalah panduan lengkap untuk membuat events dengan sistem events saya pada bot WhatsApp yang menggunakan Whiskeysockets/baileys.
</p>

### 🔎  Apa itu Whiskeysockets/baileys
 [Whiskeysockets](https://guide.whiskeysockets.io) atau baileys adalah library Node.js, berbasis TypeScript yang di gunakan untuk berkomunikasi dengan Web Api WhatsApp.


### Struktur Events
<p align="center">
Setiap events memiliki struktur dasar sebagai berikut:
</p>

```js
import fs from 'fs' // import module harus paling atas

export default function info(ev) { // "info" nama file
  ev.on({
    name: 'Nama Command', // wajib
    cmd: ['cmd', 'bisa 2 cmd'], // wajib array
    ocrs: ['mini cmd'], // opsional kalo gak mau ada mini cmd hapus aja
    tags: 'Info Menu', // tentukan tags kelompok cmd (wajib)
    desc: 'Deskripsi cmd' // opsional
    owner: !1, // !1 adalah false, !0 adalah true
    prefix: !0,
    money: 100, // jika di isi 0 maka akan mengikuti nilai % pajak
    exp: 0.1, // exp yang pengguna peroleh saat menggunakan cmd

    run: async (xp, m, {
      args,
      chat,
      cmd,
      ocrs,
      prefix,
      store, // store untuk cmd saluran
      text,
    }) => {
      try {
        const { usrAdm, botAdm, adm } = await grupify(xp, m) // destructing admin dan bot admin

        if (!usrAdm || !botAdm) return xp.sendMessage(chat.id, { text: !usrAdm ? 'kamu bukan admin' : 'aku bukan admin' }, { quoted: m })

        // logika cmd
        xp.sendMessage(chat.id, { text: 'command berhasil dijalankan' }, { quoted: m })
      } catch (e) {
        err(`error pada ${cmd}`, e)
        call(xp, e, m)
      }
    }
  })
}
```

### Parameter Fungsi run
- ```xp```  -->  Objek utama dari Baileys untuk mengirim pesan.
- ```m```  -->  Data pesan yang diterima oleh bot.


### Penjelasan Bagian
<p align="center">
Berikut adalah contoh implementasi untuk event yang memiliki fungsi sebagai berikut:
</p>


1. Import module
```js
import fs from 'fs'
import path from 'path'
```

- Menggunakan ```import``` untuk mengambil module atau file lain agar bisa digunakan di file saat ini.

- Bisa mengambil dari package (misalnya fs, @whiskeysockets/baileys) atau dari file sendiri (./index.js)

- Module yang di-import harus sudah di-export agar bisa dipakai.

- Setelah di-import, semua fungsi atau variabel dari module tersebut bisa digunakan sesuai kebutuhan.

2. Properti Events
```js
ev.on({
  name: 'tes',
  cmd: ['tes'],
  tags: 'Info Menu',
  desc: 'tes bot',
  owner: !1,
  prefix: !0,
  money: 1,
  exp: 0.1,

  run: async (xp, m, {
    chat,
    cmd
  }) => {
    try {
      log('command berhasil dipanggil')
    } catch (e) {
      err(`error pada ${cmd}`, e)
      call(xp, e, m)
    }
  }
})
```

#### Penjelasan Property Events
- ```name```  -->  Nama unik event yang digunakan untuk identifikasi.
- ```cmd```  -->  Array berisi daftar command yang dapat digunakan untuk memanggil event.
- ```ocrs```  -->  Mini Command untuk menjalankan sistem set.
- ```tags```  -->  Kategori untuk pengelompokan event pada menu bot.
- ```desc```  -->  Deskripsi singkat mengenai fungsi event.
- ```owner```  -->  Fungsi untuk menangani hanya owner.
- ```prefix```  -->  Fungsi untuk menangani prefix.
- ```money```  -->  Fungsi yang menentukan nilai pajak cmd.
- ```exp```  -->  Fungsi untuk menentukan exp yang di peroleh pengguna.
- ```run```  -->  Fungsi utama yang dijalankan saat event dipanggil.

3. Ekstraksi Data Pesan

```js
run: async (xp, m, {
  args,
  chat,
  cmd,
  ocrs,
  prefix,
  store, // store untuk cmd saluran
  text,
}) => { ... }
```

- ```args```  -->  Isi pesan pengguna berupa text.
- ```chat```  -->  Berisi chat.id, chat.sender, chat.pushName, chat.group, chat.channel, yang masing-masing berisi fungsi yang diperuntukan.
- ```cmd```  -->  Berisi text cmd dari user.
- ```ocrs```  -->  Berisi data mini command untuk digunakan didalam run.
- ```prefix```  -->  Berisi data prefix untuk digunakan didalam run.
- ```store```  -->  Fungsi store untuk command yang berhubungan dengan channel.
- ```text```  -->  Dari pada menggunakan args yang masih mentah text kelebihan text bisa mengelola isi pesan pengguna dengan matang.

<h4>
 <p align="left">
 Nilai nya di ambil dari
 </p>
</h4>

- ```m.message?.conversation``` Untuk penanganan pesan teks biasa
- ```m.message?.extendedTextMessage?.text``` untuk pesan yang merupakan reply atau mengutip pesan lain.
- Jika tidak ditemukan teks, maka nilainya adalah string kosong (' ').

<h4>
 <p align="center">
 Untuk pesan tipe media
 </p>
</h4>

<p align="center">
 biasanya tidak memiliki conversation atau extendedTextMessage.text. Formatnya tergantung jenis media.
</p>

contoh:

- m.message?.imageMessage
- m.message?.videoMessage
- m.message?.audioMessage
- m.message?.documentMessage
- m.message?.stickerMessage

Pesan media dapat dikenali dari adanya properti tersebut. <br> <br>
Jika kamu ingin menangani media, kamu bisa cek ./system/msg.js:

```media```  -->  Menentukan apakah pesan tersebut berisi media (gambar, video, audio, dokumen, atau stiker).<br> <br>

4. Tips pengembangan
- gunakan ```xp.sendMessage``` untuk mengirim pesan.
- Gunakan ```quoted: m``` jika ingin membalas langsung ke pesan pengguna.
- Pastikan semua error ditangani dengan baik menggunakan ```try-catch```

### Cara Menambahkan Event Baru
1. Buat file baru di folder yang sesuai (misalnya `cmd/command/nama_event.js`).
2. Pastikan struktur seperti contoh di atas.
3. Sesuaikan `name`, `cmd`, `tags`, dan `run`.
4. Jika ingin menambahkan fungsi tambahan, buat fungsi baru di dalam file yang sama.
5. tidak perlu repot-repot merestart bot, karena sudah auto update
6. event yang tambahkan akan di simpan ke ev.cmd dan bisa di cek dengan eval

1. cek dengan mencari nama

```bash
> ev.cmd.find(cmd => cmd.name ==='menu')
```

2. cek isi run

```bash
> ev.cmd.find(cmd => cmd.name ==='menu').run
```

3. cek dengan mencari cmd

```bash
> ev.cmd.find(u => u.cmd?.includes('menu'))?.run
```

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

## Request & Fix 
   laporkan Bug ke [sini](https://wa.me/6285194993977?text=halo+kak+aku+ingin+melaporkan+bug)
   [email](maoudabioffc@gmail.com)
   
