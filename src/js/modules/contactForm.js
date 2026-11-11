export function initContactForm() {
  const modalSection = document.querySelector('#modal_section');
  const closeButton = document.querySelector('.close_button');
  const confirmButton = document.querySelector('.confirm_btn');
  const modalButton = document.querySelector('.modal_button');

  const nameInput = document.querySelector('#contact_name');
  const mailInput = document.querySelector('#contact_mail');
  const messageInput = document.querySelector('#contact_message');

  const errorTextarea = document.querySelector('#err_textarea');

  if (
    !modalSection ||
    !confirmButton ||
    !nameInput ||
    !mailInput ||
    !messageInput ||
    !errorTextarea
  ) {
    return;
  }

  // 入力チェック
  function checkName() {
    return validate(nameInput, 'err_name', '名前を入力してください。');
  }

  function checkMail() {
    return validate(
      mailInput,
      'err_mail',
      'メールアドレスを入力してください。'
    );
  }

  function checkMessage() {
    return validate(
      messageInput,
      'err_message',
      'メッセージ内容を入力してください。'
    );
  }

  // 共通バリデーション
  function validate(input, errorId, errorMessage) {
    document.querySelector(`#${errorId}`)?.remove();

    if (input.value.trim() === '') {
      const error = document.createElement('p');

      error.id = errorId;
      error.className = 'err_text';
      error.textContent = `＊${errorMessage}`;

      errorTextarea.appendChild(error);

      return false;
    }

    return true;
  }

  // 入力変更時・フォーカスが外れたとき
  nameInput.addEventListener('change', checkName);
  nameInput.addEventListener('blur', checkName);

  mailInput.addEventListener('change', checkMail);
  mailInput.addEventListener('blur', checkMail);

  messageInput.addEventListener('change', checkMessage);
  messageInput.addEventListener('blur', checkMessage);

  // 確認モーダルに入力内容を反映
  function displayConfirm() {
    document.querySelector('.modal_name').textContent = nameInput.value;
    document.querySelector('.modal_email').textContent = mailInput.value;
    document.querySelector('.modal_message').textContent = messageInput.value;

    modalSection.style.display = 'block';
  }

  // 確認ボタン
  confirmButton.addEventListener('click', () => {
    errorTextarea.innerHTML = '';

    const isNameValid = checkName();
    const isMailValid = checkMail();
    const isMessageValid = checkMessage();

    if (!isNameValid || !isMailValid || !isMessageValid) {
      alert('入力に問題があります');
      return;
    }

    displayConfirm();
  });

  // モーダルを閉じる
  closeButton?.addEventListener('click', () => {
    modalSection.style.display = 'none';
  });

  // メール送信
  modalButton?.addEventListener('click', async (event) => {
    event.preventDefault();

    // 連続送信防止
    if (modalButton.disabled) return;

    modalButton.disabled = true;

    try {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      )?.content;

      if (!csrfToken) {
        throw new Error('CSRFトークンを取得できません');
      }

      const response = await fetch('/post_mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: mailInput.value,
          message: messageInput.value,
        }),
      });

      if (!response.ok) {
        throw new Error('メール送信に失敗しました');
      }

      // 送信成功
      const contact = document.querySelector('#contact');

      if (!contact) {
        throw new Error('問い合わせフォームが見つかりません');
      }

      contact.innerHTML = `
        <div id="contact_success">
          <div id="success_box">
            <p class="main_message">送信完了しました。</p>
            <p class="sub_message">お問合せありがとうございます。</p>
            <p class="sub_message">確認として自動メールをお送りさせていただいております。</p>
            <p class="sub_message">お問合せ内容につきましては、近日中にご返信させていただきます。</p>
          </div>
        </div>
      `;

      modalSection.style.display = 'none';
    } catch (error) {
      alert('メールの送信に失敗しました');
      console.error(error);
    } finally {
      modalButton.disabled = false;
    }
  });
}
