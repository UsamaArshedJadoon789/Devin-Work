import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollFadeIn } from "../animations/PageAnimations"
import { GradientText } from "../ui/gradient-text"
import { Button } from "../ui/button"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
}

export const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }
    
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", company: "", message: "" })
    } catch (_error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <ScrollFadeIn>
      <section className="container mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 motion-safe:animate-fade-in">
            <GradientText>Get in Touch</GradientText>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto motion-safe:animate-slide-up animate-delay-100">
            Ready to skyrocket your organic growth? Let's discuss how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-gray-300">hello@company.com</p>
                  <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm mt-1">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-300">123 SEO Street</p>
                  <p className="text-gray-300">San Francisco, CA 94105</p>
                </div>
              </div>

              <div className="h-64 w-full rounded-xl overflow-hidden mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673599876316!2d-122.39568388447183!3d37.79129997975444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806285ddb1a3%3A0x7f621167e5b5735e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v16456542358970!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary/50 border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-accent transition-colors`}
                  placeholder="Your name"
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary/50 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-accent transition-colors`}
                  placeholder="your@email.com"
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-white font-medium mb-2">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary/50 border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-secondary/50 border ${formErrors.message ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-accent transition-colors`}
                  placeholder="How can we help?"
                />
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
              </div>

              <motion.div
                initial={false}
                animate={{
                  scale: isSubmitting ? 0.95 : 1,
                  opacity: isSubmitting ? 0.8 : 1
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-black hover:bg-accent/90 py-4 rounded-lg font-medium transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-center mt-4"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-center mt-4"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
