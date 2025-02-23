import { ScrollFadeIn } from "@/components/animations/PageAnimations"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { toast } from "sonner"

export const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      form.reset();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <ScrollFadeIn>
      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 motion-safe:animate-fade-in-down animate-duration-700">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 motion-safe:animate-fade-in motion-safe:animate-slide-in animate-delay-200">
            Get in touch with our team
          </p>
        </div>
        <div className="max-w-2xl mx-auto motion-safe:animate-fade-in animate-duration-500">
          <Card className="group bg-white/10 backdrop-blur border-none text-white transform-gpu hover:scale-105 transition-all duration-500">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="transform-gpu hover:translate-y-1 transition-all duration-300">
                        <FormLabel className="text-white motion-safe:animate-fade-in" style={{ animationDelay: '100ms' }}>
                          Name
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-accent transition-all duration-300 hover:border-accent/50"
                            placeholder="Enter your name"
                          />
                        </FormControl>
                        <FormMessage className="motion-safe:animate-fade-in animate-delay-100" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="transform-gpu hover:translate-y-1 transition-all duration-300">
                        <FormLabel className="text-white motion-safe:animate-fade-in" style={{ animationDelay: '200ms' }}>
                          Email
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-accent transition-all duration-300 hover:border-accent/50"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage className="motion-safe:animate-fade-in animate-delay-200" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="transform-gpu hover:translate-y-1 transition-all duration-300">
                        <FormLabel className="text-white motion-safe:animate-fade-in" style={{ animationDelay: '300ms' }}>
                          Message
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={5}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-accent transition-all duration-300 hover:border-accent/50 resize-none"
                            placeholder="Enter your message"
                          />
                        </FormControl>
                        <FormMessage className="motion-safe:animate-fade-in animate-delay-300" />
                      </FormItem>
                    )}
                  />
                  <button 
                    type="submit"
                    className="w-full bg-accent text-primary hover:bg-accent/90 py-3 rounded-lg transition-all duration-300 transform-gpu hover:scale-105 motion-safe:animate-fade-in"
                    style={{ animationDelay: '400ms' }}
                  >
                    Send Message
                  </button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </ScrollFadeIn>
  )
}
