function submitQuiz() {
  const questions = document.querySelectorAll('.question');
  let correctCount = 0;
  let cevapDetaylari = "";

  questions.forEach((question, index) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    const correctAnswer = question.getAttribute('data-answer');
    const labels = question.querySelectorAll('label');

    labels.forEach(label => {
      label.classList.remove('correct', 'incorrect');
    });

    let selectedValue = selected ? selected.value : "Boş";
    let soruSonucu = `Soru ${index + 1}: Seçilen = ${selectedValue}, Doğru = ${correctAnswer}`;

    if (selected) {
      if (selected.value === correctAnswer) {
        selected.parentElement.classList.add('correct');
        correctCount++;
        soruSonucu += " ✅";
      } else {
        selected.parentElement.classList.add('incorrect');
        soruSonucu += " ❌";
      }
    } else {
      soruSonucu += " ❌";
    }

    cevapDetaylari += soruSonucu + "\n";
  });

  const result = document.getElementById('result');
  result.innerHTML = `Doğru sayısı: <span style="color: green;">${correctCount}</span> / ${questions.length}`;

  // Sonucu mail olarak gönder
  sonucuGonder(correctCount, cevapDetaylari);
}

function girisYap() {
  const adSoyad = document.getElementById("adSoyad").value.trim();
  if (adSoyad === "") {
    alert("Lütfen ad soyad giriniz.");
    return;
  }
  localStorage.setItem("adSoyad", adSoyad);
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
}

function sonucuGonder(puan, cevaplar) {
  const adSoyad = localStorage.getItem("adSoyad");

  emailjs.send("service_yw7cmrn", "template_x0ttvp4", {
    from_name: adSoyad,
    puan: puan,
    cevaplar: cevaplar
  }).then(function(response) {
    alert("Sonuç başarıyla e-posta ile gönderildi.");
    console.log("Mail gönderildi!", response.status, response.text);
  }, function(error) {
    console.error("Mail gönderme hatası:", error);
    alert("Mail gönderilemedi. Hata: " + error.text);
  });
}
