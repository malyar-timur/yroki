document.addEventListener('DOMContentLoaded', () => {
  // --- INTERACTIVE: PHONE SIMULATOR ---
  const callDeclineBtn = document.getElementById('call-decline');
  const callAcceptBtn = document.getElementById('call-accept');
  const phoneDialogBox = document.getElementById('phone-dialog-box');
  const phoneFeedback = document.getElementById('phone-feedback');
  const resetPhoneBtn = document.getElementById('reset-phone-btn');
  const callerStatus = document.querySelector('.caller-status');
  const callerNameEl = document.querySelector('.caller-name');
  const phoneOptionsWrapper = document.getElementById('phone-options-wrapper');
  const phoneOptionsList = document.getElementById('phone-options-list');

  // List of 11 realistic phone scam scenarios with pre-generated MP3 neural voice files and multiple choices
  const phoneScams = [
    {
      caller: 'Следователь ФСБ',
      audio: 'audio/fsb.mp3',
      options: [
        { text: '«Я сейчас переведу все сбережения на безопасный счет»', type: 'danger', explanation: 'Это классическая схема давления силовиков! Настоящие сотрудники ФСБ или МВД никогда не звонят по телефону с предложениями спасти деньги на "безопасных счетах".' },
        { text: '«Назовите ваши полные реквизиты, я переведу деньги»', type: 'danger', explanation: 'Ошибка! Предоставление любых реквизитов преступникам приведет к потере денег вашей семьи.' },
        { text: '«Давайте я продиктую данные паспорта мамы»', type: 'danger', explanation: 'Внимание! Личные документы пригодятся мошенникам для оформления кредитов или незаконных махинаций.' },
        { text: '«Какой код из СМС вам продиктовать?»', type: 'danger', explanation: 'Ни в коем случае! Код из СМС — это цифровой ключ доступа. Разглашать его третьим лицам категорически запрещено.' },
        { text: 'Сбросить вызов и рассказать родителям', type: 'success', explanation: 'Правильно! Лучшая реакция на звонки якобы "силовиков" — немедленный сброс вызова. Полиция не решает вопросы по телефону.' }
      ]
    },
    {
      caller: 'Департамент полиции',
      audio: 'audio/police.mp3',
      options: [
        { text: '«Куда привезти деньги? Я сейчас соберу все сбережения»', type: 'danger', explanation: 'Никогда не верьте звонкам о "попавших в беду родственниках". Это уловка преступников для кражи ваших наличных.' },
        { text: '«Могу я перевести деньги вам на карту онлайн?»', type: 'danger', explanation: 'Ошибка! Переводы незнакомцам онлайн — это финансирование преступников, вернуть деньги назад будет невозможно.' },
        { text: '«Я скину вам номер телефона мамы, позвоните ей»', type: 'danger', explanation: 'Внимание! Мошенники просто переключатся на маму и будут запугивать ее. Не давайте им контакты близких.' },
        { text: '«Я выхожу к курьеру с деньгами»', type: 'danger', explanation: 'Критическая ошибка! Встреча с курьерами мошенников ставит под угрозу вашу физическую безопасность.' },
        { text: 'Положить трубку, перезвонить родителям и проверить информацию', type: 'success', explanation: 'Правильно! Не поддавайтесь панике, которую сеет звонящий. Сбросьте вызов и проверьте информацию напрямую у родных.' }
      ]
    },
    {
      caller: 'Главное Управление МВД',
      audio: 'audio/mvd.mp3',
      options: [
        { text: '«Хорошо, код из СМС от Госуслуг: 9982»', type: 'danger', explanation: 'Ошибка! Выдав СМС-код мошенникам, вы дадите им полный доступ к личному кабинету Госуслуг и всем документам.' },
        { text: '«Пожалуйста, не отправляйте спецназ, я продиктую все пароли»', type: 'danger', explanation: 'Не бойтесь пустых угроз! Полиция не высылает спецназ по телефону. Это запугивание ради паролей.' },
        { text: '«Мой паспорт лежит на полке, сейчас продиктую серию и номер»', type: 'danger', explanation: 'Внимание! Персональные паспортные данные категорически запрещено сообщать неизвестным лицам.' },
        { text: '«Я открою дверь полиции, скажите куда переводить штраф»', type: 'danger', explanation: 'Ошибка! Полиция не выписывает штрафы по телефону с требованием мгновенных переводов.' },
        { text: 'Сбросить звонок, так как полиция не требует по телефону СМС-коды', type: 'success', explanation: 'Правильно! Настоящие правоохранительные органы никогда не запрашивают конфиденциальные коды по телефону.' }
      ]
    },
    {
      caller: 'Техподдержка Госуслуг',
      audio: 'audio/gosuslugi.mp3',
      options: [
        { text: '«Код разблокировки кабинета: 1234»', type: 'danger', explanation: 'Ошибка! Служба поддержки портала Госуслуг никогда не звонит сама и не запрашивает коды доступа.' },
        { text: '«Я продиктую код, только не удаляйте мой аккаунт»', type: 'danger', explanation: 'Не верьте угрозам удаления! Мошенники манипулируют вашим страхом, чтобы проникнуть в вашу учетную запись.' },
        { text: '«Давайте я скажу вам свой логин и пароль от Госуслуг»', type: 'danger', explanation: 'Внимание! Логин и пароль — секретная информация, ее нельзя разглашать посторонним ни при каких условиях.' },
        { text: '«Могу я прислать вам скриншот с кодом в Телеграм?»', type: 'danger', explanation: 'Ошибка! Переход в мессенджеры — излюбленный прием мошенников для обхода систем безопасности.' },
        { text: 'Повесить трубку, так как поддержка не звонит с личных номеров', type: 'success', explanation: 'Правильно! Государственные сервисы не звонят гражданам на личные номера с просьбой сказать код.' }
      ]
    },
    {
      caller: 'Центральный Банк России',
      audio: 'audio/bank.mp3',
      options: [
        { text: '«Вот номер карты: 4276... и CVC-код на обороте: 382»', type: 'danger', explanation: 'Критическая ошибка! Трехзначный код CVC на обороте карты и номер карты — конфиденциальные данные. Их разглашение обнулит счета.' },
        { text: '«Я скажу вам CVC-код, но не блокируйте карту»', type: 'danger', explanation: 'Внимание! Обещания мошенников ложны. Получив CVC-код, они снимут все деньги и скроются.' },
        { text: '«Спишите комиссию, но сохраните баланс»', type: 'danger', explanation: 'Ошибка! Никакой "защитной процедуры" не существует, это обман с целью украсть деньги.' },
        { text: '«Я отправлю фото карты с двух сторон»', type: 'danger', explanation: 'Ошибка! Двусторонняя фотография карты открывает мошенникам доступ ко всем покупкам в сети за ваш счет.' },
        { text: 'Прекратить разговор и перезвонить на горячую линию своего банка', type: 'success', explanation: 'Правильно! Центробанк не работает с физическими лицами. Проверять карту нужно только по номеру с ее оборота.' }
      ]
    },
    {
      caller: 'Следственный Комитет',
      audio: 'audio/sk.mp3',
      options: [
        { text: '«Я готов выполнять все инструкции финансового инспектора»', type: 'danger', explanation: 'Ошибка! Выполняя инструкции "инспектора", вы переведете все семейные деньги на счета преступников.' },
        { text: '«Куда перевести деньги, чтобы закрыть дело?»', type: 'danger', explanation: 'Внимание! Настоящие следователи не закрывают дела за переводы денег на телефонные реквизиты.' },
        { text: '«Я сейчас продиктую все коды подтверждения»', type: 'danger', explanation: 'Ошибка! Передача кодов подтверждения банковских операций приведет к краже накоплений.' },
        { text: '«С кем мне связаться, чтобы доказать невиновность?»', type: 'danger', explanation: 'Не продолжайте диалог с мошенником. Любое общение используется ими для поиска рычагов давления.' },
        { text: 'Положить трубку. Следователи не ведут дела по телефону', type: 'success', explanation: 'Правильно! Официальные следственные действия осуществляются только лично под протокол, а не по телефону.' }
      ]
    },
    {
      caller: 'Мобильный Оператор',
      audio: 'audio/operator.mp3',
      options: [
        { text: '«Код подтверждения из СМС: 5678»', type: 'danger', explanation: 'Ошибка! Код из СМС от оператора используется для кражи или перевыпуска вашей SIM-карты.' },
        { text: '«Продлите SIM-карту, вот код...»', type: 'danger', explanation: 'Внимание! Вы раскрываете секретные проверочные коды. SIM-карты не имеют срока действия.' },
        { text: '«Я продиктую паспортные данные, чтобы не блокировали симку»', type: 'danger', explanation: 'Ошибка! Передача паспортных данных посторонним помогает им переоформить ваш номер на себя.' },
        { text: '«Я скажу вам номер договора на услуги связи»', type: 'danger', explanation: 'Ошибка! Номер договора облегчает мошенникам социальную инженерию против вас.' },
        { text: 'Сбросить вызов. У SIM-карт нет срока действия', type: 'success', explanation: 'Правильно! SIM-карты бессрочны, а история про "окончание срока действия" — обман для перехвата вашего номера.' }
      ]
    },
    {
      caller: 'Роскомнадзор',
      audio: 'audio/rkn.mp3',
      options: [
        { text: '«Я сейчас зайду в онлайн-банк родителей и переведу 100 000 рублей»', type: 'danger', explanation: 'Критическая ошибка! Вы переведете семейные сбережения преступникам из-за вымышленного штрафа.' },
        { text: '«Дайте реквизиты, я оплачу штраф со своей детской карты»', type: 'danger', explanation: 'Ошибка! Никакой "залоговой оплаты" не существует, ведомства не собирают штрафы по звонкам.' },
        { text: '«Я отправлю вам СМС-код для оплаты»', type: 'danger', explanation: 'Внимание! Коды подтверждения используются мошенниками для списания средств, а не для оплаты штрафов.' },
        { text: '«Пожалуйста, не штрафуйте меня, я скажу пароли»', type: 'danger', explanation: 'Не поддавайтесь страху! Никакие пароли не помогут отменить мифический штраф, они лишь дадут доступ к вашим аккаунтам.' },
        { text: 'Положить трубку. Роскомнадзор не штрафует граждан по телефону', type: 'success', explanation: 'Правильно! Государственные надзорные органы не звонят частным лицам с требованием оплатить штраф.' }
      ]
    },
    {
      caller: 'Служба Безопасности Банка',
      audio: 'audio/security.mp3',
      options: [
        { text: '«Я скачиваю RustDesk и AnyDesk по вашей ссылке»', type: 'danger', explanation: 'Критическая ошибка! Установка приложений удаленного доступа RustDesk/AnyDesk дает мошенникам полный контроль над телефоном.' },
        { text: '«Я установил программу, сообщаю ID доступа»', type: 'danger', explanation: 'Ошибка! Сообщив ID доступа, вы разрешите злоумышленникам управлять вашим экраном и онлайн-банком.' },
        { text: '«Я зайду в мобильный банк с установленной программой»', type: 'danger', explanation: 'Внимание! Как только вы войдете в банк при активной трансляции экрана, мошенники скопируют ваши пароли.' },
        { text: '«Я дам вам доступ к экрану телефона»', type: 'danger', explanation: 'Ошибка! Демонстрация экрана посторонним лицам раскрывает пароли от всех банковских приложений.' },
        { text: 'Сбросить звонок и не устанавливать подозрительное ПО', type: 'success', explanation: 'Правильно! Банки никогда не просят устанавливать программы удаленного управления. Это признак обмана.' }
      ]
    },
    {
      caller: 'Пенсионный Фонд',
      audio: 'audio/pension.mp3',
      options: [
        { text: '«Вот паспорт мамы: серия 4512, номер...»', type: 'danger', explanation: 'Ошибка! Раскрытие паспортных данных близких позволяет мошенникам проводить махинации с недвижимостью или микрозаймами.' },
        { text: '«Я продиктую СНиЛС и паспорт папы»', type: 'danger', explanation: 'Внимание! СНиЛС и паспортные данные — строго конфиденциальная информация, не разглашайте ее.' },
        { text: '«Куда прислать фото документов?»', type: 'danger', explanation: 'Ошибка! Фотографии паспортов, отправленные в мессенджеры, станут инструментом шантажа.' },
        { text: '«Я продиктую реквизиты карты для начисления 25 000 рублей»', type: 'danger', explanation: 'Ошибка! Реквизиты карты в сочетании с СМС-кодом позволят списать ваши деньги, а не начислить выплату.' },
        { text: 'Сбросить звонок. Данные родителей нельзя сообщать посторонним', type: 'success', explanation: 'Правильно! Любые государственные выплаты оформляются через официальные ведомства или Госуслуги, а не по телефону.' }
      ]
    },
    {
      caller: 'Судебный пристав',
      audio: 'audio/pristav.mp3',
      options: [
        { text: '«Я перехожу по ссылке из СМС и ввожу данные карты для оплаты»', type: 'danger', explanation: 'Ошибка! Переход по ссылке из СМС приведет на фишинговую страницу оплаты, где мошенники украдут все деньги.' },
        { text: '«Скажите реквизиты, я оплачу долг родителей»', type: 'danger', explanation: 'Внимание! Не пытайтесь оплатить сомнительные задолженности по устному требованию из звонка.' },
        { text: '«Я продиктую код из СМС для подтверждения платежа»', type: 'danger', explanation: 'Ошибка! СМС-код подтвердит списание денег на счет мошенников. Не сообщайте его.' },
        { text: '«Пожалуйста, не забирайте компьютер, я все оплачу»', type: 'danger', explanation: 'Не поддавайтесь на запугивание. Судебные приставы действуют только на основании судебных решений и уведомлений.' },
        { text: 'Не переходить по ссылкам и повесить трубку', type: 'success', explanation: 'Правильно! Наличие долгов проверяется исключительно на официальном сайте ФССП или через Госуслуги.' }
      ]
    }
  ];

  let currentScam = null;
  let dialogTimeout = null;
  let activeAudio = null;
  let hasPickedUp = false;

  function playAudio(src) {
    stopAudio();
    activeAudio = new Audio(src);
    activeAudio.play().catch(err => {
      console.log('Audio playback blocked or failed:', err);
      // Fallback in case audio is blocked or browser does not play: trigger options after 8 seconds anyway
      triggerOptionsFallback();
    });

    // Listen for audio ended event to show options
    activeAudio.addEventListener('ended', () => {
      // Pause of 1.5s (1500ms) after the audio ends, then show options below the phone
      dialogTimeout = setTimeout(() => {
        showPhoneOptions();
      }, 1500);
    });
  }

  function stopAudio() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = null;
    }
  }

  function triggerOptionsFallback() {
    if (dialogTimeout) clearTimeout(dialogTimeout);
    dialogTimeout = setTimeout(() => {
      showPhoneOptions();
    }, 12000); // Fail-safe timer in case audio is blocked
  }

  function selectRandomScam() {
    const randomIndex = Math.floor(Math.random() * phoneScams.length);
    currentScam = phoneScams[randomIndex];
    if (callerNameEl) {
      callerNameEl.textContent = currentScam.caller;
    }
  }

  function showPhoneOptions() {
    if (!currentScam || !phoneOptionsWrapper || !phoneOptionsList) return;
    
    // Clear list
    phoneOptionsList.innerHTML = '';
    
    // Shuffle options to confuse
    const shuffled = [...currentScam.options].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'phone-option-btn';
      btn.textContent = opt.text;
      
      btn.addEventListener('click', () => {
        // Stop audio if playing
        stopAudio();
        
        // Hide options container
        if (phoneOptionsWrapper) phoneOptionsWrapper.style.display = 'none';
        
        // Show result feedback based on answer type
        if (opt.type === 'success') {
          showPhoneFeedback('Правильное решение!', opt.explanation, 'success');
        } else {
          showPhoneFeedback('Будь осторожен!', opt.explanation, 'danger');
        }
      });
      
      phoneOptionsList.appendChild(btn);
    });
    
    phoneOptionsWrapper.style.display = 'block';
  }

  // Choose the first random scam call
  selectRandomScam();

  if (callAcceptBtn && callDeclineBtn) {
    callAcceptBtn.addEventListener('click', () => {
      hasPickedUp = true;
      if (callerStatus) {
        callerStatus.textContent = 'Разговор...';
        callerStatus.style.color = 'var(--neon-green)';
      }
      callAcceptBtn.style.display = 'none';
      callDeclineBtn.style.width = '120px';
      callDeclineBtn.style.borderRadius = '30px';
      const label = callDeclineBtn.parentElement.querySelector('.phone-label');
      if (label) label.textContent = 'Положить';
      
      if (phoneDialogBox && currentScam) {
        phoneDialogBox.style.display = 'block';
        // Hide actual dialogue text on phone screen. Instead, display pulsing wave visualizer
        phoneDialogBox.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; margin-top:2rem; animation:fadeIn 0.3s ease;">
            <div class="pulsing-soundwave" style="display:flex; gap:6px; align-items:center; height:50px; margin-bottom:1.5rem;">
              <div style="width:4px; height:20px; background:var(--neon-pink); border-radius:2px; animation:wave 1s ease-in-out infinite alternate;"></div>
              <div style="width:4px; height:40px; background:var(--neon-pink); border-radius:2px; animation:wave 1.2s ease-in-out infinite alternate 0.2s;"></div>
              <div style="width:4px; height:15px; background:var(--neon-pink); border-radius:2px; animation:wave 0.8s ease-in-out infinite alternate 0.4s;"></div>
              <div style="width:4px; height:45px; background:var(--neon-pink); border-radius:2px; animation:wave 1.4s ease-in-out infinite alternate 0.1s;"></div>
              <div style="width:4px; height:25px; background:var(--neon-pink); border-radius:2px; animation:wave 1s ease-in-out infinite alternate 0.3s;"></div>
            </div>
            <span style="font-size:0.85rem; color:var(--text-muted); letter-spacing:1px; animation:pulse 2s infinite;">ВНИМАТЕЛЬНО СЛУШАЙТЕ СОБЕСЕДНИКА...</span>
          </div>
        `;
        
        // Play the pre-generated MP3 neural voice file
        playAudio(currentScam.audio);
      }
    });

    callDeclineBtn.addEventListener('click', () => {
      // Stop audio playback
      stopAudio();

      // Clear timers
      if (dialogTimeout) {
        clearTimeout(dialogTimeout);
        dialogTimeout = null;
      }
      
      // Hide options container
      if (phoneOptionsWrapper) phoneOptionsWrapper.style.display = 'none';

      // If user hung up during active call, it is always a correct action!
      if (hasPickedUp) {
        showPhoneFeedback(
          'Правильное решение!',
          'Ты сбросил вызов во время разговора. Общение с мошенниками бесполезно и опасно. Сбросив вызов, ты поступил верно!',
          'success'
        );
      } else {
        // User declined ringing call
        showPhoneFeedback(
          'Правильное решение!',
          'Ты сбросил звонок с незнакомого номера. Если звонят неизвестные люди и пугают блокировками, выигрышами или бедой с близкими — сразу сбрасывай звонок. Никогда не разговаривай с ними!',
          'success'
        );
      }
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
      hasPickedUp = false;
      // Stop active audio
      stopAudio();

      // Clear dialog timeout
      if (dialogTimeout) {
        clearTimeout(dialogTimeout);
        dialogTimeout = null;
      }

      // Hide options container
      if (phoneOptionsWrapper) {
        phoneOptionsWrapper.style.display = 'none';
        phoneOptionsList.innerHTML = '';
      }

      // Choose a new random scam
      selectRandomScam();

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
