import { Analytics } from "@vercel/analytics/react"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
