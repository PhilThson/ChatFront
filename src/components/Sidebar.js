import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);
  const handleClick = (route) => navigate(route);

  return (
    <nav>
      <div className="menu-icon" onClick={showSidebar}>
        <MenuIcon />
      </div>
      <ul className={sidebar ? "open" : ""}>
        {SidebarData.map((element, i) => {
          return (
            <li key={i} onClick={() => handleClick(element.link)}>
              <div id="icon">{element.icon}</div>{" "}
              <div id="title">{element.title}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
