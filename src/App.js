import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Login from "./routes/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="movie/:id" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
