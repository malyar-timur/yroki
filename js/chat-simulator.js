document.addEventListener('DOMContentLoaded', () => {
  // --- INTERACTIVE: 11-SCENARIO CHAT SIMULATOR WITH SCORE ---
  const chatMessages = document.getElementById('chat-messages');
  const chatOptionsContainer = document.getElementById('chat-options');
  const chatExplanation = document.getElementById('chat-explanation');
  const chatUsernameEl = document.querySelector('.chat-username');
  const avatarEl = document.querySelector('.avatar');
  const chatScoreEl = document.getElementById('chat-score');
  
  let currentScenarioIndex = 0;
  let totalScore = 0;

  // Retrieve scenarios from window object
  const chatScenarios = window.chatScenarios || [];

  function renderScenario() {
    if (!chatMessages || !chatOptionsContainer) return;
    
    // Clear elements
    chatMessages.innerHTML = '';
    if (chatExplanation) chatExplanation.style.display = 'none';
    chatOptionsContainer.innerHTML = '';

    // Update score display
    if (chatScoreEl) chatScoreEl.textContent = totalScore;

    if (currentScenarioIndex >= chatScenarios.length) {
      // Finished all scenarios
      if (chatUsernameEl) chatUsernameEl.textContent = 'Система безопасности';
      if (avatarEl) avatarEl.style.background = 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))';
      
      const finishedMsg = document.createElement('div');
      finishedMsg.className = 'message received';
      finishedMsg.innerHTML = `Поздравляем! Ты успешно прошел все 11 тренировок по кибербезопасности! Твой итоговый результат: ${totalScore} очков из 110 возможных. Ты отлично умеешь распознавать реальные угрозы в интернете!`;
      chatMessages.appendChild(finishedMsg);
      
      const restartBtn = document.createElement('button');
      restartBtn.className = 'chat-option-btn';
      restartBtn.style.textAlign = 'center';
      restartBtn.style.borderColor = 'var(--neon-green)';
      restartBtn.textContent = 'Начать тренировку заново';
      restartBtn.addEventListener('click', () => {
        currentScenarioIndex = 0;
        totalScore = 0;
        renderScenario();
      });
      chatOptionsContainer.appendChild(restartBtn);
      return;
    }

    const scenario = chatScenarios[currentScenarioIndex];
    
    // Update headers
    if (chatUsernameEl) chatUsernameEl.textContent = `${scenario.username} (Сценарий ${currentScenarioIndex + 1} из 11)`;
    if (avatarEl) avatarEl.style.background = scenario.avatarColor;

    // Render original incoming message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message received';
    msgDiv.textContent = scenario.text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Shuffle options so the correct answer is not always at the bottom
    const shuffledOptions = [...scenario.options].sort(() => Math.random() - 0.5);

    // Render choice options
    shuffledOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chat-option-btn';
      btn.textContent = opt.text;
      
      btn.addEventListener('click', () => {
        // Disable other buttons during action
        chatOptionsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
        
        // Show sent message
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message sent';
        replyDiv.textContent = opt.text;
        chatMessages.appendChild(replyDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Award points
        totalScore += opt.points;
        if (chatScoreEl) chatScoreEl.textContent = totalScore;
        
        // Show explanation
        if (chatExplanation) {
          chatExplanation.style.display = 'block';
          chatExplanation.className = `chat-explanation ${opt.type}`;
          chatExplanation.textContent = opt.explanation;
        }

        // Show "Next" action button after short timeout
        setTimeout(() => {
          chatOptionsContainer.innerHTML = '';
          const nextBtn = document.createElement('button');
          nextBtn.className = 'chat-option-btn';
          nextBtn.style.textAlign = 'center';
          nextBtn.style.borderColor = 'var(--neon-cyan)';
          nextBtn.textContent = currentScenarioIndex < chatScenarios.length - 1 ? 'Следующий сценарий' : 'Завершить тренировку';
          
          nextBtn.addEventListener('click', () => {
            currentScenarioIndex++;
            renderScenario();
          });
          
          chatOptionsContainer.appendChild(nextBtn);
        }, 1200);
      });
      
      chatOptionsContainer.appendChild(btn);
    });
  }

  if (chatMessages) {
    renderScenario();
  }
});
