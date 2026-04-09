import CateneanCard, {type CatProps} from "@/components/ui/catenean-card";
import KitteneanCard, {type KitteneanProps} from "@/components/ui/kittenean-card";




const kitteneanData: KitteneanProps[] = [
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/200px-Cat_November_2010-1a.jpg",
    name: "Iggy",
    gender: "male",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["white", "black"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "A sleepy cuddle bug who loves warm laps and quiet corners. Iggy is calm, gentle, and happiest when napping beside his favorite human.",
    svgColor: "darkbrown",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/200px-Kittyply_edit1.jpg",
    name: "Peddy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "06/12/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["black", "lightbrown", "white"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Energetic and playful, Peddy turns everything into a toy. She loves chasing strings, climbing furniture, and being the center of attention.",
    svgColor: "darkbrown",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    name: "Favvy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["lightbrown", "white"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Quiet and gentle, Favvy is a shy sweetheart who warms up slowly. Once comfortable, she loves soft pets and staying close to her person.",
    svgColor: "orange",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg",
    name: "Anchy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["white", "lightbrown"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Curious and mischievous, Anchy loves exploring and investigating everything. She’s playful, brave, and always the first to discover new places.",
    svgColor: "orange",
  },
];


export default function TestPage() {
  return (
    <div className="min-h-screen bg-cateneo-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-cateneo-darkbrown">Kitteneans</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kitteneanData.map((kittenean) => (
              <KitteneanCard key={kittenean.name} {...kittenean} />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
