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

const init = () => {
  const globalNav = document.querySelector(".global-nav");
  globalNav.addEventListener("click", utility.toggleClickedAttr);
  globalNav.addEventListener("click", utility.addfirstClickedAttr);
};

init();

console.log("test");
