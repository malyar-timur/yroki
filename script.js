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


  // --- INTERACTIVE: 10-SCENARIO CHAT SIMULATOR WITH SCORE ---
  const chatMessages = document.getElementById('chat-messages');
  const chatOptionsContainer = document.getElementById('chat-options');
  const chatExplanation = document.getElementById('chat-explanation');
  const chatUsernameEl = document.querySelector('.chat-username');
  const avatarEl = document.querySelector('.avatar');
  const chatScoreEl = document.getElementById('chat-score');
  
  let currentScenarioIndex = 0;
  let totalScore = 0;

  const chatScenarios = [
    {
      id: 1,
      username: 'Robux_King_2026',
      avatarColor: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
      text: 'Привет! Ты выиграл 10 000 Robux в нашей группе! Чтобы забрать приз, просто перейди по ссылке robux-free-gift.ru и введи свой логин и пароль от аккаунта Roblox.',
      options: [
        {
          text: 'Круто! Перехожу на сайт и ввожу данные аккаунта.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Это фишинговый сайт. Как только ты введешь пароль, мошенники мгновенно угонят твой аккаунт со всеми робуксами и скинами.'
        },
        {
          text: 'А можно получить приз прямо в игре без ввода пароля?',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Мошенник продолжит манипулировать тобой, убеждая, что система требует авторизации. Пароль от аккаунта вводить нельзя нигде, кроме официального сайта или приложения.'
        },
        {
          text: 'Я не перехожу по сомнительным ссылкам и никогда не ввожу пароли на сторонних сайтах.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Запомни: никто не раздает ценные призы просто так, а требование ввести пароль на стороннем ресурсе — это обман.'
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
          points: 0,
          explanation: 'Ошибка! Отключение антивируса и запуск файлов .exe от незнакомцев — прямой путь заразить компьютер вирусом, который заблокирует все файлы или украдет пароли родителей.'
        },
        {
          text: 'А этот чит точно без вирусов? Мой антивирус ругается.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Мошенники всегда говорят, что антивирус ругается, потому что это чит. На самом деле они специально просят отключить защиту, чтобы обойти антивирус.'
        },
        {
          text: 'Я не скачиваю программы от неизвестных людей и не собираюсь отключать антивирус.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Файлы с расширениями .exe, .scr, .bat или .zip от незнакомцев несут прямую угрозу системе. Никогда не отключай антивирус по чьей-то просьбе.'
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
          text: 'Вот мой логин и пароль, только быстрее.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Как только ты передашь пароль, мошенник сменит его, привяжет свою почту, и ты навсегда потеряешь свой аккаунт и всех накопленных питомцев.'
        },
        {
          text: 'Я могу передать тебе питомца через обычный обмен в игре, чтобы ты прокачал?',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Если ты отдашь питомца через обычный трейд, мошенник просто выйдет из игры и заберет твоего питомца. Трейд должен быть только взаимным!'
        },
        {
          text: 'Я никогда и никому не даю данные своего аккаунта. Безопасность важнее.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Пароль — это твоя личная тайна. Ни один честный игрок, администратор или разработчик игры никогда не попросит твой пароль.'
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
          points: 0,
          explanation: 'Ошибка! Отправка фотографий банковских карт с двух сторон позволяет мошенникам списать абсолютно все деньги с карты родителей!'
        },
        {
          text: 'А можно я отправлю только лицевую сторону карты?',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Мошенники будут давить на тебя и просить показать и обратную сторону с секретным кодом CVC. Ни в коем случае не трогай карты родителей.'
        },
        {
          text: 'Я не трогаю карты родителей и сообщу им об этом подозрительном сообщении.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Данные карт родителей — это строго конфиденциальная информация. Передавать её в интернет запрещено.'
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
          points: 0,
          explanation: 'Ошибка! Никогда не соглашайся на встречи в реальном мире с людьми из интернета. За профилем друга-геймера может скрываться опасный преступник!'
        },
        {
          text: 'Я приду, но возьму с собой своего младшего брата.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Идти на встречу с неизвестными без ведома родителей категорически запрещено!'
        },
        {
          text: 'Я не встречаюсь с незнакомцами из сети и не сообщаю свое местоположение.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Твоя личная безопасность превыше всего! Если кто-то зовет тебя на встречу в реале, сразу расскажи родителям или учителю.'
        }
      ]
    },
    {
      id: 6,
      username: 'Gamer_Friend_32',
      avatarColor: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      text: 'Привет! Напиши свой номер мобильного телефона, давай созвонимся прямо сейчас и поболтаем голосом во время игры!',
      options: [
        {
          text: 'Конечно, запиши мой номер: 8-999-123-45-67.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Передавать личный номер телефона незнакомцам нельзя. Они могут использовать его для спама, звонков с угрозами или взлома аккаунтов.'
        },
        {
          text: 'А ты напиши свой сначала, а я подумаю.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Не стоит торговаться или продолжать диалог с требованием личных контактов. Сразу откажись.'
        },
        {
          text: 'Я не делюсь своим номером телефона с людьми из интернета.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Личный номер телефона относится к твоим персональным данным, береги свою приватность.'
        }
      ]
    },
    {
      id: 7,
      username: 'Anime_Fan_Katya',
      avatarColor: 'linear-gradient(135deg, #a855f7, #6366f1)',
      text: 'Слушай, тут общаться в игровом чате неудобно. Дай свой юзернейм в Телеграме, продолжим переписку там, ладно?',
      options: [
        {
          text: 'Да, конечно, мой юзернейм в Телеграме: @my_username.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Переход в личные мессенджеры вроде Telegram открывает доступ к твоему профилю, номеру телефона и может привести к спаму или нежелательному общению.'
        },
        {
          text: 'Хорошо, только не пиши мне слишком часто.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Это уловка, чтобы увести тебя на платформу, где нет игровой модерации и безопасности.'
        },
        {
          text: 'Давай останемся в чате игры, мне не разрешают давать контакты мессенджеров.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Игровые чаты модерируются, а личные мессенджеры должны быть скрыты от посторонних.'
        }
      ]
    },
    {
      id: 8,
      username: 'Dev_Server_Helper',
      avatarColor: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      text: 'Я настраиваю свой приватный сервер для нашей любимой игры. Скажи свой MAC-адрес устройства или IP-адрес, я добавлю тебя в белый список!',
      options: [
        {
          text: 'Да, секунду, сейчас посмотрю в настройках компьютера и пришлю.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! IP-адрес и MAC-адрес позволяют злоумышленникам совершить сетевую атаку (DDoS) на твое устройство или узнать твое местоположение.'
        },
        {
          text: 'Я не знаю, как их посмотреть, расскажи как найти?',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Мошенник воспользуется этим и пришлет опасную команду для терминала или вредоносный софт.'
        },
        {
          text: 'Я не передаю технические данные компьютера и сетевые адреса посторонним.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! MAC-адреса, IP-адреса и технические данные системы должны оставаться конфиденциальными.'
        }
      ]
    },
    {
      id: 9,
      username: 'Gift_Sender_VIP',
      avatarColor: 'linear-gradient(135deg, #10b981, #f59e0b)',
      text: 'Привет! Наша фирма рассылает бесплатные геймерские футболки и кепки. Напиши свой точный домашний адрес (город, улицу, дом, квартиру), мы отправим курьером!',
      options: [
        {
          text: 'Супер! Мой адрес: город Москва, улица Ленина, дом 5, квартира 12.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Никогда не сообщай домашний адрес незнакомцам. Это создает физическую угрозу для твоей безопасности и дома.'
        },
        {
          text: 'Я спрошу у родителей наш почтовый индекс, подожди минуту.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Как только родители узнают, они сразу поймут, что это обман. Не разглашай эти сведения.'
        },
        {
          text: 'Я не сообщаю адрес своего дома незнакомым людям в сети.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Адрес проживания — критически важные персональные данные, которые нельзя передавать в интернет посторонним.'
        }
      ]
    },
    {
      id: 10,
      username: 'Sasha_School_Boy',
      avatarColor: 'linear-gradient(135deg, #ef4444, #ec4899)',
      text: 'Привет! А ты в какой школе учишься? В какой класс ходишь и во сколько обычно возвращаешься домой после уроков? Родители до вечера работают?',
      options: [
        {
          text: 'Я в 5 классе школы 12. Возвращаюсь обычно в 14:00 один, родители на работе до 19:00.',
          type: 'danger',
          points: 0,
          explanation: 'Ошибка! Мошенники собирают сведения о твоем распорядке дня, чтобы узнать, когда ты один дома. Это крайне небезопасно!'
        },
        {
          text: 'Я учусь во вторую смену, возвращаюсь довольно поздно.',
          type: 'danger',
          points: 0,
          explanation: 'Внимание! Не отвечай на расспросы о своем распорядке дня и о том, когда взрослых нет дома.'
        },
        {
          text: 'Я не раскрываю информацию о своей школе и расписании дня посторонним людям.',
          type: 'success',
          points: 10,
          explanation: 'Правильно! Данные о месте учебы и времени, когда ты остаешься один, никогда не должны сообщаться незнакомцам.'
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

    // Update score display
    if (chatScoreEl) chatScoreEl.textContent = totalScore;

    if (currentScenarioIndex >= chatScenarios.length) {
      // Finished all scenarios
      if (chatUsernameEl) chatUsernameEl.textContent = 'Система безопасности';
      if (avatarEl) avatarEl.style.background = 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))';
      
      const finishedMsg = document.createElement('div');
      finishedMsg.className = 'message received';
      finishedMsg.innerHTML = `Поздравляем! Ты успешно прошел все 10 тренировок по кибербезопасности! Твой итоговый результат: ${totalScore} очков из 100 возможных. Ты отлично умеешь распознавать реальные угрозы в интернете!`;
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
    if (chatUsernameEl) chatUsernameEl.textContent = `${scenario.username} (Сценарий ${currentScenarioIndex + 1} из 10)`;
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
