import fs from 'fs'

const sifatList = [ 'Baik', 'Jahat', 'Lucu', 'Pemarah', 'Penyabar', 'Pemalu', 'Percaya Diri', 'Pemberani', 'Cengeng', 'Bijaksana', 'Pintar', 'Sombong', 'Rendah Hati', 'Setia', 'Cemburuan', 'Pelit', 'Dermawan', 'Pemalas', 'kek kontol', 'Rajin', 'Sensitif' ],

cekDosa = [ 'Femboy', 'Jomok', 'Rasis', 'Memfitnah', 'Bilang bot lemah', 'Main wa dua arah', 'Menghina admin', 'Menghina Member', 'Menghina Owner', 'Merayu Admin', 'Menyiksa lalat', 'Bilang owner hitam', 'Bilang "p" doang tiap masuk grup', 'Cabul ke member', 'Ngemis di grup', 'Ngeghost pas ditanya', 'Nyepam stiker 18+', 'Nyolong status WA orang', 'Pura-pura nolep', 'Sok bijak padahal toxic', 'Toxic terus tiap malam', 'Mengejek orang tua', 'AFK pas giliran debat', 'Kirim VN napas doang', 'Promosi dagangan tanpa izin', 'Suka skip pertanyaan penting', 'Komen seenak jidat', 'Kepo tapi gak pernah bantu', 'Ngasih link phising', 'Ngegas duluan pas disapa', 'Kirim stiker mantan terus', 'Curhat terus tapi gak pernah dengerin orang', 'Ngaku anak jenderal', 'Meme tak lucu tapi dipaksa ketawa', 'Suka kirim gambar blur', 'Berantem sama bot', 'Pembokep handal', 'Kalah debat jadi femboy', 'Ngaku cewek padahal cowok', 'Jadi silent reader sejati', 'Ngaku hacker padahal script kiddie', 'Ngetag semua member tanpa alasan', 'Typo parah sampe disangka sandi rahasia', 'Tiba-tiba left grup tanpa pamit', 'Kirim foto nasi goreng jam 3 pagi', 'Gak pernah baca pinned pesan', 'Pernah menghitamkan grup', 'Kirim voice note sambil kentut', 'Join cuma buat liat PP member', 'Mainin perasaan member' ],

sambungKata = {
  1:  { soal: "rumah _ _ _ _ _ jiwa", jawaban: "sakit" },
  2:  { soal: "mata _ _ _ _ pagi", jawaban: "hari" },
  3:  { soal: "_ _ _ laut yang biru", jawaban: "air" },
  4:  { soal: "kepala _ _ _ _ yang keras", jawaban: "batu" },
  5:  { soal: "ayam _ _ _ _ _ _ _ pak mulyono", jawaban: "kampung" },
  6:  { soal: "lalu _ _ _ _ _ _ yang padat", jawaban: "lintas" },
  7:  { soal: "tangan kiri yang _ _ _ _", jawaban: "kuat" },
  8:  { soal: "bunga mawar yang _ _ _ _ _", jawaban: "indah" },
  9:  { soal: "hujan _ _ _ _ _ sekali", jawaban: "deras" },
  10: { soal: "api _ _ _ _ _ _ waktu kemah", jawaban: "unggun" },

  11: { soal: "_ _ _ _ meja kayu", jawaban: "kaki" },
  12: { soal: "puncak _ _ _ _ _ _ _ yang tinggi", jawaban: "gunung" },
  13: { soal: "_ _ _ _ apel yang manis", jawaban: "buah" },
  14: { soal: "ikan _ _ _ _ asin", jawaban: "laut" },
  15: { soal: "burung _ _ _ _ milik pak mulyono", jawaban: "wowo" },
  16: { soal: "daun _ _ _ _ _ yang jatuh", jawaban: "pohon" },
  17: { soal: "batu _ _ _ _ yang panas", jawaban: "bara" },
  18: { soal: "air _ _ _ _ _ _ yang tinggi", jawaban: "terjun" },
  19: { soal: "malam yang _ _ _ _ _ _", jawaban: "terang" },
  20: { soal: "siang _ _ _ _ bersama pak wowo", jawaban: "hari" },

  21: { soal: "kepala _ _ _ mulyono memutih", jawaban: "pak" },
  22: { soal: "_ _ _ _ pisau yang tajam", jawaban: "mata" },
  23: { soal: "balok _ _ yang dingin", jawaban: "es" },
  24: { soal: "mulut pak _ _ _ _ bau", jawaban: "wowo" },
  25: { soal: "telinga _ _ _ _ _ _ _ yang panjang", jawaban: "kelinci" },
  26: { soal: "kertas putih yang _ _ _ _ _ _", jawaban: "kosong" },
  27: { soal: "buku _ _ _ _ _ yang tebal", jawaban: "tulis" },
  28: { soal: "tinta _ _ _ _ sudah kering", jawaban: "pena" },
  29: { soal: "kursi milik pak wowo _ _ _ _ _", jawaban: "rusak" },
  30: { soal: "pintu _ _ _ _ _ _ _ sekolah", jawaban: "gerbang" },

  31: { soal: "jendela milik pak mulyono yang _ _ _ _ _", jawaban: "pecah" },
  32: { soal: "hati-hati lantai _ _ _ _ _", jawaban: "basah" },
  33: { soal: "atap rumah pak wowo _ _ _ _ _", jawaban: "bocor" },
  34: { soal: "roda ban kita _ _ _ _ _", jawaban: "bocor" },
  35: { soal: "mesin motor sudah _ _ _ _ _", jawaban: "panas" },
  36: { soal: "jalan di _ _ _ _ _ sedang macet", jawaban: "depan" },
  37: { soal: "lampu jalan ini sangat _ _ _ _ _ _", jawaban: "terang" },
  38: { soal: "kabel _ _ _ _ _ _ _ didepan putus", jawaban: "listrik" },
  39: { soal: "air _ _ _ _ _ ini sangat kotor", jawaban: "minum" },
  40: { soal: "nasi sudah _ _ _ _ _ _", jawaban: "matang" },

  41: { soal: "kopi hitam ini sangat _ _ _ _ _", jawaban: "pahit" },
  42: { soal: "teh ini terlalu _ _ _ _ _", jawaban: "manis" },
  43: { soal: "gula _ _ _ _ _ itu harganya berapa", jawaban: "pasir" },
  44: { soal: "lihat _ _ _ _ yang biru itu, sangan indah", jawaban: "laut" },
  45: { soal: "susu _ _ _ _ ini sangat manis", jawaban: "sapi" },
  46: { soal: "_ _ _ _ tawar ini sudah berjamur", jawaban: "roti" },
  47: { soal: "hati-hati pak _ _ _ _ lantai ini licin", jawaban: "wowo" },
  48: { soal: "susu _ _ _ _ telah habis", jawaban: "sapi" },
  49: { soal: "ikan _ _ _ _ itu sepertinya enak", jawaban: "laut" },
  50: { soal: "sayur pak mulyono di _ _ _ _ _ ulat", jawaban: "makan" }
}

export default {
  sifatList,
  cekDosa,
  sambungKata
}
