import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./app/App";
import { theme } from "./theme/theme";
import { AuthProvider } from "./hooks/useAuth";
import { ViewportProvider } from "./hooks/useViewport";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          style={{ zIndex: 99999999999999999 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          maxSnack={5}
        >
          <ViewportProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </QueryClientProvider>
          </ViewportProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
