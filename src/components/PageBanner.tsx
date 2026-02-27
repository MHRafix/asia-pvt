import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle: string;
  gradient?: "hero" | "ocean" | "forest";
}

export function PageBanner({ title, subtitle, gradient = "hero" }: PageBannerProps) {
  const gradientClass =
    gradient === "ocean"
      ? "bg-gradient-ocean"
      : gradient === "forest"
        ? "bg-forest"
        : "bg-gradient-hero";

  return (
    <div className={`${gradientClass} py-20`}>
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-lg text-primary-foreground/80 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
