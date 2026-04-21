import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Contact DonateBridge - Get in Touch',
  description: 'Have questions? Get in touch with our support team. We&apos;re here to help.',
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-lg text-foreground/70 mb-8">
              Have questions or feedback? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-foreground font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none resize-none"
                  placeholder="Your message"
                />
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-foreground/70">support@donatebridge.com</p>
                    <p className="text-foreground/70">hello@donatebridge.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-foreground/70">+880 1XXXX XXXXX</p>
                    <p className="text-foreground/70">Mon - Fri, 9AM - 6PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-foreground/70">
                      DonateBridge<br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Help</h3>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>View our FAQ for common questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Check our donation policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Learn about starting a campaign</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
