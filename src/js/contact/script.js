import commonInit from '../common/init';
import contactScript from './contact-script';

contactScript();

const init = () => {
  commonInit();
};

window.addEventListener('load', init);
