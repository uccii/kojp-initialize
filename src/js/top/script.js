import $ from 'jquery';
import * as lib from '../common/lib';
import commonInit from '../common/init';

window.jQuery = $;
require('jquery-parallax.js');

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
      this.defaltText = this.element.textContent;
      this.replaceText = this.element.dataset.toggleLabelText;
    }

    toggleText(_flag) {
      if (_flag) {
        this.element.innerText = this.replaceText;
      } else {
        this.element.innerText = this.defaltText;
      }
    }

    clicked(_e) {
      const flag = lib.utility.toggleClickedAttr(_e);
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
        });
      });
    }
  }
};

const init = () => {
  commonInit();

  jarallax(document.querySelectorAll('.js-parallax-window'), {
    imgElement: '.common-fluid-image__parallax-image',
    speed: 0.2
  });

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
};

window.addEventListener('load', init);
