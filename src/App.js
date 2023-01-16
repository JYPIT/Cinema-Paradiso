import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Search from "./routes/Search";
import Join from "./routes/Join";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import Profile from "./routes/Profile";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="movies/:id" element={<Home />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
