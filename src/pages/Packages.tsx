import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { PackagesSection } from "@/components/PackagesSection";

const Packages = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PageBanner
          title="Travel Packages"
          subtitle="Explore our curated collection of travel experiences designed to create unforgettable memories"
        />
        <PackagesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
