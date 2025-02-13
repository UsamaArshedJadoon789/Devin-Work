import { Fragment, type ReactNode } from "react"
import { Mail, Phone, MapPin, Clock, Users } from "lucide-react"
import { ContactForm } from "../../components/ui/ContactForm"

export function ContactPage(): ReactNode {
  const contactInfo = [
    { icon: <Mail className="h-6 w-6" />, title: "Email", content: "contact@theskylinestrategies.com" },
    { icon: <Phone className="h-6 w-6" />, title: "Phone", content: "+1 (555) 123-4567" },
    { icon: <MapPin className="h-6 w-6" />, title: "Address", content: "123 Business Ave, Suite 100, City, State 12345" },
    { icon: <Clock className="h-6 w-6" />, title: "Hours", content: "Mon - Sat: 9:00 - 18:00" }
  ]

  return (
    <Fragment>
      <section className="bg-gradient-to-br from-[#0A2647] to-[#0A3157] text-white pt-24 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-7xl font-bold mb-8 leading-tight tracking-wide relative">
              <span className="relative inline-block">
                CONTACT US
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50 transform skew-x-12"></span>
                <span className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-white/40 to-transparent transform -skew-x-12"></span>
              </span>
            </h1>
            <p className="text-2xl text-gray-200">
              Let's discuss your next project
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] transform -skew-y-3"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-br from-[#0A2647] to-[#0A3157] transform -skew-y-2 opacity-75"></div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#0A3157] relative">
                LET'S TALK
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#0A2647] to-[#0A3157]"></span>
              </h2>
              <div className="grid gap-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A2647] to-[#0A3157] rounded-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A2647] mb-1">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0A2647] text-white py-6 overflow-hidden whitespace-nowrap">
        <div className="animate-scroll inline-flex items-center space-x-16">
          {[
            { text: "24/7 Support", icon: <Clock className="h-6 w-6" /> },
            { text: "Fast Response", icon: <Mail className="h-6 w-6" /> },
            { text: "Global Reach", icon: <MapPin className="h-6 w-6" /> },
            { text: "Professional Team", icon: <Users className="h-6 w-6" /> }
          ].map((feature, index) => (
            <div key={index} className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-lg font-medium">{feature.text}</span>
            </div>
          ))}
          {/* Duplicate for seamless scrolling */}
          {[
            { text: "24/7 Support", icon: <Clock className="h-6 w-6" /> },
            { text: "Fast Response", icon: <Mail className="h-6 w-6" /> },
            { text: "Global Reach", icon: <MapPin className="h-6 w-6" /> },
            { text: "Professional Team", icon: <Users className="h-6 w-6" /> }
          ].map((feature, index) => (
            <div key={`duplicate-${index}`} className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-lg font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  )
}
