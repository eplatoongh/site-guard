export const qs = (sl) => document.querySelector(sl);
export const on = (sl, ev, f) => qs(sl).addEventListener(ev, f);
export const onN = (node, ev, f) => node.addEventListener(ev, f);
export const removeOnN = (node, ev, f) => node.removeEventListener(ev, f);
export const removeOn = (sl, ev, f) =>
  document.querySelector(sl).removeEventListener(ev, f);
export const qsa = (sl) => document.querySelectorAll(sl);
export const css = (sl, obj) => Object.assign(qs(sl).style, obj);
export const addC = (sl, str) => {
  str.split(" ").forEach((itm) => {
    qs(sl).classList.add(itm);
  });
};
export const addCN = (node, str) => {
  str.split(" ").forEach((itm) => {
    node.classList.add(itm);
  });
};
export const removeC = (sl, str) => {
  str.split(" ").forEach((itm) => {
    qs(sl).classList.remove(itm);
  });
};
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
export const getCurrentDate = (jsDate) => {
  const now = jsDate;

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 as month index starts from 0
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
