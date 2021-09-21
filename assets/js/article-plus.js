function _c(tagName, className, attributes) {
  const elm = document.createElement(tagName);
  elm.className = className;
  Object.entries(attributes || {}).forEach(function(attr) {
    elm.setAttribute(attr[0], attr[1]);
  });
  return elm;
}

(function insertGoodNotice() {
  const time = document.querySelector("time.dt-published[datetime]");
  const datePublished = new Date(time.getAttribute("datetime") || Date.now());
  const date2YearsAgo = new Date().setFullYear(new Date().getFullYear() - 2);
  if (datePublished < date2YearsAgo) {
    const diff = Date.now() - datePublished;
    const diffYears = diff / 365 / 24 / 60 / 60 / 1000;
    const p = _c("p", "notice--warning");
    const i = _c("i", "fas fa-exclamation-triangle");
    p.innerText = ` この記事は${Math.floor(diffYears)}年以上昔に投稿されたものです。古い情報が含まれる場合があります。`;
    p.insertAdjacentElement("afterbegin", i);
    document
      .querySelector(".page-content")
      .insertAdjacentElement("afterbegin", p);
  }
})();

(function addTargetBlank() {
  document
    .querySelectorAll(".page-content .e-content p > a:not([id]):not([class])")
    .forEach(function (a) {
      if (a.children.length) return;
      const url = new URL(a.href, location.origin);
      if (url.origin == location.origin) return;
      const i = _c("i", "fas fa-external-link-alt fa-sm fa-fw", {"data-fa-transform": "shrink-2 up-4"});
      a.insertAdjacentElement("beforeend", i);
      a.target = "_blank";
      a.setAttribute("rel", "noopener");
    });
})();

(function headingHashLink() {
  document
    .querySelector(".page-content .e-content").querySelectorAll("h2, h3, h4, h5, h6")
    .forEach(function (h) {
      h.addEventListener("click", function(e) {
        location.hash = h.id;
      });
      h.classList.add('link')
    });
})();
