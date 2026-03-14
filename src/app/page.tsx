import TabButton from "@/components/ui/tab-button";
const colors = ["orange", "lightbrown", "darkbrown"] as const;

const page = () => {
  return (
    <div>
      <h1 className="text-7xl font-gaegu  text-cateneo-blue">
        Welcome to Cateneo
      </h1>
      <div className="flex gap-2 p-8">
        {/* LEFT GROUP — white text */}
        <div className="flex flex-col gap-3">
          {colors.map((color) => (
            <div key={color} className="flex gap-3">
              <div className="w-32 h-10">
                <TabButton color={color} style="filled" title="button" />
              </div>
              <div className="w-32 h-10">
                <TabButton color={color} style="filledOutline" title="button" />
              </div>
              <div className="w-32 h-10">
                <TabButton color={color} style="invertedLight" title="button" />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT GROUP — dark text */}
        <div className="flex flex-col gap-3">
          {colors.map((color) => (
            <div key={color} className="flex gap-3">
              <div className="w-32 h-10">
                <TabButton color={color} style="filledDark" title="button" />
              </div>
              <div className="w-32 h-10">
                <TabButton
                  color={color}
                  style="filledDarkOutline"
                  title="button"
                />
              </div>
              <div className="w-32 h-10">
                <TabButton color={color} style="invertedDark" title="button" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
