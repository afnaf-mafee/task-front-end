import { useSelector } from "react-redux";

const useAuthData = () => {
  const authData = useSelector((state) => state?.auth);

  return authData;
};

export default useAuthData;
