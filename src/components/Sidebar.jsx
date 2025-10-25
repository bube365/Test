import { Link2, Receipt, Folder, FileText } from "lucide-react";
import { barIcon1, barIcon2, barIcon3, barIcon4 } from "../assets/icons";

const Sidebar = () => {
  const links = [
    {
      icon: barIcon1,
    },
    {
      icon: barIcon2,
    },
    {
      icon: barIcon3,
    },
    {
      icon: barIcon4,
    },
  ];
  return (
    <aside className="fixed left-1 sm:left-4 top-0 bottom-0 w-fit  flex flex-col items-center justify-center py-6 gap-6">
      <div className="bg-white shadow-xl w-full flex flex-col gap-4 p-1 rounded-3xl">
        {links?.map((link, idx) => {
          return (
            <button
              key={idx}
              className="p-1 sm:p-3 hover:bg-gray-50 rounded-lg text-gray-400"
            >
              <img
                src={link?.icon}
                className="mix-blend-luminosity"
                alt="icon"
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
