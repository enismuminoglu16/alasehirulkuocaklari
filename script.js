function submitQuiz() {
    const questions = document.querySelectorAll('.question');
    let correctCount = 0;
  
    questions.forEach((question) => {
      const selected = question.querySelector('input[type="radio"]:checked');
      const correctAnswer = question.getAttribute('data-answer');
      const labels = question.querySelectorAll('label');
  
      // Önceki sınıfları temizle
      labels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
      });
  
      if (selected) {
        const selectedValue = selected.value;
  
        if (selectedValue === correctAnswer) {
          // Doğru cevap seçildiyse yeşil renkte vurgula
          selected.parentElement.classList.add('correct');
          correctCount++;
        } else {
          // Yanlış cevap seçildiyse kırmızı renkte vurgula
          selected.parentElement.classList.add('incorrect');
        }
      }
    });
  
    const result = document.getElementById('result');
    result.textContent = `Doğru sayısı: ${correctCount} / ${questions.length}`;
  }
  