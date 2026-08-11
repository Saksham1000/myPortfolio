import {useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';

const INTERACTIVE='a,button,input,textarea,select,summary,label,[role="button"],[role="link"],[contenteditable="true"],.project-card';

export function CursorOrbFixed(){
  const cursor=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
    if(!finePointer.matches)return;
    const root=document.documentElement;
    const node=cursor.current;
    if(!node)return;
    let frame=0,nextX=-100,nextY=-100,active=false,pressed=false;
    const paint=()=>{frame=0;node.style.transform=`translate3d(${nextX}px,${nextY}px,0)`;};
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
    const setActive=(next:boolean)=>{if(next===active)return;active=next;node.classList.toggle('is-interactive',active);};
    const move=(event:PointerEvent)=>{if(event.pointerType==='touch')return;nextX=event.clientX;nextY=event.clientY;schedule();node.classList.add('is-visible');root.classList.add('custom-cursor-ready');setActive(Boolean((event.target as Element|null)?.closest?.(INTERACTIVE)));};
    const down=()=>{pressed=true;node.classList.add('is-pressed');};
    const up=()=>{if(!pressed)return;pressed=false;node.classList.remove('is-pressed');};
    const hide=()=>node.classList.remove('is-visible');
    const show=()=>{if(nextX>=0)node.classList.add('is-visible');};
    const visibility=()=>document.hidden?hide():show();
    addEventListener('pointermove',move,{passive:true});
    addEventListener('pointerdown',down,{passive:true});
    addEventListener('pointerup',up,{passive:true});
    addEventListener('blur',hide);
    document.addEventListener('mouseleave',hide);
    document.addEventListener('mouseenter',show);
    document.addEventListener('visibilitychange',visibility);
    return()=>{if(frame)cancelAnimationFrame(frame);removeEventListener('pointermove',move);removeEventListener('pointerdown',down);removeEventListener('pointerup',up);removeEventListener('blur',hide);document.removeEventListener('mouseleave',hide);document.removeEventListener('mouseenter',show);document.removeEventListener('visibilitychange',visibility);root.classList.remove('custom-cursor-ready');};
  },[]);
  if(typeof document==='undefined')return null;
  return createPortal(<div ref={cursor} className="cursor-orb-fixed" aria-hidden="true"><span className="cursor-aura"/><img src="/icons8-ultra-ball-96.png" alt="" draggable="false"/></div>,document.body);
}
