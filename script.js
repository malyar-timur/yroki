document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- SLIDER LOGIC ---
  const slides = document.querySelectorAll('.slide');
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

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update Progress Bar
    const progress = totalSlides > 1 ? (currentSlideIndex / (totalSlides - 1)) * 100 : 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Update Counter
    if (counterCurrent) counterCurrent.textContent = currentSlideIndex + 1;
    
    // Refresh icons inside active slides
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    } else if (e.key === 'ArrowRight' && currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  });

  updateSlides();


  // --- INTERACTIVE: MULTI-SCENARIO CHAT SIMULATOR ---
  const chatMessages = document.getElementById('chat-messages');
  const chatOptionsContainer = document.getElementById('chat-options');
  const chatExplanation = document.getElementById('chat-explanation');
  const chatUsernameEl = document.querySelector('.chat-username');
  const avatarEl = document.querySelector('.avatar');
  
  let currentScenarioIndex = 0;

  const chatScenarios = [
    {
      id: 1,
      username: 'Robux_King_2026',
      avatarColor: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
      text: 'Привет! 🎉 Ты выиграл 10 000 Robux в нашей группе! Чтобы забрать приз, просто перейди по ссылке robux-free-gift.ru и введи свой логин и пароль от аккаунта Roblox.',
      options: [
        {
          text: 'Круто! Перехожу на сайт и ввожу данные аккаунта.',
          type: 'danger',
          explanation: '❌ Ошибка! Это фишинговый сайт. Как только ты введешь пароль, мошенники мгновенно угонят твой аккаунт со всеми робуксами и скинами.'
        },
        {
          text: 'А можно получить приз прямо в игре без ввода пароля?',
          type: 'danger',
          explanation: '⚠️ Осторожно! Мошенник продолжит манипулировать тобой, убеждая, что «система требует авторизации». Пароль от аккаунта вводить нельзя нигде, кроме официального сайта/приложения.'
        },
        {
          text: 'Я не перехожу по сомнительным ссылкам и никогда не ввожу пароли на сторонних сайтах.',
          type: 'success',
          explanation: '✅ Абсолютно верно! Запомни: никто не раздает ценные призы просто так, а требование ввести пароль на стороннем ресурсе — 100% обман.'
        }
      ]
    },
    {
      id: 2,
      username: 'Pro_Cheater_YT',
      avatarColor: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
      text: 'Эй! Лови секретный чит на бессмертие в Майнкрафте! Скачай файл minecraft_super_cheats.exe, отключи свой антивирус и запусти его.',
      options: [
        {
          text: 'Ух ты, спасибо! Отключаю антивирус и запускаю файл.',
          type: 'danger',
          explanation: '❌ Опасность! Отключение антивируса и запуск файлов .exe от незнакомцев — прямой путь заразить компьютер вирусом, который заблокирует все файлы или украдет пароли родителей.'
        },
        {
          text: 'А этот чит точно без вирусов? Мой антивирус ругается.',
          type: 'danger',
          explanation: '⚠️ Осторожно! Мошенники всегда говорят: «Антивирус ругается, потому что это чит». На самом деле они специально просят отключить защиту, чтобы обойти антивирус.'
        },
        {
          text: 'Я не скачиваю программы от неизвестных людей и не собираюсь отключать антивирус.',
          type: 'success',
          explanation: '✅ Отличная бдительность! Файлы с расширениями .exe, .scr, .bat или .zip от незнакомцев несут прямую угрозу системе. Никогда не отключай антивирус по чьей-то просьбе.'
        }
      ]
    },
    {
      id: 3,
      username: 'AdoptMe_Trader_Gamer',
      avatarColor: 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))',
      text: 'Привет! Я могу прокачать твоего обычного питомца в Adopt Me и сделать его Неоновым Легендарным! Дай мне логин и пароль от аккаунта на 5 минут, я всё быстро сделаю.',
      options: [
        {
          text: 'Вау, давай! Вот мой логин и пароль, только быстрее.',
          type: 'danger',
          explanation: '❌ Ошибка! Как только ты передашь пароль, мошенник сменит его, привяжет свою почту, и ты навсегда потеряешь свой аккаунт и всех накопленных питомцев.'
        },
        {
          text: 'Я могу передать тебе питомца через обычный обмен (trade) в игре, чтобы ты прокачал?',
          type: 'danger',
          explanation: '⚠️ Осторожно! Если ты отдашь питомца через обычный трейд, мошенник просто выйдет из игры и заберет твоего питомца. Трейд должен быть только взаимным!'
        },
        {
          text: 'Я никогда и никому не даю данные своего аккаунта. Безопасность важнее.',
          type: 'success',
          explanation: '✅ Умница! Пароль — это твоя личная тайна. Ни один честный игрок, администратор или разработчик игры никогда не попросит твой пароль.'
        }
      ]
    },
    {
      id: 4,
      username: 'Brawl_Stars_Gems_Bot',
      avatarColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      text: 'Поздравляем! Твой аккаунт Brawl Stars выбран для начисления 2000 бесплатных гемов. Чтобы активировать платеж, сфотографируй банковскую карту родителей с двух сторон и пришли сюда.',
      options: [
        {
          text: 'Сейчас найду мамину карту и сфотографирую.',
          type: 'danger',
          explanation: '❌ Огромная ошибка! Отправка фотографий банковских карт с двух сторон позволяет мошенникам списать абсолютно все деньги с карты родителей!'
        },
        {
          text: 'А можно я отправлю только лицевую сторону карты?',
          type: 'danger',
          explanation: '⚠️ Крайне опасно! Мошенники будут давить на тебя и просить показать и обратную сторону (секретный код CVC). Ни в коем случае не трогай карты родителей.'
        },
        {
          text: 'Я не трогаю карты родителей и сообщу им об этом подозрительном сообщении.',
          type: 'success',
          explanation: '✅ Ты спас семейный бюджет! Данные карт родителей — это строго конфиденциальная информация. Передавать её в интернет запрещено.'
        }
      ]
    },
    {
      id: 5,
      username: 'Stranger_Games_Net',
      avatarColor: 'linear-gradient(135deg, #10b981, #3b82f6)',
      text: 'Слушай, ты так круто играешь! Я тоже живу в твоем городе. Давай встретимся сегодня вечером в 21:00 около заброшенного здания за ТЦ? Я подарю тебе крутую геймерскую мышку.',
      options: [
        {
          text: 'Отлично, приду! Геймерская мышка — это супер.',
          type: 'danger',
          explanation: '❌ Смертельно опасно! Никогда не соглашайся на встречи в реальном мире с людьми из интернета. За профилем «друга-геймера» может скрываться опасный преступник!'
        },
        {
          text: 'Я приду, но возьму с собой своего младшего брата.',
          type: 'danger',
          explanation: '⚠️ Это всё еще опасно! Идти на встречу с неизвестными без ведома родителей категорически запрещено!'
        },
        {
          text: 'Я не встречаюсь с незнакомцами из сети и не сообщаю свое местоположение.',
          type: 'success',
          explanation: '✅ Твоя личная безопасность превыше всего! Если кто-то зовет тебя на встречу в реале, сразу расскажи родителям или учителю.'
        }
      ]
    }
  ];

  function renderScenario() {
    if (!chatMessages || !chatOptionsContainer) return;
    
    // Clear elements
    chatMessages.innerHTML = '';
    if (chatExplanation) chatExplanation.style.display = 'none';
    chatOptionsContainer.innerHTML = '';

    if (currentScenarioIndex >= chatScenarios.length) {
      // Finished all scenarios
      if (chatUsernameEl) chatUsernameEl.textContent = 'Система безопасности';
      if (avatarEl) avatarEl.style.background = 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))';
      
      const finishedMsg = document.createElement('div');
      finishedMsg.className = 'message received';
      finishedMsg.innerHTML = '🏆 <strong>Поздравляем!</strong> Ты успешно прошел все 5 тренировок по кибербезопасности и научился распознавать реальные угрозы в интернете!';
      chatMessages.appendChild(finishedMsg);
      
      const restartBtn = document.createElement('button');
      restartBtn.className = 'chat-option-btn';
      restartBtn.style.textAlign = 'center';
      restartBtn.style.borderColor = 'var(--neon-green)';
      restartBtn.textContent = '🔄 Начать тренировку заново';
      restartBtn.addEventListener('click', () => {
        currentScenarioIndex = 0;
        renderScenario();
      });
      chatOptionsContainer.appendChild(restartBtn);
      return;
    }

    const scenario = chatScenarios[currentScenarioIndex];
    
    // Update headers
    if (chatUsernameEl) chatUsernameEl.textContent = `${scenario.username} (Сценарий ${currentScenarioIndex + 1} из 5)`;
    if (avatarEl) avatarEl.style.background = scenario.avatarColor;

    // Render original incoming message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message received';
    msgDiv.textContent = scenario.text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Render choice options
    scenario.options.forEach(opt => {
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
          nextBtn.textContent = currentScenarioIndex < chatScenarios.length - 1 ? '➡️ Следующий сценарий' : '🏁 Завершить тренировку';
          
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


  // --- INTERACTIVE: PHONE SIMULATOR ---
  const callDeclineBtn = document.getElementById('call-decline');
  const callAcceptBtn = document.getElementById('call-accept');
  const phoneDialogBox = document.getElementById('phone-dialog-box');
  const phoneFeedback = document.getElementById('phone-feedback');
  const resetPhoneBtn = document.getElementById('reset-phone-btn');
  const callerStatus = document.querySelector('.caller-status');

  if (callAcceptBtn && callDeclineBtn) {
    callAcceptBtn.addEventListener('click', () => {
      if (callerStatus) {
        callerStatus.textContent = '00:04 • Разговор...';
        callerStatus.style.color = 'var(--neon-green)';
      }
      callAcceptBtn.style.display = 'none';
      callDeclineBtn.style.width = '120px';
      callDeclineBtn.style.borderRadius = '30px';
      const label = callDeclineBtn.parentElement.querySelector('.phone-label');
      if (label) label.textContent = 'Положить';
      
      if (phoneDialogBox) {
        phoneDialogBox.style.display = 'block';
        phoneDialogBox.innerHTML = `
          <strong style="color:var(--neon-pink);">Голос в трубке:</strong><br>
          «Алло, привет! Это из службы поддержки твоего мобильного оператора. У тебя заканчивается срок действия SIM-карты! Срочно назови код из СМС, который мы тебе отправили, иначе твой телефон заблокируется навсегда!»
        `;
      }

      setTimeout(() => {
        showPhoneFeedback(
          'Будь осторожен!', 
          'Они просят код из СМС! Если ты продиктуешь его, они украдут твои личные данные. Самый лучший выбор — повесить трубку и перезвонить родителям или по официальному номеру поддержки с сайта оператора!',
          'danger'
        );
      }, 5000);
    });

    callDeclineBtn.addEventListener('click', () => {
      showPhoneFeedback(
        'Правильное решение!',
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
      icon.innerHTML = '<i data-lucide="shield-check" style="width: 3.5rem; height: 3.5rem; color: var(--neon-green);"></i>';
      icon.style.textShadow = 'var(--green-glow)';
      titleEl.style.color = 'var(--neon-green)';
    } else {
      icon.innerHTML = '<i data-lucide="alert-triangle" style="width: 3.5rem; height: 3.5rem; color: var(--neon-pink);"></i>';
      icon.style.textShadow = 'var(--pink-glow)';
      titleEl.style.color = 'var(--neon-pink)';
    }

    titleEl.textContent = title;
    descEl.textContent = desc;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  if (resetPhoneBtn) {
    resetPhoneBtn.addEventListener('click', () => {
      if (phoneFeedback) phoneFeedback.style.display = 'none';
      if (phoneDialogBox) phoneDialogBox.style.display = 'none';
      if (callAcceptBtn) callAcceptBtn.style.display = 'flex';
      if (callDeclineBtn) {
        callDeclineBtn.style.display = 'flex';
        callDeclineBtn.style.width = '60px';
        callDeclineBtn.style.borderRadius = '50%';
        const label = callDeclineBtn.parentElement.querySelector('.phone-label');
        if (label) label.textContent = 'Сбросить';
      }
      if (callerStatus) {
        callerStatus.textContent = 'Входящий вызов...';
        callerStatus.style.color = 'var(--neon-pink)';
      }
    });
  }
});
