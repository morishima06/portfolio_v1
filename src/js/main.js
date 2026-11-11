import '../scss/main.scss';

import { initNavigation } from './modules/navigation';
import { initContactForm } from './modules/contactForm';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
});
