'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Preloader from '../../components/Preloader';
import Magnetic from '../../common/Magnetic';
import Rounded from '../../common/RoundedButton';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let locomotiveScroll;
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 2000)
      }
    )()

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    }
  }, [])

  return (
    <main className={styles.contact} style={{ backgroundColor: '#141516', minHeight: '100vh' }}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <section className={styles.header}>
        <h1>Let's Start</h1>
        <h1>A Project</h1>
      </section>

      <section className={styles.content}>
        <div className={styles.details} data-scroll data-scroll-speed="0.1">
          <div className={styles.item}>
            <h3>Contact Details</h3>
            <p>aasir@webvoxelstudio.uk</p>
            <p>+94 765560229</p>
          </div>

          <div className={styles.item}>
            <h3>Socials</h3>
            <div className={styles.socials}>
              <Magnetic><a href="https://www.linkedin.com/in/aasir-wahab-2b19ba2a1/" target="_blank" rel="noopener noreferrer">LinkedIn</a></Magnetic>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <form>
            <div className={styles.row}>
              <div className={styles.field}>
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">What's your name?</label>
              </div>
              <div className={styles.field}>
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">What's your email?</label>
              </div>
            </div>

            <div className={styles.field}>
              <input type="text" id="org" placeholder=" " />
              <label htmlFor="org">What's the name of your organization?</label>
            </div>

            <div className={styles.field}>
              <input type="text" id="services" placeholder=" " />
              <label htmlFor="services">What services are you looking for?</label>
            </div>

            <div className={styles.field}>
              <textarea id="message" rows="4" placeholder=" " required></textarea>
              <label htmlFor="message">Your message...</label>
            </div>

            <div className={styles.submit}>
              <Rounded backgroundColor="#334BD3">
                <p>Send it!</p>
              </Rounded>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}