const utility = {
  toggleClickedAttr: _e => {
    const clickedName = "clicked";
    if (_e.currentTarget.hasAttribute(clickedName)) {
      _e.currentTarget.removeAttribute(clickedName);
      return "release";
    } else {
      _e.currentTarget.setAttribute(clickedName, clickedName);
      return "clicked";
    }
  },
  addfirstClickedAttr: _e => {
    _e.currentTarget.setAttribute("firstClicked", "firstClicked");
  },
  interlockElementWithEvent: (_originEvent, _targetElement) => {
    switch (_originEvent.type) {
      case "click":
        _targetElement.click();
        break;
      default:
        return false;
    }
  }
};

const work = {
  slideToggle: _e => {
    if (window.jQuery) {
      const $ = window.jQuery;
      const $target = $(
        document.querySelector(
          `[data-slide-content="${_e.currentTarget.dataset.slideTarget}"]`
        )
      );
      if ($target.is(":visible")) {
        $target.slideUp();
      } else if ($target.is(":hidden")) {
        $target.slideDown();
      }
    }
  },
  toggleLabel: class {
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
      this.toggleText(flag === "clicked" ? true : false);
    }
  }
};

const init = () => {
  const globalNav = document.querySelector(".global-nav");
  globalNav.addEventListener("click", utility.toggleClickedAttr);
  globalNav.addEventListener("click", utility.addfirstClickedAttr);

  const slideToggleButton = document.querySelectorAll(
    ".js-slide-toggle-button"
  );
  slideToggleButton.forEach(_element => {
    _element.addEventListener("click", work.slideToggle);
  });

  const toggelLabelElements = document.querySelectorAll(".js-toggle-label");
  toggelLabelElements.forEach(_element => {
    const toggleElement = new work.toggleLabel(_element);
    _element.addEventListener(
      "click",
      toggleElement.clicked.bind(toggleElement)
    );
  });
};

init();

console.log("test");
