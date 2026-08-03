import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
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
                <div className="p-1 min-h-screen sm:p-2">
                  {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <Hero backgroundImage={homeHeroBg} />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  > */}
                    <Navigation />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <AboutUs />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <Statsection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <HomeContactSection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <FeaturesSection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <ProductsSection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <CtaSection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <IndustrialGalleryGrid />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <MonialsSection />
                  {/* </motion.div> */}

                  {/* <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  > */}
                    <InpusSection />
                  {/* </motion.div> */}
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
                <div className="p-1 min-h-screen sm:p-2">
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
                <div className="p-1 min-h-screen sm:p-2">
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
                <div className="p-1 min-h-screen sm:p-2">
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
                <div className="p-1 min-h-screen sm:p-2">
                  <BlogHero/>
                  <Navigation />
  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <CtaSection />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <IndustrialGalleryGrid />
                  </motion.div>
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
                <div className="p-1 min-h-screen sm:p-2">
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
               <div>
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