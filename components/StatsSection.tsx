'use client';

import { Heart, Smile, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

export function StatsSection({ stats: statsProp }: StatsSectionProps) {
  const { tArr } = useTranslation();
  const stats = statsProp ?? tArr<Stat>('stats.items');

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              <div className="flex justify-center mb-4">
                {index === 0 && <Heart className="w-10 h-10 text-primary" />}
                {index === 1 && <Smile className="w-10 h-10 text-secondary" />}
                {index === 2 && <TrendingUp className="w-10 h-10 text-primary" />}
                {index === 3 && <Users className="w-10 h-10 text-secondary" />}
              </div>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-foreground/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
