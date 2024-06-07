document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelectorAll(".view-btn"),e=document.querySelector(".overlay"),n=document.querySelectorAll(".popup"),o=document.querySelectorAll(".close-btn");let i,a,s,c,d=!1,l=!1,u=[];function r(t){d&&1===t.touches.length&&(a=t.touches[0].clientY,s=parseInt(i.style.top)||i.getBoundingClientRect().top)}function m(t){if(!d||1!==t.touches.length)return;const e=t.touches[0].clientY-a,n=Math.max(s+e,s);i.style.top=n+"px"}function f(t){if(!d)return;const e=t.changedTouches[0].clientY-a,n=i.offsetHeight;e>.5*n?(y(),L()):(i.style.top=s+"px",e<0&&Math.abs(e)>.5*n*.5?(i.style.transition="",i.style.top=s+"px"):(i.style.transition="top 0.3s ease",setTimeout((function(){i.style.transition=""}),300)))}function p(t){t.preventDefault()}function h(t){window.innerWidth<768?(t.style.top="auto",t.style.bottom="0",t.style.transform="translate(-50%, 0)",t.classList.add("slide-in-animation"),e.classList.add("fade-in-animation")):(e.style.display="block",e.classList.add("fade-in-animation"),n.forEach((t=>{t.style.top="50%",t.style.bottom="auto",t.style.transform="translate(-50%, -50%)",t.classList.add("fade-in-animation")}))),e.style.display="block",t.style.display="block",e.classList.add("show"),t.classList.add("show"),d=!0,document.body.style.overflow="hidden",i=t,document.addEventListener("touchmove",p,{passive:!1})}function y(){window.innerWidth<768?(i.style.top=i.getBoundingClientRect().top+"px",i.classList.add("slide-out-animation"),e.classList.add("fade-out-animation"),setTimeout((function(){e.style.display="none",i.style.display="none",i.classList.remove("slide-out-animation"),e.classList.remove("fade-out-animation")}),300)):(e.classList.add("fade-out-animation"),n.forEach((t=>{t.classList.add("fade-out-animation")})),setTimeout((function(){e.style.display="none",n.forEach((t=>{t.style.display="none"})),e.classList.remove("fade-out-animation"),n.forEach((t=>{t.classList.remove("fade-out-animation")}))}),300)),d=!1,document.body.style.overflow="",document.removeEventListener("touchmove",p,{passive:!1})}function v(){window.innerWidth<768?n.forEach((t=>{t.style.top="auto",t.style.bottom="0",t.style.transform="translate(-50%, 0)"})):n.forEach((t=>{t.style.top="50%",t.style.bottom="auto",t.style.transform="translate(-50%, -50%)"}))}function L(){const t=window.location.pathname;history.replaceState({},document.title,t)}function w(t){navigator.clipboard.writeText(t).then((function(){console.log("Link copied to clipboard: ",t)})).catch((function(t){console.error("Could not copy link: ",t)}))}!function(){const t=new URLSearchParams(window.location.search).get("view");if(t){const e=document.getElementById(t);e&&h(e)}}(),t.forEach((t=>{function e(e){if(e.preventDefault(),!l){const e=t.getAttribute("data-popup");w(`${window.location.origin}${window.location.pathname}?view=${e}`),alert("Link copied to clipboard: "+e),l=!0,setTimeout((()=>{l=!1}),1e3)}}t.addEventListener("click",(function(){const t=this.getAttribute("data-popup"),e=document.getElementById(t);e&&h(e)})),t.addEventListener("keydown",(function(t){if("Enter"===t.code||"Space"===t.code){const t=this.getAttribute("data-popup"),e=document.getElementById(t);e&&h(e)}})),t.addEventListener("contextmenu",(function(t){t.preventDefault();const e=this.getAttribute("data-popup");w(`${window.location.origin}${window.location.pathname}?view=${e}`),0!==u.length||l?u.push((()=>alert("Link copied to clipboard: "+e))):(alert("Link copied to clipboard: "+e),l=!0,setTimeout((()=>{if(l=!1,u.length>0){u.shift()()}}),1e3))})),t.addEventListener("touchstart",(function(t){c=setTimeout((()=>e(t)),800)})),t.addEventListener("touchend",(function(){clearTimeout(c)})),t.addEventListener("mousedown",(function(t){c=setTimeout((()=>e(t)),800)})),t.addEventListener("mouseup",(function(){clearTimeout(c)})),t.addEventListener("mouseleave",(function(){clearTimeout(c)}))})),o.forEach((t=>{t.addEventListener("click",(function(){y(),L()}))})),e.addEventListener("click",(function(t){t.stopPropagation()})),window.addEventListener("resize",(function(){v()})),window.addEventListener("click",(function(t){d&&t.target===e&&y()})),document.addEventListener("touchstart",r),e.addEventListener("touchstart",r),document.addEventListener("touchmove",m),e.addEventListener("touchmove",m),document.addEventListener("touchend",f),e.addEventListener("touchend",f),v()}));
