import Navbar from "@/components/ui/navigation-bar";
import { RoundedButton } from "@/components/ui/rounded-button";
import DonationSection from "@/components/sections/donation-section";

const page = () => {
  return (
    <>
      <div>
        <h1 className="text-7xl font-gaegu  text-cateneo-blue">
          Welcome to Cateneo
        </h1>
      </div>
      <DonationSection />
    </>
  );
};

export default page;
