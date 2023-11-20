export const qs = (sl) => document.querySelector(sl);
export const on = (sl, ev, f) => qs(sl).addEventListener(ev, f);
export const onN = (node, ev, f) => node.addEventListener(ev, f);
export const removeOnN = (node, ev, f) => node.removeEventListener(ev, f);
export const removeOn = (sl, ev, f) =>
  document.querySelector(sl).removeEventListener(ev, f);
export const qsa = (sl) => document.querySelectorAll(sl);
export const css = (sl, obj) => Object.assign(qs(sl).style, obj);
export const addC = (sl, str) => qs(sl).classList.add(str);
export const removeC = (sl, str) => qs(sl).classList.remove(str);
export const addCa = (sl, str) =>
  qsa(sl).forEach((dom) => dom.classList.add(str));
export const removeCa = (sl, str) =>
  qsa(sl).forEach((dom) => dom.classList.remove(str));
export const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
};
export const HTML = (sl, html) => (qs(sl).innerHTML = html);
export const addHTML = (sl, html) => (qs(sl).innerHTML += html);
export const submitLoaderStart = (e) => {
  let sel = e.querySelector('[type="submit"]');

  let selTxt = sel.innerText;
  if (selTxt == "Login") {
    sel.innerHTML = `${selTxt}..`;
  } else {
    sel.innerHTML = `${selTxt}ing..`;
  }
};
export const submitLoaderEnd = (e) => {
  let sel = e.querySelector('[type="submit"]');
  let selTxt;

  if (sel.innerText == "Login..") {
    selTxt = sel.innerText.split("..");
  } else {
    selTxt = sel.innerText.split("ing..");
  }

  sel.innerHTML = selTxt[0];
};
