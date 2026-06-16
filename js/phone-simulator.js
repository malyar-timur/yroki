document.addEventListener('DOMContentLoaded', () => {
  // --- INTERACTIVE: PHONE SIMULATOR ---
  const callDeclineBtn = document.getElementById('call-decline');
  const callAcceptBtn = document.getElementById('call-accept');
  const phoneDialogBox = document.getElementById('phone-dialog-box');
  const phoneFeedback = document.getElementById('phone-feedback');
  const resetPhoneBtn = document.getElementById('reset-phone-btn');
  const callerStatus = document.querySelector('.caller-status');
  const callerNameEl = document.querySelector('.caller-name');

  // List of 11 realistic phone scam scenarios (focusing on police/FBI/major security threats)
  const phoneScams = [
    {
      caller: 'Следователь ФСБ',
      dialog: '«Алло! Говорит старший следователь ФСБ Морозов. На ваше имя прямо сейчас оформляют крупный кредит для финансирования экстремистской деятельности! Если вы немедленно не переведете все семейные деньги на "безопасный счет", ваши родители пойдут под суд!»',
      feedbackDanger: 'Это классическая схема давления силовиков! Настоящие сотрудники ФСБ или МВД никогда не звонят в мессенджерах или по телефону с предложениями спасти деньги на "безопасных счетах".',
      feedbackSuccess: 'Верно! Вы бросили трубку и не дали мошенникам запугать себя. О таких звонках всегда нужно рассказывать взрослым.'
    },
    {
      caller: 'Департамент полиции',
      dialog: '«Здравствуйте. Капитан полиции Смирнов. Ваш близкий родственник только что совершил тяжелое ДТП с пострадавшими! Чтобы замять дело и спасти его от тюрьмы, срочно передайте 500 000 рублей курьеру, который подъедет к вашему дому!»',
      feedbackDanger: 'Не верьте! Звонки о "попавших в беду родственниках" — это старый психологический трюк. Немедленно сбросьте вызов и сами позвоните этому родственнику.',
      feedbackSuccess: 'Умный шаг! Сбросив вызов, вы сохранили хладнокровие. Мошенники давят на панику, чтобы заставить действовать необдуманно.'
    },
    {
      caller: 'Главное Управление МВД',
      dialog: '«Внимание! Вас беспокоит майор полиции Соболев. Ваш паспорт был скомпрометирован, и преступники используют ваши персональные данные. Мы высылаем спецназ к вам домой для проведения обыска, если вы прямо сейчас не продиктуете код из СМС от Госуслуг!»',
      feedbackDanger: 'Полиция никогда не требует коды из СМС и не предупреждает об обыске по телефону. Это обман для взлома Госуслуг!',
      feedbackSuccess: 'Отлично! Вы не поддались на громкие угрозы "майора полиции" и пресекли попытку завладеть вашими Госуслугами.'
    },
    {
      caller: 'Техподдержка Госуслуг',
      dialog: '«Алло! Система зафиксировала несанкционированный вход в ваш личный кабинет с территории Украины. В целях безопасности мы заблокировали профиль. Для разблокировки назовите код, который пришел на ваш номер телефона!»',
      feedbackDanger: 'Служба поддержки Госуслуг никогда не звонит сама и не запрашивает коды разблокировки. Передача кода подарит мошенникам доступ к документам.',
      feedbackSuccess: 'Правильно! Никто и никогда не должен запрашивать у вас присланные коды верификации.'
    },
    {
      caller: 'Центральный Банк России',
      dialog: '«Здравствуйте! Специалист финансового контроля Центробанка. Зафиксирована попытка списания средств с вашей карты. Мы инициировали процедуру защиты. Сообщите нам номер карты и трехзначный CVC-код на обороте!»',
      feedbackDanger: 'Центробанк не работает с физлицами и не звонит обычным гражданам. Номер карты и CVC-код — это ключи к краже всех сбережений.',
      feedbackSuccess: 'Правильное решение! Вы сохранили данные семейных карт в безопасности, сбросив подозрительный звонок.'
    },
    {
      caller: 'Следственный Комитет',
      dialog: '«Алло! Следователь Следственного комитета Васильев. Нам переданы материалы дела о госизмене из-за транзакций с вашего компьютера. Вы должны беспрекословно выполнять инструкции нашего финансового инспектора, иначе за вами выедет наряд!»',
      feedbackDanger: 'Никакие финансовые инспектора из СК РФ не звонят гражданам. Это попытка запугать уголовным преследованием и выманить деньги.',
      feedbackSuccess: 'Прекрасно! Вы распознали ложные обвинения и сбросили звонок, не вступая в опасные диалоги.'
    },
    {
      caller: 'Мобильный Оператор',
      dialog: '«Алло, привет! Это поддержка твоего мобильного оператора. У тебя заканчивается срок действия SIM-карты! Срочно назови код из СМС, который мы тебе отправили, иначе телефон заблокируется навсегда!»',
      feedbackDanger: 'У SIM-карт нет срока годности. Запрос кода из СМС нужен для переноса твоего номера на виртуальную карту мошенника.',
      feedbackSuccess: 'Точно! Вы предотвратили кражу своего номера телефона, который привязан к вашим аккаунтам.'
    },
    {
      caller: 'Роскомнадзор',
      dialog: '«Здравствуйте, инспектор связи. Мы фиксируем распространение запрещенного контента с вашего IP-адреса. Для отмены штрафа в 100 000 рублей зайдите в онлайн-банк родителей и переведите залог на указанные реквизиты!»',
      feedbackDanger: 'Роскомнадзор не расследует дела по телефону и не выписывает штрафы онлайн. Это прямой грабеж под видом ведомственных взысканий.',
      feedbackSuccess: 'Умница! Вы проигнорировали выдуманный штраф и спасли баланс банковских карт родителей.'
    },
    {
      caller: 'Служба Безопасности Банка',
      dialog: '«Срочное сообщение! С вашей карты совершается перевод на подозрительный зарубежный счет. Чтобы заблокировать операцию, скачайте программу удаленного доступа RustDesk или AnyDesk по нашей ссылке!»',
      feedbackDanger: 'Установка RustDesk или AnyDesk дает мошенникам полный контроль над телефоном. Они смогут зайти в банковские приложения и украсть всё.',
      feedbackSuccess: 'Успешно! Вы отказались ставить программы удаленного управления. Никогда не качайте приложения по указке из звонков.'
    },
    {
      caller: 'Пенсионный Фонд',
      dialog: '«Добрый день! Производится перерасчет пенсий и выплат для вашей семьи. Вам начислена компенсация в размере 25 000 рублей. Для подтверждения перевода продиктуйте данные паспорта ваших родителей!»',
      feedbackDanger: 'Паспортные данные родителей — цель черных риелторов и кредитных мошенников. Не раскрывайте их посторонним!',
      feedbackSuccess: 'Верный шаг! Вы сохранили конфиденциальность личных документов своей семьи.'
    },
    {
      caller: 'Судебный пристав',
      dialog: '«Алло! Судебный пристав Воробьев. У вашей семьи обнаружен долг по ЖКХ. Завтра мы приедем описывать имущество и технику. Чтобы отменить визит, срочно оплатите долг по ссылке, которую я прислал в СМС!»',
      feedbackDanger: 'Приставы высылают официальные бумажные уведомления и не требуют перевода денег по ссылкам в СМС. Это фишинговая платежная страница.',
      feedbackSuccess: 'Супер! Вы проигнорировали фейковую угрозу описи имущества и не перешли по вредоносной ссылке.'
    }
  ];

  let currentScam = null;
  let dialogTimeout = null;

  function selectRandomScam() {
    const randomIndex = Math.floor(Math.random() * phoneScams.length);
    currentScam = phoneScams[randomIndex];
    if (callerNameEl) {
      callerNameEl.textContent = currentScam.caller;
    }
  }

  // Choose the first random scam call
  selectRandomScam();

  if (callAcceptBtn && callDeclineBtn) {
    callAcceptBtn.addEventListener('click', () => {
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
        phoneDialogBox.innerHTML = `
          <strong style="color:var(--neon-pink);">${currentScam.caller}:</strong><br>
          ${currentScam.dialog}
        `;
      }

      // Increased timeout to 15 seconds (15000ms) so users have plenty of time to read the text
      dialogTimeout = setTimeout(() => {
        if (currentScam) {
          showPhoneFeedback(
            'Будь осторожен!', 
            currentScam.feedbackDanger,
            'danger'
          );
        }
      }, 15000);
    });

    callDeclineBtn.addEventListener('click', () => {
      // Clear timeout if user declined active call
      if (dialogTimeout) {
        clearTimeout(dialogTimeout);
        dialogTimeout = null;
      }

      if (currentScam) {
        showPhoneFeedback(
          'Правильное решение!',
          currentScam.feedbackSuccess,
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
      // Clear dialog timeout
      if (dialogTimeout) {
        clearTimeout(dialogTimeout);
        dialogTimeout = null;
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
