import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { BlogSection } from "@/components/BlogSection";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PageBanner title="Travel Blog" subtitle="Stories, tips, and inspiration for your next adventure" gradient="forest" />
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
