import { AuthProvider } from "./AuthContext";

const ContextsIndex = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextsIndex;
