import Navbar from "@/components/ui/navigation-bar";
import { RoundedButton } from "@/components/ui/rounded-button";

const page = () => {
  return (
    <>
      <div>
        <Navbar/>
        <h1 className="text-7xl font-gaegu  text-cateneo-blue">
          Welcome to Cateneo
        </h1>
      </div>
    </>
  );
};

export default page;
