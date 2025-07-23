import { NavLink } from "react-router-dom";
import { Trophy, Settings } from "lucide-react";

interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
}

const Navigation = () => {
  const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
    `flex items-center gap-2 px-4 py-2 border-b-2 transition-colors duration-200 ${
      isActive
        ? "border-blue-500 text-white"
        : "border-transparent text-gray-300 hover:text-white"
    }`;

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Relax App</div>
        <div className="flex items-center gap-4">
          <NavLink to="/leaderboard" className={getLinkClass}>
            <Trophy className="w-5 h-5 text-white" />
            <span className="text-white">Leaderboard</span>
          </NavLink>
          <NavLink to="/admin" className={getLinkClass}>
            <Settings className="w-5 h-5 text-white" />
            <span className="text-white">Admin</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
