import $ from 'jquery';
import * as lib from '../common/lib';
import commonInit from '../common/init';

window.jQuery = $;

const work = {
  slideToggle: (_e) => {
    const $target = $(
      document.querySelector(
        `[data-slide-content="${_e.currentTarget.dataset.slideTarget}"]`
      )
    );
    if ($target.is(':visible')) {
      $target.slideUp();
    } else if ($target.is(':hidden')) {
      $target.slideDown();
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

  const slideToggleButton = document.querySelectorAll(
    '.js-slide-toggle-button'
  );
  slideToggleButton.forEach((_element) => {
    _element.addEventListener('click', (_e) => {
      work.slideToggle(_e);
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
