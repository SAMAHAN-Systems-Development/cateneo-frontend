import Navbar from "@/components/ui/navigation-bar";
import Footer from "@/components/ui/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cateneo-white">
      <Navbar />

      {/* Page content */}
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
}