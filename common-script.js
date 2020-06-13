const utility = {
  toggleClickedAttr: _e => {
    const clickedName = "clicked";
    if (_e.currentTarget.hasAttribute(clickedName)) {
      _e.currentTarget.removeAttribute(clickedName);
    } else {
      _e.currentTarget.setAttribute(clickedName, clickedName);
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
      const target = document.querySelector(
        `[data-slide-content="${_e.currentTarget.dataset.slideTarget}"]`
      );
      $(target).slideDown();
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
};

init();

console.log("test");
