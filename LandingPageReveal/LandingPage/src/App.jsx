import React from 'react';
import './App.css';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import {CustomEase} from 'gsap/all';

// gsap.registerPlugin(ScrollTrigger , SplitText, CustomEase);

const App = () => {

    useGSAP(()=>{

        // if dom is alocated
        document.addEventListener("DOMContentLoaded", ()=>{})

                //play with GSAP HERE
                CustomEase.create('hop', "0.9, 0, 0.1, 1"); //to animate things consistently

                //helper function for split text
                const splitText = (selector, type, className)=>{
                    return SplitText.create(selector, {
                        type: type,
                        [`${type}Class`]: className,
                        mask: type
                    })
                }
                //----> helper function end here
                const headerSplit = splitText(".header h1", "chars", "char");
                const navSplit = splitText('nav a' , 'words', 'word');
                const footerSplit = splitText('.hero-footer p', 'words', 'word');

                const counterProgress = document.querySelector('.preloader-counter h1');
                const counterContainer = document.querySelector('.preloader-counter');

                const counter = {value: 0};

                //use the timeline to run the things smooth
                const tl = gsap.timeline();

                tl.to(counter, {
                    value: 100,
                    duration: 3,
                    ease: 'power3.out',

                    onUpdate: ()=>{
                        counterProgress.textContent = Math.floor(counter.value);
                    },

                    onComplete: ()=>{
                        const counterSplit = splitText(counterProgress, "chars" , "digit");
                        gsap.to(counterSplit.chars, {
                            x: "-100%", 
                            duration: 0.75,
                            ease: "power3.out",
                            stagger: 0.1,
                            delay: 1,
                            onComplete: ()=>{
                                counterContainer.remove();
                            }
                        });
                    },
                });

                tl.to(counterContainer, {
                    scale: 1,
                    duration: 3,
                    ease: 'power3.out'
                }, '<');

                tl.to('.progress-bar' , {
                    scaleX: 1,
                    duration: 3,
                    ease: 'power3.out',
                }, '<');

                tl.to('.hero-bg', {
                    clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
                    duration: 1.5,
                    ease: 'hop',
                }, 4.5);

                tl.to(".hero-bg img", {
                    scale: 1.5,
                    duration: 1.5,
                    ease: 'hop',
                }, '<');

                tl.to('.hero-bg', {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    duration: 2,
                    ease: 'hop'
                }, 6);

                tl.to(".hero-bg img", {
                    scale: 1,
                    duration: 2,
                    ease: 'hop',
                }, 6);

                tl.to('.progress', {
                    scaleX: 1,
                    duration: 2,
                    ease: 'hop'
                }, 6);

                tl.to('.header h1 .char', {
                    x: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: '0.075'
                }, 7);

                tl.to('nav a .word', {
                    y: '0%',
                    duration: 1,
                    ease: 'power4.out',
                    stagger: 0.075
                }, 8)

                tl.to('.hero-footer p .word', {
                    y: "0%",
                    duration: 1,
                    ease: 'power4.out',
                    stagger: 0.075,
                }, 8)


    }, [])

  return (
    <>
        <div className="preloader-counter">
            <h1>0</h1>
        </div>
        <nav>
            <div className="nav-logo">
                <a href='#'>Canon</a>
            </div>
            <div className="nav-links">
                <a href='#'>Index</a>
                <a href='#'>Collection</a>
                <a href='#'>Material</a>
                <a href='#'>Process</a>
                <a href='#'>Info</a>
            </div>
        </nav>
        <section className="hero">
            <div className="hero-bg">
                <img src='/hero.jpg' alt='bg img' />
            </div>
            <div className="header">
                <h1>Canon</h1>
            </div>
            <div className="hero-footer">
                <p>Performance</p>
                <p>Craftmanship</p>
                <p>Expression</p>
            </div>

            <div className="progress-bar">
                <div className="progress"></div>
            </div>
        </section>
    </>
  )
}

export default App
