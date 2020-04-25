const utility = {
  toggleClick: _e => {
    const clickedName = "clicked";
    if (_e.currentTarget.hasAttribute(clickedName)) {
      _e.currentTarget.removeAttribute(clickedName);
    } else {
      _e.currentTarget.setAttribute(clickedName, clickedName);
    }
  }
};

const init = () => {
  const globalNav = document.querySelector(".global-nav");
  globalNav
    .querySelector(".global-nav__toggle-button")
    .addEventListener("click", utility.toggleClick);
};

init();
