import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { api, buildUrl } from "@shared/routes";
import { Button } from "@/components/Button";
import { PetCard } from "@/components/PetCard";
import { GrowthChart } from "@/components/GrowthChart";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, TrendingUp, ShieldCheck, Heart } from "lucide-react";

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: dashboard, isLoading, error } = useQuery({
    queryKey: [api.dashboard.get.path],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", api.auth.logout.path);
    },
    onSuccess: () => {
      queryClient.setQueryData([api.auth.me.path], null);
      setLocation("/");
    },
  });

  useEffect(() => {
    if (error && (error as any).message?.includes("401")) {
      setLocation("/");
    }
  }, [error, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!dashboard) return null;

  const { user, pet, plan, projectedGrowth, careSuggestions } = dashboard;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-body">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold font-display">
              S
            </div>
            <span className="font-display font-bold text-slate-800">SkyTails</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 hidden sm:block">
              {user.email}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-slate-900">
            Welcome back, {user.username.split('@')[0]}
          </h1>
          <p className="text-slate-500">Here's how {pet?.name || 'your pet'}'s future is looking.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {pet && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-bold text-xl">{pet.name}</h2>
                  <p className="text-slate-500">{pet.type} • {pet.age} years</p>
                </div>
                
                <div className="space-y-3 border-t border-slate-50 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Account Type</span>
                    <span className="font-bold text-primary">{plan?.tier || 'Classic'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Monthly Deposit</span>
                    <span className="font-bold text-slate-900">${plan?.monthlyContribution || 0}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Care Suggestions
              </h3>
              <ul className="space-y-4">
                {careSuggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                      {i + 1}
                    </div>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Investment Growth
                  </h3>
                  <p className="text-slate-500 text-sm">Projected care fund value over time</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-slate-400 font-medium">Current Projection</p>
                  <p className="text-4xl font-display font-bold text-slate-900">$6,100</p>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <GrowthChart data={projectedGrowth} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <p className="text-emerald-700 text-sm font-bold mb-1">Tax Advantage</p>
                <p className="text-2xl font-display font-bold text-emerald-900">$420.00</p>
                <p className="text-emerald-600/70 text-xs mt-1">Estimated annual tax savings</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <p className="text-blue-700 text-sm font-bold mb-1">Portfolio Risk</p>
                <p className="text-2xl font-display font-bold text-blue-900">Moderate</p>
                <p className="text-blue-600/70 text-xs mt-1">Based on {plan?.tier} strategy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
