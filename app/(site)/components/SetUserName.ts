import updateLatestUserWithNullUsername from "@/actions/getLatestRegisteredAndSetUserName";
import {useCookies} from "react-cookie";

const setUserName = () => {
  const [cookies, setCookie] = useCookies(['username']);

  updateLatestUserWithNullUsername(cookies.username);
}

export default setUserName