import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Home/Navigation";
import AboutUs from "./components/Home/AboutUs";
import Statsection from "./components/Home/Statsection";
import InpusSection from "./components/Home/ScameTypes";
import Footer from "./components/Home/Footer";
import ProductsSection from "./components/Home/ProductsSection";
import CtaSection from "./components/Home/Ctasection";
import IndustrialGalleryGrid from "./components/Home/IndustrialGalery";
import MonialsSection from "./components/Home/MonialSection";
import "./App.css";
import homeHeroBg from "./assets/Home_hero_bg.png";
import Hero from "./components/Home/Hero";
import HomeContactSection from "./components/Home/ContactSection";
import { ContactSection } from "./components/ContactSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import AboutPage from "./components/About/AboutPage";
import ContactPage from "./components/Contact/ContactPage";
import FooterSecond from "./components/FooterSecond";
import ProductHero from "./components/Product/ProductHero";
import CatalogCtaSection from "./components/Product/ProductCatalog";
import ProductGrid from "./components/Product/ProductGrid";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import ProductCatalog from "./components/Product/ProductDetail/ProductCatalog";
import { ProductRelativeCard } from "./components/Product/ProductDetail/ProductRelativeCard";
import BlogHero from "./components/Blog/BlogHero";
import ContactInfo from "./components/Contact/ContactInfo";
import NotFoundPage from "./components/NotFound/NotFoundPage";

function App() {
  return (
    <>
      {/* Responsive: root darajada gorizontal scroll bo'lmasligi kafolatlanadi */}
      <div className="overflow-x-hidden w-full">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <div className="p-2 w-full min-h-screen">
                    <Hero backgroundImage={homeHeroBg} />

                    <Navigation />

                    <AboutUs />

                    <Statsection />

                    <HomeContactSection />

                    <FeaturesSection />

                    <ProductsSection />

                    <CtaSection />

                    <IndustrialGalleryGrid />

                    <MonialsSection />

                    <InpusSection />
                </div>
                <Footer />
              </>
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <Navigation />
                  <AboutPage />
               <MonialsSection />
                  <InpusSection />
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <ProductHero />
                  <Navigation />
                  <CatalogCtaSection />
                  <ProductGrid />
                  <MonialsSection />
                  <InpusSection />
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* PRODUCT DETAIL */}
          <Route
            path="/products/:slug"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <Navigation />
                  <ProductDetail />
                  <ProductCatalog/>
                  <ProductRelativeCard/>
                  <ContactSection/>
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* BLOG */}
          <Route
            path="/blog"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <BlogHero/>
                  <Navigation />
                  <CtaSection />
                  <IndustrialGalleryGrid />
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <Navigation />
                  <ContactPage />
                  <ContactInfo/>
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <div className="px-2 w-full min-h-screen">
                  <Navigation />
                  <NotFoundPage />
                </div>
                <FooterSecond />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;