{

  // LOADER
  const loaderStyle = document.createElement('style')
  const loaderElement = document.createElement('div')
  loaderElement.classList.add('loader')
  let color = '#000000'
  if (window.vinalfaModul) {
    color = window.vinalfaModul.colorTheme.colorTheme
  }
  loaderStyle.innerHTML = `.loader,.loader:after{border-radius:50%;width:5em;height:5em}.loader{margin:60px auto;font-size:10px;position:relative;text-indent:-9999em;border-top:.6em solid ${color}20;border-right:.6em solid ${color}20;border-bottom:.6em solid ${color}20;border-left:.6em solid ${color};-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:load8 1.1s infinite linear;animation:load8 1.1s infinite linear}@-webkit-keyframes load8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}`
  document.head.append(loaderStyle)
  const module = document.getElementById('module')
  if (module) module.appendChild(loaderElement)
  
  
  
  // LOAD MODULE STYLES
  const stl1 = document.createElement('link')
  stl1.rel = "stylesheet"
  stl1.href = "https://vinalfa.com/oem/versions/v1.2/css/main.b1ba8f4b.chunk.css"
  stl1.onload = () => {
    loadScript()
  }
  document.body.append(stl1)
  
  
  
  // LOAD MODULE SCRIPT
  const loadScript = () => {
    const scrM = document.createElement('script')
    scrM.innerHTML = '!function(e){function r(r){for(var n,l,a=r[0],f=r[1],i=r[2],p=0,s=[];p<a.length;p++)l=a[p],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&s.push(o[l][0]),o[l]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(c&&c(r);s.length;)s.shift()();return u.push.apply(u,i||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,a=1;a<t.length;a++){var f=t[a];0!==o[f]&&(n=!1)}n&&(u.splice(r--,1),e=l(l.s=t[0]))}return e}var n={},o={1:0},u=[];function l(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=n,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,r){if(1&r&&(e=l(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)l.d(t,n,function(r){return e[r]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/";var a=this.webpackJsonpclear=this.webpackJsonpclear||[],f=a.push.bind(a);a.push=r,a=a.slice();for(var i=0;i<a.length;i++)r(a[i]);var c=f;t()}([]);'
    
    const scr1 = document.createElement('script')
    scr1.src = "https://vinalfa.com/oem/versions/v1.2/js/2.bc669fa3.chunk.js"
    
    const scr2 = document.createElement('script')
    scr2.src = "https://vinalfa.com/oem/versions/v1.2/js/main.1b5ecf85.chunk.js"
  
    document.body.append(scrM, scr1, scr2)
  }
}