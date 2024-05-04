import "./Account.scss";
import { useSelector } from "react-redux";
import { State } from "@/redux/types";
import { AccountMenu } from "./AccountMenu";

export const Account = ({ showAuth }: { showAuth: () => void }) => {
  const isAuth = useSelector((state: State) => state.isAuth);
  const user = useSelector((state: State) => state.user);

  return (
    <div className="auth">
      {isAuth ? (
        <div>
          <AccountMenu user={user} />
        </div>
      ) : (
        <div onClick={showAuth}>Вход</div>
      )}
    </div>
  );
};
