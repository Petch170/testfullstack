import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Userlistpage from "./Userlistpage";
import Createpage from "./Createpage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Userlistpage />} />
          <Route path="/create" element={<Createpage />} />
          <Route path="/create/:id" element={<Createpage />} />
        </Routes>
      </BrowserRouter>
      {/* <Userlistpage />
            <Createpage /> */}
    </div>
  );
}

export default App;
