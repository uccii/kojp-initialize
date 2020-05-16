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

const commonWork = {
  toggleGlobalHeaderWithScroll: _globalHeader => {
    let scrollFlag = false;
    const threshold = _globalHeader.clientHeight;
    const toggleScrolledAttr = _e => {
      if (!scrollFlag) {
        window.requestAnimationFrame(() => {
          scrollFlag = false;
          const scrolledName = "scrolled";
          if (window.scrollY > threshold) {
            _globalHeader.setAttribute(scrolledName, scrolledName);
            console.log("多い: " + window.scrollY);
          } else {
            if (_globalHeader.hasAttribute(scrolledName)) {
              _globalHeader.removeAttribute(scrolledName);
            }
            console.log("少ない: " + window.scrollY);
          }
        });
        scrollFlag = true;
      }
    };
    window.addEventListener("scroll", toggleScrolledAttr, {
      passive: true
    });
  }
};

const init = () => {
  const globalNav = document.querySelector(".global-nav");
  const globalHeader = document.querySelector(".global-header");
  globalNav.addEventListener("click", utility.toggleClickedAttr);
  globalNav.addEventListener("click", utility.addfirstClickedAttr);
  // commonWork.toggleGlobalHeaderWithScroll(globalHeader);
};

init();

console.log("test");
