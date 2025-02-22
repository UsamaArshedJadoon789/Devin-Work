import { type JSX } from "react"
import { GradientText } from "../ui/gradient-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, animate } from "@/lib/animations"
import Reveal from "react-reveal/Fade"
import { NodeGroup } from 'react-move'
import { spring } from 'popmotion'
import anime from 'animejs'

const faqs = [
  {
    question: "What makes Skale different from other SEO agencies?",
    answer: "We specialize exclusively in SaaS SEO, bringing deep industry expertise and a proven track record of driving MRR growth through organic search. Our data-driven approach and focus on product-qualified leads sets us apart."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "While SEO is a long-term strategy, our clients typically start seeing improvements in rankings and traffic within 3-6 months. However, significant business impact and ROI are usually realized within 6-12 months of consistent effort."
  },
  {
    question: "Do you guarantee rankings or traffic?",
    answer: "We don't guarantee specific rankings as search engines are constantly evolving. However, we do guarantee our methodology, transparency, and commitment to driving measurable business results through organic search."
  },
  {
    question: "What does your SEO process look like?",
    answer: "Our process begins with a comprehensive audit and strategy development, followed by technical optimization, content creation, and link building. We continuously monitor performance and adjust our approach based on data."
  },
  {
    question: "How do you measure SEO success?",
    answer: "We focus on metrics that matter to your business: organic traffic growth, qualified lead generation, and ultimately, MRR impact. Our reporting includes both leading indicators (rankings, visibility) and business outcomes."
  }
]

export const FAQ = (): JSX.Element => {
  const handleAccordionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    // Popmotion spring animation
    animate({
      from: 0,
      to: 1,
      duration: 300,
      onUpdate: (progress) => {
        button.style.transform = `scale(${1 + progress * 0.05})`;
      },
      onComplete: () => {
        animate({
          from: 1,
          to: 0,
          duration: 200,
          onUpdate: (progress) => {
            button.style.transform = `scale(${1 + progress * 0.05})`;
          }
        });
      }
    });

    // Anime.js animation for text color
    anime({
      targets: button.querySelector('.accordion-text'),
      color: ['#FFFFFF', '#C6F135', '#FFFFFF'],
      duration: 800,
      easing: 'easeInOutQuad'
    });
  };

  return (
    <motion.section 
      className="w-full py-24 sm:py-28 lg:py-32"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <Reveal bottom cascade>
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-8">
          <div className="w-full">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6"
              variants={staggerItem}
            >
              <GradientText>Frequently Asked Questions</GradientText>
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Everything you need to know about our SEO services
            </motion.p>
          </div>
        </div>
      </Reveal>

      <motion.div 
        className="max-w-3xl mx-auto px-8 w-full"
        variants={staggerContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Accordion type="single" collapsible className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem 
                value={faq.question}
                className="bg-secondary/50 backdrop-blur border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
              >
                <AccordionTrigger 
                  className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-semibold text-white hover:no-underline hover:bg-white/5"
                  onClick={handleAccordionClick}
                >
                  <span className="accordion-text">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                  <NodeGroup
                    data={[{ id: faq.question, text: faq.answer }]}
                    keyAccessor={(d) => d.id}
                    start={() => ({
                      opacity: 0,
                      y: 20
                    })}
                    enter={() => ({
                      opacity: [1],
                      y: [0],
                      timing: { duration: 300, ease: spring }
                    })}
                    update={() => ({
                      opacity: [1],
                      y: [0],
                      timing: { duration: 300, ease: spring }
                    })}
                    leave={() => ({
                      opacity: [0],
                      y: [20],
                      timing: { duration: 300, ease: spring }
                    })}
                  >
                    {(nodes) => (
                      <div>
                        {nodes.map(({ key, data, state: { opacity, y } }) => (
                          <div
                            key={key}
                            style={{
                              opacity,
                              transform: `translateY(${y}px)`
                            }}
                          >
                            {data.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </NodeGroup>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  );
}
