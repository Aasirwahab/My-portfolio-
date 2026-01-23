'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../../components/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import Contact from '../../components/Contact';
import styles from './page.module.scss';

const projects = [
  {
    id: 1,
    title: "Vantange",
    category: "Web Development",
    year: "2024",
    description: "Modern portfolio website with stunning visual design and smooth animations",
    image: "/vantange.jpg (1).webp",
    technologies: ["Next.js", "GSAP", "Framer Motion"],
    color: "#1a1a1a",
    link: "https://vantange-website-portfilo.vercel.app/"
  },
  {
    id: 2,
    title: "Aethereal",
    category: "Architecture",
    year: "2024",
    description: "Elegant architecture studio website showcasing creative design excellence",
    image: "/AETHEREAL.jpg.webp",
    technologies: ["Next.js", "React", "Modern CSS"],
    color: "#8C8C8C",
    link: "https://architecture-nextjs-theta.vercel.app/"
  },
  {
    id: 3,
    title: "Signature Aroma",
    category: "E-Commerce",
    year: "2024",
    description: "Premium fragrance e-commerce platform with luxurious shopping experience",
    image: "/eccomerce.webp",
    technologies: ["E-Commerce", "Web Design", "UI/UX"],
    color: "#EFE8D3",
    link: "https://www.signaturearoma.co.uk/"
  },
  {
    id: 4,
    title: "Paperhold",
    category: "Web Development",
    year: "2024",
    description: "Professional business solutions website with clean and modern aesthetics",
    image: "/paperhold.webp",
    technologies: ["Web Development", "UI/UX", "Responsive Design"],
    color: "#706D63",
    link: "https://www.paperhold.lk/"
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Work() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTitle = heroRef.current?.querySelector('.hero-title');
      const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');

      if (heroTitle) {
        gsap.fromTo(heroTitle,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
        );
      }

      // Work Items Animation
      gsap.set(".work-item", {
        y: 1000,
      });

      // Animate each row
      const rows = document.querySelectorAll(".row");
      rows.forEach((row) => {
        const workItems = row.querySelectorAll(".work-item");

        workItems.forEach((item, itemIndex) => {
          const isLeftProjectItem = itemIndex === 0;
          gsap.set(item, {
            rotation: isLeftProjectItem ? -60 : 60,
            transformOrigin: "center center",
          });
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 80%",
          onEnter: () => {
            gsap.to(workItems, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Group projects into pairs for rows
  const projectRows = [];
  for (let i = 0; i < projects.length; i += 2) {
    projectRows.push(projects.slice(i, i + 2));
  }

  return (
    <main ref={containerRef} className={styles.work}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <motion.div
          style={{ y }}
          className={styles.heroContent}
        >
          <h1 className="hero-title">Selected Work</h1>
          <p className="hero-subtitle">
            A selection of my recent web development work. Real projects, real results.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsContainer}>
          {projectRows.map((row, rowIndex) => (
            <div key={rowIndex} className={`${styles.row} row`}>
              {row.map((project, index) => (
                <div key={project.id} className={`${styles.workItem} work-item`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <div className={styles.projectImage}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                      />
                    </div>

                    <div className={styles.projectInfo}>
                      <div className={styles.projectHeader}>
                        <h3>{project.title}</h3>
                        <span className={styles.year}>{project.year}</span>
                      </div>
                      <p className={styles.category}>{project.category}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Contact */}
      <Contact />
    </main>
  );
} 