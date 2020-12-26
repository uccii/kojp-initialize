import commonInit from '../common/init';
import faqScript from './faq-script';

faqScript();

const init = () => {
  commonInit();
};

window.addEventListener('load', init);
