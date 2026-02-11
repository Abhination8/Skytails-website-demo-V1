import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Hook for submitting the full onboarding flow
export function useSubmitOnboarding() {
  return useMutation({
    mutationFn: async (data: any) => {
      // In a real app, strict typing would match the schema exactly.
      // For this prototype, we're permissive with 'any' to allow partial state from the wizard.
      
      // Validate with Zod before sending if possible, but the API will also validate
      const validated = api.onboarding.submit.input.parse(data);
      
      const res = await fetch(api.onboarding.submit.path, {
        method: api.onboarding.submit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to submit onboarding');
      }

      return api.onboarding.submit.responses[201].parse(await res.json());
    }
  });
}

// Hook for fetching mock dashboard data
export function useMockDashboard() {
  return useQuery({
    queryKey: [api.mock.dashboard.path],
    queryFn: async () => {
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation we would fetch:
      // const res = await fetch(api.mock.dashboard.path);
      // return await res.json();
      
      // Returning static mock data for the prototype as the backend route might be minimal
      return {
        projectedGrowth: [
          { year: '2024', amount: 500 },
          { year: '2025', amount: 1800 },
          { year: '2026', amount: 3500 },
          { year: '2027', amount: 5600 },
          { year: '2028', amount: 8200 },
          { year: '2029', amount: 11500 },
        ],
        careSuggestions: [
          "Annual dental cleaning recommended",
          "Vaccination booster due in 3 months",
          "Consider upgrading to Premium for accident coverage"
        ]
      };
    },
    staleTime: Infinity
  });
}
