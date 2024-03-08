export const analyzeNextSteps = (step, userResponse, purposeMenu, purposeDeliver) => {
  const menuOne = userResponse.includes('1');
  const menuTwo = userResponse.includes('2');
  const menuThree = userResponse.includes('3');
  const wrongWord = 
    purposeMenu === 0 && purposeDeliver === 0 && !userResponse.includes('123 tampilkan menu');
  
  return userResponse === "tampilkan menu"
    ? {
        purpose: "question",
        message: `Salam kenal, kami akan ${userResponse} yang tersedia saat ini di Hotel & Resto Food Lestari! Berikut pilihan menunya:`,
        options: ["1. Nasi Goreng", "2. Soto", "3. Gado-gado"],
        confirmation: "Silahkan pilih menu dengan klik atau mengetik no berapa yang Anda mau pesan"
      }
    : menuOne
    ? {
        purpose: "menu nasi goreng",
        message:
          "Baik, kami akan menyiapkan menu <b>Nasi Goreng</b> yang anda pesan.",
        confirmation: "Mohon di tunggu :)"
      }
    : menuTwo
    ? {
        purpose: "menu soto",
        message:
          "Baik, kami akan menyiapkan menu <b>Soto</b> yang anda pesan.",
        confirmation: "Mohon di tunggu :)"
      }
    : menuThree
    ? {
        purpose: "menu gado-gado",
        message:
          "Baik, kami akan menyiapkan menu <b>Gado-gado</b> yang anda pesan.",
        confirmation: "Mohon di tunggu :)"
      }
    : wrongWord
    ? {
        purpose: "wrong",
        message:
          "Maaf, Anda sepertinya salah memasukan perintah sesuai intruksi kami.",
        confirmation: "Mohon di coba kembali"
      }
    : {
        purpose: "close",
        message: "Terima kasih sudah pesan di Hotel & Resto Food Lestari!",
        confirmation: "Saya harap Anda puas dengan masakan kami"
      };
};
