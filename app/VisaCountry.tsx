import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileCheck, Clock, DollarSign, Lightbulb, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { countries } from "@/data/countries";

const VisaCountry = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Country Not Found</h1>
          <Button variant="ocean" asChild>
            <Link to="/visa">Browse All Countries</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PageBanner
          title={`${country.flag} ${country.name} Visa`}
          subtitle={`${country.type} — Processing: ${country.processing}`}
          gradient="ocean"
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              Back to Visa Services
            </Button>

            {/* Overview */}
            <div className="max-w-3xl mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{country.description}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Requirements */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-card h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-ocean" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Requirements</h3>
                    </div>
                    <ul className="space-y-3">
                      {country.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-ocean mt-2 flex-shrink-0" />
                          <span className="font-body text-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Documents */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-0 shadow-card h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Documents Needed</h3>
                    </div>
                    <ul className="space-y-3">
                      {country.documents.map((doc) => (
                        <li key={doc} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="font-body text-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Fees & Tips */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Fees */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-0 shadow-card h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-sunset/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Visa Fees</h3>
                    </div>
                    <div className="space-y-4">
                      {country.fees.map((fee) => (
                        <div key={fee.type} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                          <span className="font-body text-foreground">{fee.type}</span>
                          <span className="font-display font-bold text-primary">{fee.amount}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tips */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-0 shadow-card h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-forest" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">Pro Tips</h3>
                    </div>
                    <ul className="space-y-3">
                      {country.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-3">
                          <Lightbulb className="w-4 h-4 text-forest mt-1 flex-shrink-0" />
                          <span className="font-body text-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Card className="border-0 shadow-elevated bg-gradient-ocean">
                <CardContent className="p-12">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">
                    Need Help With Your {country.name} Visa?
                  </h3>
                  <p className="font-body text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                    Our visa specialists will handle the entire application process for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="xl" asChild>
                      <Link to="/services/visa-consultation">
                        Book Visa Consultation
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="heroOutline" size="xl" asChild>
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default VisaCountry;
