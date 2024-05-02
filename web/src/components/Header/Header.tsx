import { Auth } from "../Auth/Auth";
import "./Header.scss";

export const Header = () => {
  return (
    <div className="header">
      Logo
      <Auth />
    </div>
  );
};
