import commonInit from '../common/init';
import userAgent from './userAgent';
import blogScript from './blog-script';

userAgent();
blogScript();

const init = () => {
  commonInit();
};

window.addEventListener('load', init);
