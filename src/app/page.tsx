import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";


export default function Home() {
  return (
  <main>
    <Slider/>
    <AboutUs />
    <Featured/>
    <Offer/>
    <Gallery />
  </main>
  );
}
