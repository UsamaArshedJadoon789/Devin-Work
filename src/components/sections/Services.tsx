import { type JSX, useEffect, useRef } from "react"
import { CardHover } from "../ui/card-hover"
import { GradientText } from "../ui/gradient-text"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, createBurst, createZdogLogo } from "@/lib/animations"
import Reveal from "react-reveal/Fade"
import type { RevealProps } from "react-reveal/Fade"
import Velocity from 'velocity-js'

const services = [
  {
    title: "SEO Strategy",
    description: "Drive organic growth with data-driven SEO strategies tailored for SaaS companies",
    icon: "🎯"
  },
  {
    title: "Content Marketing",
    description: "Create high-quality content that ranks and converts your target audience",
    icon: "📝"
  },
  {
    title: "Technical SEO",
    description: "Optimize your website's technical foundation for better search performance",
    icon: "⚙️"
  },
  {
    title: "Link Building",
    description: "Build high-quality backlinks that boost your domain authority",
    icon: "🔗"
  },
  {
    title: "Analytics & Reporting",
    description: "Track and measure your SEO performance with detailed analytics",
    icon: "📊"
  },
  {
    title: "Local SEO",
    description: "Dominate local search results and attract nearby customers",
    icon: "📍"
  }
]

export const Services = (): JSX.Element => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const zdogContainerRef = useRef<HTMLDivElement>(null);
  const burstRefs = useRef<any[]>([]);

  useEffect(() => {
    if (zdogContainerRef.current) {
      const illustration = createZdogLogo(zdogContainerRef.current);
      const animate = () => {
        illustration.updateRenderGraph();
        requestAnimationFrame(animate);
      };
      animate();
    }

    const handleCardClick = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const burst = createBurst(mouseEvent.clientX, mouseEvent.clientY);
      burstRefs.current.push(burst);
      burst.play();

      // Add Velocity.js animation for clicked card
      const card = event.currentTarget as HTMLElement;
      Velocity(card, {
        scale: [1, 1.1],
        rotateZ: ['0deg', '5deg', '-5deg', '0deg'],
      } as { [key: string]: any }, {
        duration: 800,
        easing: 'spring',
      } as { [key: string]: any });
    };

    const handleCardHover = (event: Event) => {
      const card = event.currentTarget as HTMLElement;
      Velocity(card, {
        translateY: -10,
        boxShadowBlur: 20,
      } as { [key: string]: any }, {
        duration: 300,
        easing: 'easeOutQuad',
      } as { [key: string]: any });
    };

    const handleCardLeave = (event: Event) => {
      const card = event.currentTarget as HTMLElement;
      Velocity(card, {
        translateY: 0,
        boxShadowBlur: 0,
      } as { [key: string]: any }, {
        duration: 200,
        easing: 'easeInQuad',
      } as { [key: string]: any });
    };

    const cards = servicesRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => {
      card.addEventListener('click', handleCardClick);
      card.addEventListener('mouseenter', handleCardHover);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    return () => {
      cards?.forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.removeEventListener('mouseenter', handleCardHover);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
      burstRefs.current.forEach(burst => burst.pause());
    };
  }, []);

  return (
  <motion.section 
    ref={servicesRef}
    className="w-full py-32 relative"
    initial="initial"
    animate="animate"
    variants={staggerContainer}
  >
    <div ref={zdogContainerRef} className="absolute top-0 right-0 w-32 h-32 opacity-25" />
    <Reveal 
      effect="fadeInUp"
      duration={1000}
      delay={200}
      fraction={0.5}
      {...({} as RevealProps)}
    >
      <div className="text-center mb-20 px-8">
        <motion.h2 
          className="text-5xl font-bold mb-6 max-w-4xl mx-auto"
          variants={staggerItem}
        >
          <GradientText>Our Services</GradientText>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          variants={staggerItem}
        >
          Comprehensive SEO solutions for your business growth
        </motion.p>
      </div>
    </Reveal>
    <motion.div 
      className="grid md:grid-cols-3 gap-8 px-8 w-full"
      variants={staggerContainer}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          variants={staggerItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1 }}
        >
          <CardHover 
            className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl p-8 service-card"
          >
            <motion.div 
              className="text-4xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
          </CardHover>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
  );
}
