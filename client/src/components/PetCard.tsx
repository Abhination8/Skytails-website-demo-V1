import { motion } from "framer-motion";
import { Dog, Cat, Rabbit } from "lucide-react";

interface PetCardProps {
  name: string;
  type: string;
  age: number;
}

export function PetCard({ name, type, age }: PetCardProps) {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "cat": return <Cat className="w-8 h-8 text-primary" />;
      case "other": return <Rabbit className="w-8 h-8 text-primary" />;
      default: return <Dog className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
      
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 z-10">
        {getIcon()}
      </div>
      
      <div className="flex-1 z-10">
        <h3 className="font-display font-bold text-lg text-slate-800">
          {name || "Your Pet"}
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          {age} {age === 1 ? 'year' : 'years'} old {type}
        </p>
      </div>

      <div className="text-right z-10">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full">
          Live Preview
        </div>
      </div>
    </motion.div>
  );
}
