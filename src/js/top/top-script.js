import $ from 'jquery';

window.jQuery = $;
require('jquery-parallax.js');

const utility = {
  toggleClickedAttr: (_e) => {
    const clickedName = 'clicked';
    if (_e.currentTarget.hasAttribute(clickedName)) {
      _e.currentTarget.removeAttribute(clickedName);
      return 'release';
    } else {
      _e.currentTarget.setAttribute(clickedName, clickedName);
      return 'clicked';
    }
  },
  addfirstClickedAttr: (_e) => {
    _e.currentTarget.setAttribute('firstClicked', 'firstClicked');
  },
  interlockElementWithEvent: (_originEvent, _targetElement) => {
    switch (_originEvent.type) {
      case 'click':
        _targetElement.click();
        break;
      default:
        return false;
    }
  }
};

const commonWork = {
  toggleGlobalHeaderWithScroll: (_globalHeader) => {
    let scrollFlag = false;
    const threshold = _globalHeader.clientHeight;
    const toggleScrolledAttr = () => {
      if (!scrollFlag) {
        window.requestAnimationFrame(() => {
          scrollFlag = false;
          const scrolledName = 'scrolled';
          if (window.scrollY > threshold) {
            _globalHeader.setAttribute(scrolledName, scrolledName);
          } else {
            if (_globalHeader.hasAttribute(scrolledName)) {
              _globalHeader.removeAttribute(scrolledName);
            }
          }
        });
        scrollFlag = true;
      }
    };
    window.addEventListener('scroll', toggleScrolledAttr, {
      passive: true
    });
  },
  smoothScroll: (_triggerElement, _addHeightElement) => {
    const targetElement = document.querySelector(_triggerElement.getAttribute('href'));
    if (targetElement) {
      const addHeight = _addHeightElement.clientHeight;
      let scrollToTop = targetElement.getBoundingClientRect().top;
      scrollToTop = scrollToTop + window.pageYOffset - addHeight;
      _triggerElement.addEventListener('click', (_e) => {
        window.scrollTo({
          top: scrollToTop,
          behavior: 'smooth'
        });
        _e.preventDefault();
      });
    }
  },
  waitWebFontLoad: (_className) => {
    setTimeout(() => {
      document.getElementsByTagName('html')[0].classList.add(_className);
    }, 3000);
  }
};

const work = {
  slideToggle: (_e, _parallaxMirrorElements) => {
    const $target = $(
      document.querySelector(
        `[data-slide-content="${_e.currentTarget.dataset.slideTarget}"]`
      )
    );
    const adjustPosition = (_numericDifference) => {
      _parallaxMirrorElements.forEach((_element) => {
        const element = _element;
        element.style.top = `${_numericDifference}px`;
      });
    };
    if ($target.is(':visible')) {
      $target.slideUp({
        progress: (_animation) => {
          adjustPosition(_animation.elem.offsetHeight +
            parseInt(_animation.elem.style.marginBottom, 10));
        }
      });
    } else if ($target.is(':hidden')) {
      $target.slideDown({
        progress: (_animation) => {
          adjustPosition(_animation.elem.offsetHeight +
            parseInt(_animation.elem.style.marginBottom, 10));
        }
      });
    }
  },
  ToggleLabel: class {
    constructor(_element) {
      this.element = _element;
      this.defaltText = _element.innerText;
      this.replaceText = _element.dataset.toggleLabelText;
    }

    toggleText(_flag) {
      if (_flag) {
        this.element.innerText = this.replaceText;
      } else {
        this.element.innerText = this.defaltText;
      }
    }

    clicked(_e) {
      const flag = utility.toggleClickedAttr(_e);
      this.toggleText(flag === 'clicked' ? true : false);
    }
  },
  Parallax: class {
    constructor(_targets) {
      this.targets = _targets;
    }

    stylingParallax() {
      this.targets.forEach((_element) => {
        $(_element).parallax({
          imageSrc: _element.dataset.parallaxImageSrc,
          overScrollFix: true
        });
      });
    }
  }
};

const init = () => {
  const globalNav = document.querySelector('.global-nav');
  const globalHeader = document.querySelector('.global-header');
  globalNav.addEventListener('click', utility.toggleClickedAttr);
  globalNav.addEventListener('click', utility.addfirstClickedAttr);
  commonWork.toggleGlobalHeaderWithScroll(globalHeader);

  const parallaxTargets = document.querySelectorAll('.js-parallax-window');
  const styleParallax = new work.Parallax(parallaxTargets);
  styleParallax.stylingParallax();

  const parallaxMirrorElements = document.querySelectorAll('.parallax-mirror');

  const slideToggleButton = document.querySelectorAll(
    '.js-slide-toggle-button'
  );
  slideToggleButton.forEach((_element) => {
    _element.addEventListener('click', (_e) => {
      work.slideToggle(_e, parallaxMirrorElements);
    });
  });

  const toggelLabelElements = document.querySelectorAll('.js-toggle-label');
  toggelLabelElements.forEach((_element) => {
    const toggleElement = new work.ToggleLabel(_element);
    _element.addEventListener(
      'click',
      toggleElement.clicked.bind(toggleElement)
    );
  });

  const smoothScrollTrigerElements = document.querySelectorAll('.js-smoothTrigger a[href^="#"]');
  smoothScrollTrigerElements.forEach((_element) => {
    commonWork.smoothScroll(_element, globalHeader);
  });

  commonWork.waitWebFontLoad('loading-delay');
};

window.addEventListener('load', init);
