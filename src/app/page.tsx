import TabButton from "@/components/ui/tab-button";

const page = () => {
  return (
    <div>
      <h1 className="text-7xl font-gaegu  text-cateneo-blue">
        Welcome to Cateneo
      </h1>
      <div className="flex gap-2 p-8">
        <TabButton title="button" color="amberLight" state="filled"/>
        <TabButton title="button" color="amberMid" state="filled"/>
        <TabButton title="button" color="cream" state="filled"/>
        <TabButton title="button" color="darkBrown" state="filled"/>
        <TabButton title="button" color="amberOutlined" state="outlined"/>
        <TabButton title="button" color="amberMidOutlined" state="outlined"/>
        <TabButton title="button" color="darkOutlined" state="outlined"/>
        <TabButton title="button" color="brownOutlined" state="outlined"/>
        <TabButton title="button" color="brownMidOutlined" state="outlined"/>
        <TabButton title="button" color="darkMidOutlined" state="outlined"/>
      </div>
    </div>
  );
};

export default page;
