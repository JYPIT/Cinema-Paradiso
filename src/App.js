import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Search from "./routes/Search";
import axios from "axios";
import Shop from "./routes/Shop";
import Join from "./routes/Join";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="shop" element={<Shop />} />
        <Route path="join" element={<Join />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="movies/:id" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
