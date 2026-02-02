import React, { useLayoutEffect } from 'react';
import './App.css'
import {gsap} from 'gsap';
import { CustomEase } from 'gsap/CustomEase';



const App = () => {

  useLayoutEffect(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.75, 0, 0.2, 1");

  const introCards = document.querySelectorAll(".intro-cards .card");
  const introCardsCount = introCards.length;
  const radius = window.innerWidth < 1000 ? 150 : 225;

  introCards.forEach((card, i) => {
    const angle = (i / introCardsCount) * Math.PI * 2 - Math.PI / 2;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    gsap.set(card, {
      x,
      y,
      rotation: (angle * 180) / Math.PI + 90,
      transformOrigin: "center center",
      scale: 0,
    });
  });

  const outerCards = document.querySelectorAll('.outer-cards .card');

  const firstIntroCardAngle = (0 / introCardsCount) * Math.PI * 2 - Math.PI / 2;
  const firstIntroCardX = radius * Math.cos(firstIntroCardAngle);
  const firstintroCardY = radius * Math.sin(firstIntroCardAngle);

  outerCards.forEach((card, index)=>{
    gsap.set(card , {
      x: firstIntroCardX,
      y: firstintroCardY,
      rotation: (firstIntroCardAngle * 180) / Math.PI + 90,
      rotationY: index === 0 ? 0 : 180,
      transformPerspective : 800,
      transformOrigin : "center center",
      zIndex : 5 - index,
      opacity: 0,
    });
  });

  // now we will setup the timeline
  const tl = gsap.timeline({delay: 0.5});

  tl.to(introCards, {
    scale: 1,
    duration: 1,
    stagger: 0.1,
    ease: "hop",
    onComplete: ()=>{
      gsap.set(outerCards , {opacity: 1});
      gsap.set(outerCards[0], {scale: 1, rotation: 0});
      gsap.set(outerCards[1], {scale: 0.1, rotation: -90});
      gsap.set(outerCards[2], {scale: 0.1, rotation: -45});
      gsap.set(outerCards[3], {scale: 0.1, rotation: 90});
      gsap.set(outerCards[4], {scale: 0.1, rotation: 45});
    }
  });

  tl.to(introCards, {
    scale: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'hop'
  }).to(outerCards, {
    y : window.innerWidth < 1000 ? 0 : -125,
    duration: 1.5,
    ease: 'hop'
  },
  "-=0.25"
).to(
  outerCards[0],
  {
    rotationY: 180,
    duration: 1.5,
    ease: 'hop'
  },
  '<'
).to(outerCards, {
  x : (index) =>{
    const viewPortWidth = window.innerWidth;
    const cardRect = outerCards[0].getBoundingClientRect();
    const cardWidth = cardRect.width;
    const padding = viewPortWidth < 1000 ? 16:32;
    const maxLeftPos = -(viewPortWidth / 2) + padding + cardWidth/2;
    const maxRightPos = viewPortWidth /2 - padding - cardWidth/2;

    const position = [
      0,
      maxLeftPos,
      maxLeftPos/2,
      maxRightPos/2,
      maxRightPos,
    ];
    return position[index];
  },
  scale: 1,
  rotation: 0,
  duration: 1.5,
  ease: "hop"
}, "<").to(
  "nav" ,
{
    y: 0,
    duration: 1,
    ease: "hop"
}, '-=1');


const heroFooterTl = gsap.timeline({delay: 0.5});

heroFooterTl.to(".hero-footer .logo img" , {
  y : "0%",
  duration: 1,
  ease: "hop",
})
.to(
  ".hero-footer .logo",{
    scale: 1,
    duration: 1.25,
    ease: "hop",
  },
  "+=2.25"
);

const updateCardPositions = ()=>{
  const viewPortWidth = window.innerWidth;
  const cardRect = outerCards[0].getBoundingClientRect();
  const cardWidth = cardRect.width;
  const padding = viewPortWidth < 1000 ? 16:32;
  const maxLeftPos = -(viewPortWidth/2) + padding + cardWidth/2;
  const maxRightPos = viewPortWidth /2 - padding - cardWidth/2;

  const positions = [
    0,
    maxLeftPos,
    maxLeftPos / 2,
    maxRightPos / 2,
    maxRightPos,
  ];

  outerCards.forEach((card, index)=>{
    gsap.set(card, {x: positions[index]});
  });
};

window.addEventListener("resize" , updateCardPositions);



}, []);


  return (
    <>
    <nav>
        <div className="logo"><p>( F )</p></div>
        <div className="site-info"><p>Digital Folio 26</p></div>
        <div className="menu"><p>Menu</p></div>
    </nav>

    <div className="container">
      <div className="intro-cards">
          <div className="card"><img src="/faceMask.jpg" alt="face Mask" /></div>
          <div className="card"><img src="/facewash.jpg" alt="face wash" /></div>
          <div className="card"><img src="/hair.jpg" alt="hair gel" /></div>
          <div className="card"><img src="/handwash.jpg" alt="hand wash" /></div>
          <div className="card"><img src="/moist.jpg" alt="moisture" /></div>
          <div className="card"><img src="/perfume.jpg" alt="perfume" /></div>
          <div className="card"><img src="/serum.jpg" alt="serum" /></div>
          <div className="card"><img src="/watch.jpg" alt="watch" /></div>
      </div>
      <div className="outer-cards">
        
        <div className="card">
          <div className="card-back"><img src="/faceMask.jpg" alt="face mask" /></div>
          <div className="card-front">
            <p>OR</p>
            <p>13</p>
          </div>
        </div>
        <div className="card">
          <div className="card-front">
            <p>LV</p>
            <p>88</p>
          </div>
        </div>
        <div className="card">
          <div className="card-front">
            <p>ZN</p>
            <p>21</p>
          </div>
        </div>
        <div className="card">
          <div className="card-front">
            <p>TH</p>
            <p>47</p>
          </div>
        </div>
        <div className="card">
          <div className="card-front">
            <p>vx</p>
            <p>??</p>
          </div>
        </div>
        
      </div>
      <div className="hero-footer">
          <div className="logo"><img src="/logo.png" alt="logo" /></div>
      </div>
      {/* video 8 continue */}
    </div>
    </>
  )
}

export default App
