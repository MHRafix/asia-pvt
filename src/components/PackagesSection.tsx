import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { packages } from "@/data/packages";

export function PackagesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm font-medium mb-4">
            Popular Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Curated Travel Packages
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Handpicked experiences designed to give you the adventure of a lifetime
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="group overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/packages/${pkg.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-body text-sm font-medium text-foreground">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="font-body text-sm text-primary font-medium mb-1">{pkg.location}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{pkg.title}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-body text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="font-body text-sm">{pkg.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-body text-sm text-muted-foreground">From</span>
                      <p className="font-display text-2xl font-bold text-foreground">
                        ${pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <Button variant="coral" size="sm" asChild>
                      <Link to={`/packages/${pkg.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/packages">
              View All Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
