import { motion } from "framer-motion";
import { Shield, TrendingUp, Heart, Plus, ChevronRight, CheckCircle2, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import heroPet from "@/assets/hero-pet.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* SECTION 1 – HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroPet} 
            alt="Happy pet" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
              Trusted by 50,000+ Pet Parents
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              Build a healthier <span className="text-primary italic">financial future</span> for your pet.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Automated savings designed around your pet’s life — not complicated insurance. Simple, transparent, and always there when they need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/onboarding">
                <Button size="lg" className="rounded-full px-8 text-lg font-medium shadow-lg shadow-primary/20 hover-elevate">
                  Start Your Pet Journey
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-medium bg-background/50 backdrop-blur-sm hover-elevate">
                See How It Works
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 items-center opacity-70">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider">Secure Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider">Regulated Investing</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider">Social Mission</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 – WHY SKYTAILS */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why choose SkyTails?</h2>
            <p className="text-lg text-muted-foreground">We focus on proactive care, so you can focus on the belly rubs.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: "Proactive Pet Care", 
                desc: "Anticipate wellness needs before they become expensive emergencies.",
                icon: Heart,
                color: "bg-rose-500/10 text-rose-500"
              },
              { 
                title: "Emergency Readiness", 
                desc: "Instant access to funds when every second counts for your best friend.",
                icon: Shield,
                color: "bg-blue-500/10 text-blue-500"
              },
              { 
                title: "Smarter Planning", 
                desc: "AI-driven insights tailored to your pet's breed, age, and lifestyle.",
                icon: TrendingUp,
                color: "bg-emerald-500/10 text-emerald-500"
              }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full hover-elevate border-none shadow-sm transition-all group overflow-visible">
                  <CardHeader className="pt-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${card.color}`}>
                      <card.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 – HOW IT WORKS */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">Your journey in 3 simple steps</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/10 -translate-y-1/2" />
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "1", title: "Add Your Pet", desc: "Tell us about your furry, scaly, or feathered friend.", icon: Plus },
                { step: "2", title: "Choose a Plan", desc: "Select a monthly contribution that fits your budget.", icon: CheckCircle2 },
                { step: "3", title: "Watch It Grow", desc: "Relax knowing your care fund is building security.", icon: Sparkles }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mb-6 shadow-xl shadow-primary/30">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground max-w-[250px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 – PLANS AS PRODUCTS */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Savings plans for every family</h2>
              <p className="text-slate-400 text-lg">Choose the tier that best matches your pet's life stage and needs.</p>
            </div>
            <Link href="/onboarding">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-full px-8 hover-elevate">
                Compare All Features
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: "Classic", price: "$25", features: ["Basic Emergency Fund", "Wellness Reminders", "Social Impact Donation"], accent: "from-blue-500 to-cyan-400" },
              { tier: "Core", price: "$50", features: ["Standard Emergency Access", "Annual Health Rewards", "AI Health Insights"], accent: "from-primary to-indigo-500", popular: true },
              { tier: "Premium", price: "$100", features: ["Unlimited Emergency Care", "Vet Concierge Service", "Luxury Wellness Perk"], accent: "from-amber-400 to-orange-500" }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`relative group rounded-3xl p-px bg-gradient-to-b ${plan.popular ? 'from-primary/50 to-transparent scale-105 z-10' : 'from-white/10 to-transparent'}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white border-none px-4 py-1.5 rounded-full z-20">
                    Most Popular
                  </Badge>
                )}
                <div className="bg-slate-800 rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-slate-300 mb-1">{plan.tier}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-slate-400">/mo</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mock Chart Preview */}
                  <div className="h-24 bg-slate-900/50 rounded-2xl mb-8 flex items-end gap-1 px-4 py-3 border border-white/5">
                    {[30, 45, 35, 60, 55, 80, 95].map((h, k) => (
                      <motion.div 
                        key={k}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className={`flex-1 bg-gradient-to-t ${plan.accent} rounded-t-sm opacity-50`}
                      />
                    ))}
                  </div>

                  <Link href="/onboarding">
                    <Button className={`w-full rounded-xl py-6 font-bold text-lg hover-elevate ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                      Preview My Dashboard
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 – WHAT YOU GET */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Pet Health Insights", desc: "Data-driven advice based on breed and age." },
              { icon: TrendingUp, title: "Automated Savings", desc: "Set it and forget it. Security built over time." },
              { icon: Shield, title: "Emergency Access", desc: "Instant funding for unexpected vet visits." },
              { icon: Heart, title: "Community Impact", desc: "Every plan supports local animal shelters." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 – DASHBOARD PREVIEW */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-none">Dashboard Preview</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">This is what your SkyTails experience looks like.</h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border shadow-2xl bg-white p-4 md:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200" />
                  <div>
                    <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
                    <div className="h-3 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="h-48 rounded-2xl bg-slate-50 border border-dashed flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-slate-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-2xl bg-slate-50 p-4">
                      <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
                      <div className="h-6 w-3/4 bg-slate-300 rounded" />
                    </div>
                    <div className="h-32 rounded-2xl bg-slate-50 p-4">
                      <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
                      <div className="h-6 w-3/4 bg-slate-300 rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-full rounded-2xl bg-primary/5 p-6 border border-primary/10">
                    <Sparkles className="w-8 h-8 text-primary mb-4" />
                    <div className="h-4 w-3/4 bg-primary/20 rounded mb-2" />
                    <div className="h-3 w-full bg-primary/10 rounded mb-1" />
                    <div className="h-3 w-full bg-primary/10 rounded mb-1" />
                    <div className="h-3 w-2/3 bg-primary/10 rounded" />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                <Link href="/onboarding">
                  <Button size="lg" className="rounded-full shadow-2xl hover-elevate">
                    Build Your Custom Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7 – SOCIAL MISSION STORY */}
      <section className="py-32 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Heart className="w-16 h-16 mx-auto mb-8 text-rose-300 fill-rose-300" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Every plan helps another animal find a home.</h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              We donate 5% of all profits to local animal shelters and rescue organizations. Together, we're building a safer world for all pets.
            </p>
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="rounded-full px-12 text-xl font-bold py-8 hover-elevate text-primary">
                Join the Mission
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg" />
            <span className="text-2xl font-bold font-display tracking-tight">SkyTails</span>
          </div>
          <p className="text-muted-foreground">© 2026 SkyTails. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
