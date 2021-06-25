import { BrowserRouter } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import CenterLoader from "../components/CenterLoader";
import { AuthorizedRoutes, UnauthorizedRoutes } from "./Routes";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <BrowserRouter>
      {isAuthenticated ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
    </BrowserRouter>
  );
}

export default App;
