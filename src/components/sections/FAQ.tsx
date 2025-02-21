import { type JSX } from "react"
import { GradientText } from "../ui/gradient-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

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
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <GradientText>Frequently Asked Questions</GradientText>
        </h2>
        <p className="text-xl text-gray-300">Everything you need to know about our SEO services</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.question} 
              value={faq.question}
              className="bg-white/5 backdrop-blur border-none rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 text-white hover:no-underline hover:bg-white/10">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
