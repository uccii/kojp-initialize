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

const topPage = {
  globalNavFirstClick: _e => {
    _e.currentTarget.setAttribute("firstClicked", "firstClicked");
  }
};

const init = () => {
  const globalNav = document.querySelector(".global-nav");
  const partsToggleMunu = document.querySelectorAll(".parts-toggle-munu");
  globalNav.addEventListener("click", utility.toggleClick);
  globalNav.addEventListener("click", topPage.globalNavFirstClick);
  partsToggleMunu.forEach(_e => {
    _e.addEventListener("click", utility.toggleClick);
  });
};

init();

console.log("test");
