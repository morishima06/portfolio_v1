export function initNavigation() {
  const floatingMenu = document.querySelector('.floating_menu');
  const navButton = document.querySelector('.nav_button');

  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');
  const line3 = document.querySelector('.line3');

  const floatingLinks = document.querySelectorAll('.floating_link');

  if (!floatingMenu || !navButton) return;

  // メニューの開閉
  const toggleMenu = () => {
    floatingMenu.classList.toggle('menu_active');

    line1?.classList.toggle('line1_active');
    line2?.classList.toggle('line2_active');
    line3?.classList.toggle('line3_active');
  };

  // メニューボタン
  navButton.addEventListener('click', toggleMenu);

  // メニュー内リンク
  floatingLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (floatingMenu.classList.contains('menu_active')) {
        toggleMenu();
      }
    });
  });
}
