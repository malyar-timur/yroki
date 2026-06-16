document.addEventListener('DOMContentLoaded', () => {
  // --- SLIDER LOGIC ---
  const slides = document.querySelectorAll('.slide');
  const sidebarItems = document.querySelectorAll('.slide-list-item');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const counterCurrent = document.getElementById('counter-current');
  const counterTotal = document.getElementById('counter-total');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  
  if (counterTotal) counterTotal.textContent = totalSlides;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev-slide');
      if (index === currentSlideIndex) {
        slide.classList.add('active');
      } else if (index < currentSlideIndex) {
        slide.classList.add('prev-slide');
      }
    });

    sidebarItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentSlideIndex);
      // Ensure active item is visible in sidebar scrolling
      if (index === currentSlideIndex) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update Progress Bar
    const progress = (currentSlideIndex / (totalSlides - 1)) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Update Counter
    if (counterCurrent) counterCurrent.textContent = currentSlideIndex + 1;
  }

  // Event Listeners for slide buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlides();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlides();
      }
    });
  }

  // Sidebar item click listeners
  sidebarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentSlideIndex = index;
      updateSlides();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    } else if (e.key === 'ArrowRight' && currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  });

  // Initialize slides
  updateSlides();


  // --- INTERACTIVE: CHAT SIMULATOR ---
  const chatMessages = document.getElementById('chat-messages');
  const chatOptionsContainer = document.getElementById('chat-options');
  const chatExplanation = document.getElementById('chat-explanation');
  
  // Script structure for chat game
  const chatScenarios = [
    {
      id: 1,
      sender: 'received',
      text: 'Привет! 🤖 Я модератор канала Gemini AI. Поздравляю, ты выиграл годовую подписку Gemini Advanced! 🎁 Чтобы забрать приз, просто перешли мне код, который сейчас придет тебе на телефон в SMS!',
      options: [
        {
          text: 'Ого! Круто! Сейчас придет код, я сразу отправлю тебе.',
          nextId: 2,
          type: 'danger',
          explanation: '❌ Ошибка! Никогда не передавай коды подтверждения из SMS! Мошенники используют их, чтобы взломать твои аккаунты, соцсети или даже украсть деньги.'
        },
        {
          text: 'А это безопасно? Можешь доказать, что ты настоящий модератор?',
          nextId: 3,
          type: 'danger',
          explanation: '⚠️ Осторожно! Мошенники умеют отлично притворяться модераторами, подделывать профили и скриншоты. Даже если они вежливые, настоящая поддержка НИКОГДА не попросит твои пароли или SMS-коды!'
        },
        {
          text: 'Я не передаю коды из SMS и пароли никому. Я сообщу администрации о попытке взлома.',
          nextId: 4,
          type: 'success',
          explanation: '✅ Отлично! Ты настоящий кибер-герой! Любые коды подтверждения — это цифровые ключи от твоей личной двери. Никому их не открывай.'
        }
      ]
    },
    {
      id: 2,
      sender: 'received',
      text: 'Отлично, жду! Как только скинешь код, твой аккаунт автоматически обновится.',
      options: []
    },
    {
      id: 3,
      sender: 'received',
      text: 'Конечно! Вот скриншот моей админ-панели и наши правила. Всё честно. Давай код, пока акция не закончилась!',
      options: []
    },
    {
      id: 4,
      sender: 'received',
      text: 'Ладно, ладно... (Пользователь вышел из сети)',
      options: []
    }
  ];

  function renderChatScenario(scenarioId) {
    const scenario = chatScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Clear options
    chatOptionsContainer.innerHTML = '';

    // Append received message with simulated typing delay or instantly for presentation speed
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${scenario.sender}`;
    msgDiv.textContent = scenario.text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Render options
    scenario.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chat-option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        // Render sent message
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message sent';
        replyDiv.textContent = opt.text;
        chatMessages.appendChild(replyDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Show explanation
        chatExplanation.style.display = 'block';
        chatExplanation.className = `chat-explanation ${opt.type}`;
        chatExplanation.textContent = opt.explanation;

        // Load next scenario message
        setTimeout(() => {
          renderChatScenario(opt.nextId);
        }, 1000);
      });
      chatOptionsContainer.appendChild(btn);
    });

    if (scenario.options.length === 0) {
      // Add reset button inside options if game ended
      const resetBtn = document.createElement('button');
      resetBtn.className = 'chat-option-btn';
      resetBtn.style.textAlign = 'center';
      resetBtn.style.borderColor = 'var(--neon-cyan)';
      resetBtn.textContent = '🔄 Начать симуляцию заново';
      resetBtn.addEventListener('click', resetChatGame);
      chatOptionsContainer.appendChild(resetBtn);
    }
  }

  function resetChatGame() {
    chatMessages.innerHTML = '';
    chatExplanation.style.display = 'none';
    renderChatScenario(1);
  }

  // Init chat game
  resetChatGame();


  // --- INTERACTIVE: PHONE SIMULATOR ---
  const callDeclineBtn = document.getElementById('call-decline');
  const callAcceptBtn = document.getElementById('call-accept');
  const phoneDialogBox = document.getElementById('phone-dialog-box');
  const phoneFeedback = document.getElementById('phone-feedback');
  const resetPhoneBtn = document.getElementById('reset-phone-btn');
  const callerStatus = document.querySelector('.caller-status');

  if (callAcceptBtn && callDeclineBtn) {
    callAcceptBtn.addEventListener('click', () => {
      callerStatus.textContent = '00:04 • Разговор...';
      callerStatus.style.color = 'var(--neon-green)';
      callAcceptBtn.style.display = 'none';
      callDeclineBtn.style.width = '120px';
      callDeclineBtn.style.borderRadius = '30px';
      callDeclineBtn.querySelector('.phone-label').textContent = 'Положить трубку';
      
      phoneDialogBox.style.display = 'block';
      phoneDialogBox.innerHTML = `
        <strong style="color:var(--neon-pink);">Голос в трубке:</strong><br>
        «Алло, привет! Это из службы поддержки твоего мобильного оператора. У тебя заканчивается срок действия SIM-карты! Срочно назови код из СМС, который мы тебе отправили, иначе твой телефон заблокируется навсегда!»
      `;

      // Show options/feedback when they choose what to do next
      setTimeout(() => {
        // Change feedback state
        showPhoneFeedback(
          '⚠️ Будь осторожен!', 
          'Они просят код из СМС! Если ты продиктуешь его, они украдут твои личные данные. Самый лучший выбор — повесить трубку и перезвонить родителям или по официальному номеру поддержки с сайта оператора!',
          'danger'
        );
      }, 5000);
    });

    callDeclineBtn.addEventListener('click', () => {
      showPhoneFeedback(
        '🎉 Правильное решение!',
        'Ты сбросил звонок с незнакомого номера. Если звонят неизвестные люди и пугают блокировками, выигрышами или бедой с близкими — сразу сбрасывай звонок. Никогда не разговаривай с ними!',
        'success'
      );
    });
  }

  function showPhoneFeedback(title, desc, type) {
    if (!phoneFeedback) return;
    phoneFeedback.style.display = 'flex';
    const icon = phoneFeedback.querySelector('.phone-feedback-icon');
    const titleEl = phoneFeedback.querySelector('.phone-feedback-title');
    const descEl = phoneFeedback.querySelector('.phone-feedback-desc');

    if (type === 'success') {
      icon.textContent = '🛡️';
      icon.style.textShadow = 'var(--green-glow)';
      titleEl.style.color = 'var(--neon-green)';
    } else {
      icon.textContent = '🚨';
      icon.style.textShadow = 'var(--pink-glow)';
      titleEl.style.color = 'var(--neon-pink)';
    }

    titleEl.textContent = title;
    descEl.textContent = desc;
  }

  if (resetPhoneBtn) {
    resetPhoneBtn.addEventListener('click', () => {
      phoneFeedback.style.display = 'none';
      phoneDialogBox.style.display = 'none';
      callAcceptBtn.style.display = 'flex';
      callDeclineBtn.style.display = 'flex';
      callDeclineBtn.style.width = '60px';
      callDeclineBtn.style.borderRadius = '50%';
      callDeclineBtn.querySelector('.phone-label').textContent = 'Сбросить';
      callerStatus.textContent = 'Входящий вызов...';
      callerStatus.style.color = 'var(--neon-pink)';
    });
  }
});
