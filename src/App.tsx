// import { Routes, Route } from "react-router-dom";
// import Navigation from "./components/Home/Navigation";
// import AboutUs from "./components/Home/AboutUs";
// import Statsection from "./components/Home/Statsection";
// import InpusSection from "./components/Home/ScameTypes";
// import Footer from "./components/Home/Footer";
// import ProductsSection from "./components/Home/ProductsSection";
// import CtaSection from "./components/Home/Ctasection";
// import IndustrialGalleryGrid from "./components/Home/IndustrialGalery";
// import MonialsSection from "./components/Home/MonialSection";
// import "./App.css";
// import homeHeroBg from "./assets/Home_hero_bg.png";
// import Hero from "./components/Home/Hero";
// import HomeContactSection from "./components/Home/ContactSection";
// import { ContactSection } from "./components/ContactSection";
// import FeaturesSection from "./components/Home/FeaturesSection";
// import AboutPage from "./components/About/AboutPage";
// import ContactPage from "./components/Contact/ContactPage";
// import FooterSecond from "./components/FooterSecond";
// import ProductHero from "./components/Product/ProductHero";
// import CatalogCtaSection from "./components/Product/ProductCatalog";
// import ProductGrid from "./components/Product/ProductGrid";
// import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
// import ProductCatalog from "./components/Product/ProductDetail/ProductCatalog";
// import { ProductRelativeCard } from "./components/Product/ProductDetail/ProductRelativeCard";
// import BlogHero from "./components/Blog/BlogHero";
// import ContactInfo from "./components/Contact/ContactInfo";
// import NotFoundPage from "./components/NotFound/NotFoundPage";

// function App() {
//   return (
//     <>
//       {/* Responsive: root darajada gorizontal scroll bo'lmasligi kafolatlanadi */}
//       <div className="overflow-x-hidden w-full">
//         <Routes>
//           {/* HOME */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <div className="p-2 w-full min-h-screen">
//                     <div className="flex flex-col">
//                       <div className="order-1 lg:order-2">
//                         <Navigation />
//                       </div>
//                       <div className="order-2 lg:order-1">
//                         <Hero backgroundImage={homeHeroBg} />
//                       </div>
//                     </div>

//                     <AboutUs />
//                      {/* <InpusSection /> */}

//                     <Statsection />

//                     <HomeContactSection />

//                     <FeaturesSection />

//                     <ProductsSection />

//                     <CtaSection />

//                     <IndustrialGalleryGrid />

//                     <MonialsSection />

//                     <InpusSection />
//                 </div>
//                 <Footer />
//               </>
//             }
//           />

//           {/* ABOUT */}
//           <Route
//             path="/about"
//             element={
//               <>
//                 <div className="p-2 w-full min-h-screen">
//                   <Navigation />
//                   <AboutPage />
//                <MonialsSection />
//                   <InpusSection />
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />

//           {/* PRODUCTS */}
//           <Route
//             path="/products"
//             element={
//               <>
//                 <div className="px-2 w-full min-h-screen">
//                   <ProductHero />
//                   <Navigation />
//                   <CatalogCtaSection />
//                   <ProductGrid />
//                   <MonialsSection />
//                   <InpusSection />
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />

//           {/* PRODUCT DETAIL */}
//           <Route
//             path="/products/:slug"
//             element={
//               <>
//                 <div className="px-2 w-full min-h-screen">
//                   <Navigation />
//                   <ProductDetail />
//                   <ProductCatalog/>
//                   <ProductRelativeCard/>
//                   <ContactSection/>
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />

//           {/* BLOG */}
//           <Route
//             path="/blog"
//             element={
//               <>
//                 <div className="px-2 w-full min-h-screen">
//                   <BlogHero/>
//                   <Navigation />
//                   <CtaSection />
//                   <IndustrialGalleryGrid />
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />

//           {/* CONTACT */}
//           <Route
//             path="/contact"
//             element={
//               <>
//                 <div className="px-2 w-full min-h-screen">
//                   <Navigation />
//                   <ContactPage />
//                   <ContactInfo/>
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />

//           {/* 404 */}
//           <Route
//             path="*"
//             element={
//               <>
//                 <div className="px-2 w-full min-h-screen">
//                   <Navigation />
//                   <NotFoundPage />
//                 </div>
//                 <FooterSecond />
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
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
import ProductCatalog from "./components/Product/ProductDetail/ProductCatalog";
import { ProductRelativeCard } from "./components/Product/ProductDetail/ProductRelativeCard";
import ServiceHero from "./components/Service/ServiceHero";
import ContactInfo from "./components/Contact/ContactInfo";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfUsePage from "./components/Legal/TermsOfUsePage";

function App() {
  return (
    <>
      {/*
        MUHIM: bu yerda ilgari "overflow-x-hidden" ishlatilgan edi.
        "overflow-x-hidden" ota elementda turganda u scroll container hosil qiladi,
        va shu sabab ichkaridagi barcha "position: sticky" elementlar (masalan
        AboutPage'dagi sticky rasm) sahifa scroll'iga nisbatan emas, shu divga
        nisbatan ishlashga urinib, umuman qotib qolmay qoladi.

        "overflow-x-clip" xuddi shu tarzda gorizontal scrollni to'sadi, lekin
        scroll container HOSIL QILMAYDI — shuning uchun sticky butun sayt
        bo'ylab to'g'ri ishlaydi.
      */}
      <div className="w-full overflow-x-clip">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <div className="p-2 w-full min-h-screen">
                    {/* Mobil spacer: nav mobilda `fixed` bo'lgani uchun Hero
                        uning ostiga kirib ketmasligi kerak. Desktopda nav
                        Hero'dan KEYIN sticky turadi, shuning uchun spacer yo'q. */}
                    <div className="h-[65px] lg:hidden" aria-hidden="true" />

                    <Hero backgroundImage={homeHeroBg} />

                    {/* Nav DOM'da Hero'dan keyin: desktopda Hero tagida ko'rinadi,
                        mobilda `fixed` bo'lib ekran tepasida turadi. */}
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
                <div className="p-2 w-full min-h-screen">
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
                <div className="p-2 w-full min-h-screen">
                  {/* Mobil spacer: nav mobilda `fixed` bo'lgani uchun ProductHero
                      uning ostiga kirib ketmasligi kerak. */}
                  <div className="h-[65px] lg:hidden" aria-hidden="true" />

                  <ProductHero />

                  <Navigation showSpacer={false} />
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
                <div className="p-2 w-full min-h-screen">
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

          {/* SERVICE */}
          <Route
            path="/service"
            element={
              <>
                <div className="p-2 w-full min-h-screen">
                  <ServiceHero/>
                  <Navigation />
                  <CtaSection />
                  <GalleryCard />
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
                <div className="p-2 w-full min-h-screen">
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