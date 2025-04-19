import { BrowserRouter, Route, Routes } from "react-router-dom";
import BirthdayAnimation from "./BirthdayAnimation";
import HomePage from "./components/HomePage";
import BalloonRoom from "./components/BalloonRoom";
import Gallery from "./components/Gallery";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/birthday-cake" element={<BirthdayAnimation />} />
        <Route path="/balloon-room" element={<BalloonRoom />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
