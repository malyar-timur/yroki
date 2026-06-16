document.addEventListener('DOMContentLoaded', () => {
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
