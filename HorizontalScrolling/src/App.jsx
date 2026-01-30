import React from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/all'
import {useGSAP} from '@gsap/react'
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
    const number = [1,2,3,4,5,6, 7, 8, 9, 10];


    //my gsap animation will go here
    useGSAP(()=>{

        // Initialize ScrollSmoother for smooth scrolling
        ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
        });


        //------> Entry Animation <------------


        //transform 1st text
        gsap.fromTo('#scroll-one h1', {
            transform: 'translateX(100vw)',
            opacity: 0,
        },
    {
        transform: 'translateX(0)',
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
    });

    //transform 2nd text

    gsap.fromTo('#scroll-two h1', {
            transform: 'translateX(-100vw)',
            opacity: 0,
        },
    {
        transform: 'translateX(0)',
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
    });

    //transform 3rd text

    gsap.fromTo('#scroll-three h1', {
            transform: 'translateX(100vw)',
            opacity: 0,
        },
    {
        transform: 'translateX(0)',
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: 'power2.inOut',
    });


    //-----------> Exit Animation <------------

        
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
                pin: true,
            }
        });


        // timeline to animate the context out of screen again
        tl.fromTo(
            '#scroll-one h1',
            {transform: 'translateX(0)', opacity: 1},
            {transform: 'translateX(-100vw)', opacity: 1, ease: 'ease.inOut', duration: 1.5}
        ).fromTo(
            '#scroll-two h1',
            {transform: 'translateX(0)', opacity: 1},
            {transform: 'translateX(100vw)', opacity: 1, ease: 'ease.inOut', duration: 1.5},
        ).fromTo(
            '#scroll-three h1',
            {transform: 'translateX(0)', opacity: 1},
            {transform: 'translateX(-100vw)', opacity: 1, ease: 'ease.inOut', duration: 1.5},
        );

    }, []);



    useGSAP(()=>{

        //-------------------> Image parallax <---------------------
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger: '#images',
                start: 'top bottom',
                end: 'bottom center',
                scrub: 1.5,
            }
        });

        //------> 1st image box
        tl.fromTo('#img-l-one img', {transform: 'translateX(-100%)', opacity: 0}, {opacity: 1, transform: 'translateX(100%)', duration: 0.3, ease: 'power1.inOut'});
        tl.fromTo('#img-l-two img', {transform: 'translateX(100%)', opacity: 0}, {opacity: 1, transform: 'translateX(-100%)', duration: 0.3, ease: 'power1.inOut'});
        tl.fromTo('#img-l-three img', {transform: 'translateX(-100%)', opacity: 0}, {opacity: 1, transform: 'translateX(100%)', duration: 0.3, ease: 'power1.inOut'});


    }, []);

  return (
    <div id='smooth-wrapper'>
        <div id='smooth-content'>
            <div id='main' className='overflow-x-hidden'>
                <div className="w-screen h-screen flex flex-col items-center justify-center gap-10" id='hero'>
                    <section id="scroll-one" className='text-[60px] content-medium'>
                        <h1 className='text-[#2B2B2B]' style={{opacity: 0}}>Best Resort</h1>
                    </section>
                    <section id="scroll-two" className='text-[80px] title-medium transform rotate-[-5deg]'>
                        <h1 className='p-5 bg-[#B3B3B3] w-fit text-[#2B2B2B]' style={{opacity: 0}}>In Thiland</h1>
                    </section>  
                    <section id="scroll-three" className='text-[60px] content-medium'>
                        <h1 className='text-[#2B2B2B] text-center' style={{opacity: 0}}>Which will make you to, <br/> remember the trip</h1>
                    </section>
                </div>
                <div className='w-screen h-[100%] overflow-hidden' id='images'>
                    <section id="img-l-one" className='flex items-center ovrflow-x-hidden justify-center gap-4 p-4 transform rotate-[-4deg]'>
                            {number.map((num, index)=>(
                                <img key={index} src={num%2==0? 'img-one.jpg' : 'img-two.jpg'} className='w-[300px] h-[300px] rounded-lg opacity-0' alt="resort"/>
                            ))}
                    </section>
                    <section id="img-l-two" className='flex items-center ovrflow-x-hidden justify-center gap-4 p-4 transform rotate-[-4deg]'>
                            {number.map((num, index)=>(
                                <img key={index} src={num%2==0? 'img-one.jpg' : 'img-two.jpg'} className='w-[300px] h-[300px] rounded-lg opacity-0' alt="resort"/>
                            ))}
                    </section>
                    <section id="img-l-three" className='flex items-center ovrflow-x-hidden justify-center gap-4 p-4 transform rotate-[-4deg]'>
                            {number.map((num, index)=>(
                                <img key={index} src={num%2==0? 'img-one.jpg' : 'img-two.jpg'} className='w-[300px] h-[300px] rounded-lg opacity-0' alt="resort"/>
                            ))}
                    </section>
                </div>
                <div className='w-screen h-screen overflow-hidden' id='about'></div>
            </div>
        </div>
    </div>
  )
}

export default App
