import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Annotate from "./pages/Annotate.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/annotate" element={<Annotate />} />
      </Routes>
    </Router>
  );
}

export default App;
