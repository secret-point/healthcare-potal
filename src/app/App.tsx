import { BrowserRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import { useAuth } from "src/hooks/useAuth";
import CenterLoader from "src/components/CenterLoader";
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
