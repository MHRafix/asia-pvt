import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { VisaSection } from "@/components/VisaSection";

const Visa = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PageBanner
          title="Visa Services"
          subtitle="Navigate complex visa requirements with expert guidance and hassle-free processing"
          gradient="ocean"
        />
        <VisaSection />
      </div>
      <Footer />
    </div>
  );
};

export default Visa;
