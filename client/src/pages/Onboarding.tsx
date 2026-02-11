import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PetCard } from "@/components/PetCard";
import { GrowthChart } from "@/components/GrowthChart";
import { useSubmitOnboarding, useMockDashboard } from "@/hooks/use-onboarding";
import { ChevronRight, ChevronLeft, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, Lock, Dog, Cat } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

// === TYPES ===
type WizardStep = 0 | 1 | 2 | 3 | 4 | 5;

interface FormData {
  petName: string;
  petType: "Dog" | "Cat" | "Other";
  petAge: number;
  planTier: "Classic" | "Core" | "Premium";
  monthlyContribution: number;
  email: string;
  password: string;
  country: string;
}

const INITIAL_DATA: FormData = {
  petName: "",
  petType: "Dog",
  petAge: 3,
  planTier: "Core",
  monthlyContribution: 50,
  email: "",
  password: "",
  country: "",
};

// === SUB-COMPONENTS ===

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  // Only show progress for steps 1-5 (index 1-5)
  if (step === 0) return null;
  
  const progress = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold font-display">
            S
          </div>
          <span className="font-display font-bold text-slate-800 hidden sm:block">SkyTails</span>
        </div>
        
        <div className="flex flex-col w-full max-w-xs mx-4 sm:mx-8">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Progress</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>

        <div className="w-8" /> {/* Spacer for balance */}
      </div>
    </div>
  );
}

// === MAIN PAGE ===

