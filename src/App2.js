import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DirectoryPage from "./directory_page/directory_page";

window.folderViewType = "grid";
function App() {
 
  return (
    <>
      <div className="fullscreen-background">
        <BrowserRouter>
          <Routes>
            <Route path="/:path?" element={<DirectoryPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
