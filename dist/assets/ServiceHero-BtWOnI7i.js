import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{p as t}from"./vendor-icons-gQeMRPUx.js";import{t as n}from"./vendor-react-Ys7OBB-D.js";import{d as r}from"./index-DB5KmS3b.js";var i=e(t(),1),a=`/assets/BlogHero_bg--tNHR8bU.webp`,o=n(),s=i.memo(()=>{let{t:e}=r(),t={uz:`Tarmoqlar`,ru:`Отрасли`,eng:`Industries`},n={uz:`Xizmat fon rasmi`,ru:`Фоновое изображение отраслей`,eng:`Industries background`},s=(0,i.useMemo)(()=>e(t),[e,t]),[c,l]=(0,i.useState)(!1);return(0,o.jsxs)(`section`,{className:`box-border overflow-hidden relative w-full h-[calc(60svh-66px)] lg:h-[calc(100svh-73px)] mb-[10px] lg:mb-0 transition-[clip-path,opacity] duration-[2000ms] ease-out rounded-[8px]`,children:[(0,o.jsx)(`img`,{src:a,alt:e(n),className:`object-cover absolute inset-0 w-full h-full transition-all duration-700 ${c?`opacity-100 blur-0`:`opacity-0 blur-[15px]`}`,style:{clipPath:c?`inset(0 0 0 0)`:`inset(100% 0 0 0)`},loading:`eager`,decoding:`async`,fetchPriority:`high`,onLoad:()=>l(!0)}),(0,o.jsx)(`div`,{className:`absolute inset-0 bg-black/15`}),(0,o.jsx)(`div`,{className:`absolute inset-x-0 overflow-hidden pointer-events-none select-none bottom-6`,children:(0,o.jsx)(`div`,{className:`flex w-max whitespace-nowrap will-change-transform animate-marquee`,children:[...[,,]].map((e,t)=>(0,o.jsx)(`div`,{className:`flex items-center shrink-0`,children:[...Array(8)].map((e,t)=>(0,o.jsxs)(i.Fragment,{children:[(0,o.jsx)(`span`,{className:`mx-8 text-[7vw] font-extralight leading-none text-white`,children:`—`}),(0,o.jsx)(`span`,{className:`text-[18vw] sm:text-[14vw] font-extralight leading-[0.8] tracking-[-0.05em] text-white`,children:s})]},t))},t))})}),(0,o.jsx)(`style`,{children:`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: marquee 120s linear infinite;
        }
      `})]})});export{s as default};