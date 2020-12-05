const adjustmentVerticalTextBox = {
  verticalBox: document.querySelectorAll('.blog-main__content'),
  init: function init() {
    this.verticalBox.forEach((_element) => {
      const spacer = document.createElement('div');
      spacer.style.zIndex = '-1';
      spacer.style.pointerEvents = 'none';
      spacer.classList.add('blog-main__content-spacer');
      _element.insertAdjacentElement('afterend', spacer);
    });
  },
  adjustVerticalBox: function adjustVerticalBox() {
    this.verticalBox.forEach((_element) => {
      requestAnimationFrame(() => {
        const boxRange = document.createRange();
        boxRange.selectNodeContents(_element);
        const boxHeight = Math.round(boxRange.getBoundingClientRect().height);
        const spacerElement = _element.nextElementSibling;
        const boxStyle = window.getComputedStyle(_element, null);
        const boxMarginTop = boxStyle.marginTop;
        const boxMarginBottom = boxStyle.marginBottom;
        spacerElement.style.marginTop = `${-(
          parseInt(boxMarginTop, 10) + _element.clientHeight
        )}px`;
        spacerElement.style.marginBottom = boxMarginBottom;
        spacerElement.style.minHeight = `${boxHeight}px`;
      });
    });
  },
};

const init = () => {
  adjustmentVerticalTextBox.init();
  adjustmentVerticalTextBox.adjustVerticalBox();
  window.addEventListener(
    'resize',
    () => {
      adjustmentVerticalTextBox.adjustVerticalBox();
    },
    {
      passive: true,
    },
  );
};

export default init;
