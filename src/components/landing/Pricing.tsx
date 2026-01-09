import { useState } from "react";
import { Check, X, Crown, Zap, Shield } from "lucide-react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'paid' | 'vip'>('paid');

  const plans = [
    {
      id: 'free' as const,
      name: 'Free Preview',
      price: '$0',
      channel: '@LeakEmpire',
      features: [
        'Preview clips & teasers',
        'Community polls',
        'Sneak peeks',
        'Public announcements'
      ],
      notIncluded: [
        'Full HD content',
        'Exclusive drops',
        'Early access',
        'Custom requests'
      ]
    },
    {
      id: 'paid' as const,
      name: 'Premium Access',
      price: '$20',
      period: 'one-time',
      channel: '@LeakEmpireHQ',
      popular: true,
      features: [
        'Full HQ content packs',
        'Weekly exclusive drops',
        'All preview content',
        'Lifetime access',
        'Direct download links'
      ],
      notIncluded: [
        'VIP unreleased content',
        'Custom requests',
        'Priority support'
      ]
    },
    {
      id: 'vip' as const,
      name: 'VIP Vault',
      price: '$50',
      period: '/month',
      channel: 'Private Access',
      features: [
        'Everything in Premium',
        'Unreleased exclusive content',
        'Early access to all drops',
        'Custom content requests',
        'Priority DM support',
        'VIP-only collections'
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-destructive/5" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Access
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One-time payment. Lifetime access. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-card border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                plan.popular 
                  ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10' 
                  : 'border-border hover:border-primary/50'
              } ${selectedPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-destructive text-primary-foreground text-sm font-bold rounded-full animate-pulse">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.channel}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 opacity-50">
                    <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.id === 'free' ? 'https://t.me/LeakEmpire' : 'https://t.me/EmpireSupport'}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center px-6 py-4 font-semibold rounded-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 text-primary-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                }`}
              >
                {plan.id === 'free' ? 'Join Free Channel' : plan.id === 'vip' ? 'Contact for VIP' : 'Get Access'}
              </a>
            </div>
          ))}
        </div>

        {/* Security notice */}
        <div className="mt-16 max-w-2xl mx-auto p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">100% Secure & Anonymous</h4>
              <p className="text-sm text-muted-foreground">
                All payments are processed securely for maximum privacy. 
                We never store personal information. Instant delivery after payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
