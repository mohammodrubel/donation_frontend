interface PartnersSectionProps {
  partners: string[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-8">
          Trusted by leading organizations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center px-4 py-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-foreground/70">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}