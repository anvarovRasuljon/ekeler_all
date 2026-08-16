import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Home/Navigation";
import AboutUs from "./components/Home/AboutUs";
import Statsection from "./components/Home/Statsection";
import InpusSection from "./components/Home/ScameTypes";
import Footer from "./components/Home/Footer";
import ProductsSection from "./components/Home/ProductsSection";
import CtaSection from "./components/Home/Ctasection";
import GalleryCard from "./components/Home/IndustrialGalery";
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

import { ProductRelativeCard } from "./components/Product/ProductDetail/ProductRelativeCard";
import ServiceHero from "./components/Service/ServiceHero";
import ServiceCtaSection from "./components/Service/ServiceCtaSection";
import ContactInfo from "./components/Contact/ContactInfo";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfUsePage from "./components/Legal/TermsOfUsePage";

function App() {
  return (
    <>
      <div className="w-full overflow-x-clip">
        <Routes>
          {/* ROOT REDIRECT */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* HOME */}
          <Route
            path="/home"
            element={
              <>
                <div className="w-full min-h-screen p-2">
                    {/* Mobil spacer: nav mobilda `fixed` bo'lgani uchun Hero
                        uning ostiga kirib ketmasligi kerak. */}
                    <div className="h-[65px] lg:hidden" aria-hidden="true" />

                    <Hero backgroundImage={homeHeroBg} />

                    {/* Nav DOM'da Hero'dan keyin: desktopda nav hero tagida ko'rinadi. */}
                    <Navigation showSpacer={false} />

                    <AboutUs />
                     {/* <InpusSection /> */}

                    <Statsection />

                    <HomeContactSection />

                    <FeaturesSection />

                    <ProductsSection />
 <CtaSection />

                    <GalleryCard />
  
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
                <div className="w-full min-h-screen p-2">
                  <Navigation />
                  <AboutPage />
               <MonialsSection />
                  <InpusSection buttonLink="/contact-us" />
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
                <div className="w-full min-h-screen p-2">
                  {/* Mobil spacer: nav mobilda `fixed` bo'lgani uchun ProductHero
                      uning ostiga kirib ketmasligi kerak. */}
                  <div className="h-[65px] lg:hidden" aria-hidden="true" />

                  <ProductHero />

                  <Navigation showSpacer={false} />
                  <CatalogCtaSection />
                  <ProductGrid />
                  <MonialsSection />
                  <InpusSection buttonLink="/contact-us" />
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
                <div className="w-full min-h-screen p-2">
                  <Navigation />
                  <ProductDetail />
                  {/* <ProductCatalog/> */}
                  <FeaturesSection/>
                  <ProductRelativeCard/>
                  <ContactSection/>
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* SERVICE */}
          <Route
            path="/industries"
            element={
              <>
                <div className="w-full px-2 pt-2">
                  {/* Mobil spacer: nav mobilda `fixed` bo'lgani uchun ServiceHero
                      uning ostiga kirib ketmasligi kerak. */}
                  <div className="h-[65px] lg:hidden" aria-hidden="true" />

                  <ServiceHero/>

                  <Navigation showSpacer={false} />
                    </div>
                    
                      <div className="px-6 w-full min-h-screen bg-[#FFF7F0]">
                  <ServiceCtaSection />
                  <GalleryCard />
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact-us"
            element={
              <>
                <div className="w-full min-h-screen p-2">
                  <Navigation />
                  <ContactPage />
                  <ContactInfo/>
                </div>
                <FooterSecond />
              </>
            }
          />

          {/* PRIVACY POLICY */}
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage />}
          />

          {/* TERMS OF USE */}
          <Route
            path="/terms-of-use"
            element={<TermsOfUsePage />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <div className="w-full min-h-screen p-2">
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