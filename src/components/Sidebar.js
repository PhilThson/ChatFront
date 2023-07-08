import { SidebarData } from "./SidebarData";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <ul className="sidebar-list">
      {SidebarData.map((element, i) => {
        return (
          <li key={i} onClick={() => handleClick(element.link)}>
            <div id="icon">{element.icon}</div>{" "}
            <div id="title">{element.title}</div>
          </li>
        )
      })}
    </ul>
  );
};

export default Sidebar;