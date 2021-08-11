(function () {
  const themeStorage = new Proxy(localStorage, {
    get: function (target, prop) {
      return function (...args) {
        return target[prop + "Item"]("dark-mode", ...args);
      };
    },
  });
  const skin_dir = "/assets/css/skins/";
  const themes = {
    dark: "dark.css",
    light: "default.css",
  };

  const systemColorDark = window.matchMedia("(prefers-color-scheme: dark)");
  systemColorDark.addEventListener('change', function (e) {
    if (!themeStorage.get()) {
      changeTheme(e.matches, false);
    }
  });

  let toggleButton;
  document.addEventListener("DOMContentLoaded", function () {
    const theme = themeStorage.get();
    toggleButton = document.getElementById("theme-toggle");
    toggleButton.checked = theme ? theme == "dark" : systemColorDark.matches;
    toggleButton.addEventListener("change", function (e) {
      changeTheme(e.target.checked, true);
    });
  });

  window.addEventListener("storage", function (e) {
    if (e.storageArea == localStorage && e.key == "dark-mode") {
      changeTheme(e.newValue || systemColorDark.matches, !!e.newValue);
    }
  });

  function changeTheme(theme, persistent) {
    if (typeof theme == "boolean") {
      theme = theme ? "dark" : "light";
    }
    document.querySelector(`link[rel="stylesheet"][href^="${skin_dir}"]`).href =
      skin_dir + themes[theme];
    if (persistent) {
      themeStorage.set(theme);
    }
    if (toggleButton != null) {
      toggleButton.checked = theme == "dark";
    }
  }

  changeTheme(
    themeStorage.get() || systemColorDark.matches,
    !!themeStorage.get()
  );
})();