export default function Onboarding() {
  const [step, setStep] = useState<WizardStep>(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const submitMutation = useSubmitOnboarding();
  const { data: dashboardData } = useMockDashboard();

  const handleNext = () => setStep((s) => Math.min(s + 1, 5) as WizardStep);
  const handleBack = () => setStep((s) => Math.max(s - 1, 0) as WizardStep);
  
  const updateData = (updates: Partial<FormData>) => setData(prev => ({ ...prev, ...updates }));

  const handleSubmit = async () => {
    try {
      await submitMutation.mutateAsync({
        user: { email: data.email, password: data.password, country: data.country },
        pet: { name: data.petName, type: data.petType, age: data.petAge },
        plan: { tier: data.planTier, monthlyContribution: data.monthlyContribution },
      });
      
      toast({
        title: "Welcome to SkyTails!",
        description: "Your account has been created successfully.",
      });
      
      // In a real app, redirect to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please check your details and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 pb-20">
      <ProgressBar step={step} totalSteps={5} />

      <main className={`transition-all duration-500 ${step > 0 ? "pt-24" : "pt-0"}`}>
        <AnimatePresence mode="wait">
          
          {/* LANDING HERO */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white"
            >
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Smart savings for smarter pet parents</span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                      Build your pet’s <span className="text-primary">financial future</span> without the insurance mess.
                    </h1>
                    
                    <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      SkyTails helps you automate savings for vet bills, investing your money so it grows alongside your pet.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button size="lg" onClick={handleNext} className="text-lg h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                        Start in 30 seconds
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg h-14 rounded-2xl border-2 hover:bg-slate-50">
                        See Sample Dashboard
                      </Button>
                    </div>

                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-400">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Bank-level Security
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" /> Automated Investing
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Hero Graphic */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative hidden lg:block"
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-700/50">
                      <img 
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000"
                        alt="Happy dog running"
                        className="w-full h-auto opacity-90"
                      />
                      <div className="p-6 bg-slate-800/90 backdrop-blur absolute bottom-0 inset-x-0 border-t border-slate-700">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-slate-400 text-sm">Total Saved</p>
                            <p className="text-white font-display text-3xl font-bold">$3,420.50</p>
                          </div>
                          <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                            +12.4%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: PET INFORMATION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto px-4"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Let's meet your best friend ❤️</h2>
                <p className="text-slate-500">Who is this fund for?</p>
              </div>

              <div className="space-y-8">
                <PetCard name={data.petName} type={data.petType} age={data.petAge} />

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Pet's Name</label>
                    <Input 
                      value={data.petName} 
                      onChange={(e) => updateData({ petName: e.target.value })}
                      placeholder="e.g. Buddy"
                      className="bg-slate-50 border-slate-200"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Type of Pet</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Dog", "Cat", "Other"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => updateData({ petType: type })}
                          className={`
                            py-3 px-4 rounded-xl border-2 font-medium transition-all
                            ${data.petType === type 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"}
                          `}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-semibold text-slate-700">Age</label>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 rounded-md">{data.petAge} years</span>
                    </div>
                    <Slider 
                      value={[data.petAge]} 
                      min={0} 
                      max={20} 
                      step={1} 
                      onValueChange={([val]) => updateData({ petAge: val })}
                      className="py-4"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} disabled={!data.petName} size="lg" className="w-full sm:w-auto">
                    Next Step <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PLAN SELECTION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto px-4"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Choose your growth plan</h2>
                <p className="text-slate-500">Simple, transparent tiers for {data.petName || "your pet"}.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { name: "Classic", amount: 5, desc: "Safe savings, low risk.", color: "bg-slate-100", activeColor: "border-slate-400" },
                  { name: "Core", amount: 10, desc: "Balanced growth.", color: "bg-primary/5", activeColor: "border-primary ring-2 ring-primary/20" },
                  { name: "Premium", amount: 15, desc: "Aggressive growth + Perks", color: "bg-indigo-50", activeColor: "border-indigo-400" }
                ].map((tier) => (
                  <div
                    key={tier.name}
                    onClick={() => updateData({ planTier: tier.name as any, monthlyContribution: tier.amount })}
                    className={`
                      relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]
                      ${data.planTier === tier.name ? `${tier.activeColor} bg-white shadow-xl shadow-primary/5` : "border-transparent bg-white shadow-md hover:shadow-lg"}
                    `}
                  >
                    {data.planTier === tier.name && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        SELECTED
                      </div>
                    )}
                    <h3 className="font-display font-bold text-xl mb-1">{tier.name}</h3>
                    <p className="font-bold text-primary mb-1">${tier.amount}/mo</p>
                    <p className="text-slate-500 text-sm mb-4">{tier.desc}</p>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${data.planTier === tier.name ? "bg-primary" : "bg-slate-300"}`} style={{ width: tier.name === "Classic" ? '30%' : tier.name === "Core" ? '60%' : '90%' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-bold text-slate-900">Custom Contribution</h4>
                    <p className="text-sm text-slate-500">Fine-tune your savings</p>
                  </div>
                  <div className="text-3xl font-display font-bold text-primary">
                    ${data.monthlyContribution}
                  </div>
                </div>
                
                <Slider 
                  value={[data.monthlyContribution]} 
                  min={10} 
                  max={500} 
                  step={10}
                  onValueChange={([val]) => updateData({ monthlyContribution: val })}
                />
                
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <p className="text-sm font-medium text-slate-500 mb-2">Projected Value in 5 Years</p>
                  <p className="text-4xl font-display font-bold text-emerald-600">
                    ${(data.monthlyContribution * 12 * 5 * 1.07).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">*Assuming 7% annual return. Not guaranteed.</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-12 max-w-xl mx-auto">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button size="lg" onClick={handleNext}>
                  Preview Dashboard <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DASHBOARD PREVIEW */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-6xl mx-auto px-4"
            >
              <div className="text-center mb-8">
                <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  Future Preview Mode
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-900">
                  Here is {data.petName}'s Future
                </h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Pet Profile */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {data.petType === "Cat" ? <Cat className="w-12 h-12 text-primary"/> : <Dog className="w-12 h-12 text-primary"/>}
                    </div>
                    <h3 className="font-bold text-xl">{data.petName}</h3>
                    <p className="text-slate-500">{data.petType} • {data.petAge} years old</p>
                    <div className="mt-6 flex justify-between text-sm border-t border-slate-100 pt-4">
                      <span className="text-slate-500">Plan</span>
                      <span className="font-bold text-primary">{data.planTier}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-slate-500">Monthly</span>
                      <span className="font-bold text-slate-900">${data.monthlyContribution}</span>
                    </div>
                  </div>

                  <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                     {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                    
                    <h4 className="font-bold text-lg mb-4 relative z-10">Care Suggestions</h4>
                    <ul className="space-y-3 text-sm text-indigo-100 relative z-10">
                      {dashboardData?.careSuggestions.map((suggestion, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Charts & Data */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Projected Growth</h3>
                        <p className="text-slate-500 text-sm">Based on ${data.monthlyContribution}/mo contribution</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400 font-medium">Est. Value in 2029</p>
                        <p className="text-3xl font-display font-bold text-slate-900">$11,500</p>
                      </div>
                    </div>
                    
                    {dashboardData ? (
                      <GrowthChart data={dashboardData.projectedGrowth} />
                    ) : (
                      <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-2xl animate-pulse">
                        <span className="text-slate-400 font-medium">Loading projection...</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-8 text-white flex justify-between items-center shadow-2xl">
                    <div>
                      <h3 className="font-bold text-xl mb-1">Looks good?</h3>
                      <p className="text-slate-400">Claim this account to start saving today.</p>
                    </div>
                    <Button onClick={handleNext} size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-none border-0">
                      Create Account
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: ACCOUNT CREATION */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto px-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Secure your account</h2>
                <p className="text-slate-500">Step 4 of 5</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={data.email}
                      onChange={(e) => updateData({ email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={data.password}
                      onChange={(e) => updateData({ password: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Country of Residence</label>
                    <select 
                      className="w-full h-12 rounded-xl border-2 border-slate-200 px-4 bg-white text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      value={data.country}
                      onChange={(e) => updateData({ country: e.target.value })}
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleNext} 
                    className="w-full h-12 text-base"
                    disabled={!data.email || !data.password || !data.country}
                  >
                    Continue
                  </Button>
                </div>
                
                <p className="text-xs text-center text-slate-400 leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy Policy. 
                  Your data is encrypted and secure.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 5: FINANCIAL DETAILS (Progressive Disclosure) */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto px-4"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Final Details</h2>
                <p className="text-slate-500">Just a few more things to set up your fund.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Identity Verification", icon: ShieldCheck, complete: false },
                  { title: "Payment Setup", icon: Lock, complete: false },
                  { title: "Investment Preferences", icon: TrendingUp, complete: false },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-bold text-slate-700">{item.title}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center gap-4">
                <Button 
                  size="lg" 
                  onClick={handleSubmit} 
                  className="w-full sm:w-auto min-w-[200px]"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Setting up..." : "Complete Setup"}
                </Button>
                <Button variant="ghost" onClick={handleBack} className="text-slate-400">
                  Back
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
