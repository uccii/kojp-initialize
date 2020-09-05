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
  }
};

const work = {
  slideToggle: (_e, _progressCallback) => {
    const $target = $(
      document.querySelector(
        `[data-slide-content="${_e.currentTarget.dataset.slideTarget}"]`
      )
    );
    if ($target.is(':visible')) {
      $target.slideUp({
        progress: () => {
          _progressCallback.stylingParallax();
        }
      });
    } else if ($target.is(':hidden')) {
      $target.slideDown({
        progress: () => {
          _progressCallback.stylingParallax();
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

  const slideToggleButton = document.querySelectorAll(
    '.js-slide-toggle-button'
  );
  slideToggleButton.forEach((_element) => {
    _element.addEventListener('click', (_e) => {
      work.slideToggle(_e, styleParallax);
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
};

window.addEventListener('load', init);
