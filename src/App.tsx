import "./App.css";
import Navigation from "./components/Navigation";
import { Outlet, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navigation />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
