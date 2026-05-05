'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const fallbackAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=21',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=22',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=23',
];

export function TestimonialsSection({ testimonials: testimonialsProp }: TestimonialsSectionProps) {
  const { t, tArr } = useTranslation();
  const testimonials = testimonialsProp ?? tArr<Testimonial>('testimonials.items');

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('testimonials.title')}</h2>
          <p className="text-lg text-foreground/60">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground/80 text-base leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar ?? fallbackAvatars[index % fallbackAvatars.length]}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
