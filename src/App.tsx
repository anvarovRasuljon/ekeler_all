import { Suspense, lazy } from "react";
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
import FooterSecond from "./components/FooterSecond";
import ContactInfo from "./components/Contact/ContactInfo";
import NotFoundPage from "./components/NotFound/NotFoundPage";

const AboutPage = lazy(() => import("./components/About/AboutPage"));
const ContactPage = lazy(() => import("./components/Contact/ContactPage"));
const ProductHero = lazy(() => import("./components/Product/ProductHero"));
const CatalogCtaSection = lazy(() => import("./components/Product/ProductCatalog"));
const ProductGrid = lazy(() => import("./components/Product/ProductGrid"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail/ProductDetail"));
const ProductRelativeCard = lazy(() => import("./components/Product/ProductDetail/ProductRelativeCard").then(m => ({ default: m.ProductRelativeCard })));
const ServiceHero = lazy(() => import("./components/Service/ServiceHero"));
const ServiceCtaSection = lazy(() => import("./components/Service/ServiceCtaSection"));
const PrivacyPolicyPage = lazy(() => import("./components/Legal/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./components/Legal/TermsOfUsePage"));

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
                <div className="p-2 w-full min-h-screen">
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
              <Suspense fallback={null}>
                <>
                  <div className="p-2 w-full min-h-screen">
                    <Navigation />
                    <AboutPage />
                    <MonialsSection />
                    <InpusSection buttonLink="/contact-us" />
                  </div>
                  <FooterSecond />
                </>
              </Suspense>
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <Suspense fallback={null}>
                <>
                  <div className="p-2 w-full min-h-screen">
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
              </Suspense>
            }
          />

          {/* PRODUCT DETAIL */}
          <Route
            path="/products/:slug"
            element={
              <Suspense fallback={null}>
                <>
                  <div className="p-2 w-full min-h-screen">
                    <Navigation />
                    <ProductDetail />
                    <FeaturesSection/>
                    <ProductRelativeCard/>
                    <ContactSection/>
                  </div>
                  <FooterSecond />
                </>
              </Suspense>
            }
          />

          {/* SERVICE */}
          <Route
            path="/industries"
            element={
              <Suspense fallback={null}>
                <>
                  <div className="px-2 pt-2 w-full">
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
              </Suspense>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact-us"
            element={
              <Suspense fallback={null}>
                <>
                  <div className="p-2 w-full min-h-screen">
                    <Navigation />
                    <ContactPage />
                    <ContactInfo/>
                  </div>
                  <FooterSecond />
                </>
              </Suspense>
            }
          />

          {/* PRIVACY POLICY */}
          <Route
            path="/privacy-policy"
            element={<Suspense fallback={null}><PrivacyPolicyPage /></Suspense>}
          />

          {/* TERMS OF USE */}
          <Route
            path="/terms-of-use"
            element={<Suspense fallback={null}><TermsOfUsePage /></Suspense>}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <div className="p-2 w-full min-h-screen">
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