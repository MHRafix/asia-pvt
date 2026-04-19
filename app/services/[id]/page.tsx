import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { toast } from "@/hooks/use-toast";

const schema = yup.object({
  fullName: yup.string().trim().required("Full name is required").max(100),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  phone: yup.string().trim().required("Phone number is required").min(7, "Phone must be at least 7 digits"),
  preferredDate: yup.string().required("Preferred date is required"),
  message: yup.string().trim().max(500, "Message must be under 500 characters"),
});

type FormData = yup.InferType<typeof schema>;

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Appointment Requested!",
      description: `We'll contact you at ${data.email} to confirm your ${service?.title} appointment.`,
    });
    reset();
  };

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Button variant="coral" asChild>
            <Link to="/appointment">Browse Services</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PageBanner title={service.title} subtitle={service.description} />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <ServiceIcon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-body text-sm text-muted-foreground">Duration: {service.duration}</span>
                    </div>
                    <p className="font-body text-muted-foreground leading-relaxed">{service.longDescription}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">What You Get</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-body text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">How It Works</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.process.map((step) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: step.step * 0.1 }}
                      >
                        <Card className="border-0 shadow-soft h-full">
                          <CardContent className="p-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center mb-4">
                              <span className="font-body text-sm font-bold text-primary-foreground">{step.step}</span>
                            </div>
                            <h4 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h4>
                            <p className="font-body text-muted-foreground text-sm">{step.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Booking Form */}
              <div>
                <Card className="border-0 shadow-elevated sticky top-28">
                  <CardContent className="p-8">
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">
                      Book This Service
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-1 block">Full Name</label>
                        <Input {...register("fullName")} placeholder="John Doe" className="bg-muted" />
                        {errors.fullName && <p className="text-destructive text-xs mt-1 font-body">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-1 block">Email</label>
                        <Input {...register("email")} type="email" placeholder="john@example.com" className="bg-muted" />
                        {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-1 block">Phone</label>
                        <Input {...register("phone")} type="tel" placeholder="+1 (555) 123-4567" className="bg-muted" />
                        {errors.phone && <p className="text-destructive text-xs mt-1 font-body">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-1 block">Preferred Date</label>
                        <Input {...register("preferredDate")} type="date" className="bg-muted" />
                        {errors.preferredDate && <p className="text-destructive text-xs mt-1 font-body">{errors.preferredDate.message}</p>}
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-1 block">Message (Optional)</label>
                        <Textarea {...register("message")} placeholder="Any specific requirements..." rows={3} className="bg-muted" />
                        {errors.message && <p className="text-destructive text-xs mt-1 font-body">{errors.message.message}</p>}
                      </div>
                      <Button type="submit" variant="coral" size="lg" className="w-full" disabled={isSubmitting}>
                        Request Appointment
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
