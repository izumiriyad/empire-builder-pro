import { Bitcoin, Send, CheckCircle, Copy, MessageCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HowToAccess = () => {
  const [copied, setCopied] = useState(false);
  const btcAddress = "13BRc2Q1Eu6UMDJrj6QzYcwSmzGL2WsPmv";

  const copyAddress = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      number: "01",
      icon: Bitcoin,
      title: "Send Payment",
      description: "Send $20 in BTC to the wallet address below. Use any crypto exchange or wallet.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      number: "02",
      icon: Send,
      title: "Send Proof",
      description: "After payment, send your Transaction ID (TXID) or screenshot to our Telegram.",
      color: "from-primary to-primary/70",
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Get Access",
      description: "Within minutes, you'll receive your exclusive Premium or VIP channel invite link.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <Bitcoin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">Crypto Payments Only</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Get Access</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple 3-step process to unlock exclusive content. Fast, secure, and anonymous.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-sm font-bold text-muted-foreground mb-2">STEP {step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BTC Address Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">BTC Wallet Address</h3>
                <p className="text-sm text-muted-foreground">Send exactly $20 worth of BTC</p>
              </div>
            </div>

            <div className="bg-background/50 border border-border rounded-xl p-4 flex items-center justify-between gap-4 mb-6">
              <code className="text-sm md:text-base font-mono text-foreground break-all">
                {btcAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAddress}
                className="shrink-0 hover:bg-orange-500/10 hover:border-orange-500/50"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
              >
                <a href="https://t.me/LeakEmpireAdmin" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send TXID on Telegram
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-orange-500/30 hover:bg-orange-500/10"
              >
                <a href="https://t.me/LeakEmpireVIP" target="_blank" rel="noopener noreferrer">
                  <Crown className="w-4 h-4 mr-2" />
                  VIP Channel Preview
                </a>
              </Button>
            </div>
          </div>

          {/* Trust note */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 All payments are processed securely. Access granted within 5-15 minutes after verification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToAccess;
