import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
    const videoRef=useRef();

    const isMobile=window.innerWidth < 768;

    useGSAP(()=>{
        const heroSplit= new SplitText('.title',{type:'chars, words'});
        const paragraphSplit= new SplitText('.subtitle',{type:'lines'});

        heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.05
        });

        gsap.from(paragraphSplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1,
        });

        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:true,
            }
        }).to('.right-leaf',{y:200},0).to('.left-leaf',{y:-200},0)


        const startValue=isMobile?'top 50%':'center 60%';
        const endValue=isMobile?'120% top':'bottom top';

        const tl=gsap.timeline({
            scrollTrigger:{
                trigger:'video',
                start:startValue,
                end:endValue,
                scrub:0.5,
                pin:!isMobile,

            }
        })

        videoRef.current.onloadedmetadata=()=>{
            tl.to(videoRef.current,{
                currentTime:videoRef.current.duration,
            });
        }


    },[]);

  return (
    <>
    <section id="hero" className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img src="/images/hero-left-leaf.png" alt='left-leaf' className='left-leaf'/>
        <img src="/images/hero-right-leaf.png" alt='right-leaf' className='right-leaf'/>

        <div className='body'>
            <div className='content'>
                <div className='space-y-5 hidden md:block'>
                    <p>Cool. Crisp. Classic</p>
                    <p className='subtitle'> Sip the spirit <br/> of Summer </p>
                </div>
                <div className='view-cocktails'>
                    <p className='subtitle'>
                    Each drink on our menu is crafted with premium ingredients, 
                    creative flair, 
                    and timeless recipes — expertly designed to ignite your senses and elevate every sip.
                    </p>
                    <a href='#cocktails'> View Cocktails</a>
                </div>
            </div>
        </div>
    </section>

    <div className='video absolute inset-0'>
        <video 
        ref={videoRef} 
        muted
        playsInline
        preload='auto'
        src="/videos/output.mp4" 
        className="w-full h-auto"
         />
    </div>
    </>
  )
}

export default Hero