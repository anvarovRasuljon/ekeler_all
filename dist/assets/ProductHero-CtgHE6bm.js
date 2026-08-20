import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{p as t}from"./vendor-icons-gQeMRPUx.js";import{t as n}from"./vendor-react-Ys7OBB-D.js";import{d as r}from"./index-DB5KmS3b.js";var i=e(t(),1),a=`/assets/product_hero-dobxBeWC.png`,o=n(),s=i.memo(()=>{let{t:e}=r(),t={uz:`Katalog`,ru:`Каталог`,eng:`Catalog`},n={uz:`Mahsulot fon rasmi`,ru:`Фоновое изображение продукта`,eng:`Product background`},s=a,c=(0,i.useMemo)(()=>e(t),[e,t]),[l,u]=(0,i.useState)(!1),d=(0,i.useMemo)(()=>c?Array(8).fill(c).join(` — `)+` —\xA0`:``,[c]);return(0,o.jsxs)(`div`,{className:`box-border overflow-hidden relative w-full h-[calc(60svh-81px)] lg:h-[calc(100svh-73px)] transition-[clip-path,opacity] duration-[2000ms] ease-out`,style:{clipPath:l?`inset(0 0 0 0)`:`inset(0 0 100% 0)`,opacity:+!!l},children:[s?(0,o.jsx)(`img`,{src:a,alt:e(n),className:`object-cover absolute inset-0 w-full h-full transition-all duration-700 rounded-[8px]`,loading:`eager`,decoding:`async`,onLoad:()=>u(!0)}):(0,o.jsx)(`div`,{className:`absolute inset-[15px] bg-neutral-200 rounded-[8px]`}),(0,o.jsx)(`div`,{className:`absolute inset-0 z-[1] bg-[#0000001A] rounded-[8px]`}),d&&(0,o.jsx)(`div`,{className:`absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-[2]`,children:(0,o.jsxs)(`div`,{className:`flex w-max will-change-transform animate-marquee`,children:[(0,o.jsx)(`p`,{className:`shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]`,children:d}),(0,o.jsx)(`p`,{className:`shrink-0 whitespace-nowrap text-[18vw] font-normal leading-normal tracking-tight text-[#FFFFFF]/95 sm:text-[14vw]`,children:d})]})}),(0,o.jsx)(`style`,{children:`
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