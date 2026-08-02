import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "./components/Home/Navigation";
import AboutUs from "./components/Home/AboutUs";
import Statsection from "./components/Home/Statsection";
import InpusSection from "./components/Home/ScameTypes";
import Footer from "./components/Home/Footer";
import ProductsSection from "./components/Home/ProductsSection";
import CtaSection from "./components/Home/Ctasection";
import IndustrialGalleryGrid from "./components/Home/IndustrialGalery";
import type { GalleryCardData } from "./components/Home/IndustrialGalery";
import MonialsSection from "./components/Home/MonialSection";
import type { Testimonial } from "./components/Home/MonialSection";
import { client, urlFor } from "./sanity/client";
import "./App.css";
import Hero from "./components/Home/Hero";
import ContactSection from "./components/Home/ContactSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import AboutPage from "./components/About/AboutPage";
import FooterSecond from "./components/FooterSecond";
import ProductHero from "./components/Product/ProductHero";
import CatalogCtaSection from "./components/Product/ProductCatalog";
import ProductGrid, { type ProductCardData } from "./components/Product/ProductGrid";
import ProductAbout from "./components/Product/ProductAbout";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import HomePageSkeleton from "./components/Skeleton/HomePageSkeleton";
import AboutPageSkeleton from "./components/Skeleton/AboutPageSkeleton";
import ProductsPageSkeleton from "./components/Skeleton/ProductsPageSkeleton";
import ProductDetailSkeleton from "./components/Skeleton/ProductDetailSkeleton";

const PRODUCT_CARDS_QUERY = `*[_type == "productCard" && isActive != false] | order(order asc){
  _id,
  title,
  tags,
  image { ..., asset->{..., metadata { lqip }} },
  "detailSlug": detail->slug.current
}`;

const getSkeletonByPath = (path: string) => {
  if (path.startsWith('/about')) return <AboutPageSkeleton />;
  if (path.startsWith('/products/')) return <ProductDetailSkeleton />;
  if (path.startsWith('/products')) return <ProductsPageSkeleton />;
  return <HomePageSkeleton />;
};

function App() {
  const [heroData, setHeroData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [statsData, setStatsData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [featuresData, setFeaturesData] = useState<any>(null);
  const [productsData, setProductsData] = useState<any>(null);
  const [ctaData, setCtaData] = useState<any>(null);
  const [galleryData, setGalleryData] = useState<GalleryCardData[]>([]);
  const [testimonialsBg, setTestimonialsBg] = useState<string>("");
  const [testimonialsBgAlt, setTestimonialsBgAlt] = useState<string>("");
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [inpusData, setInpusData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);
  const [footerDataSecond, setFooterDataSecond] = useState<any>(null);
  const [aboutCompanyImage, setAboutCompanyImage] = useState<any>(null);
  const [aboutCompanyContent, setAboutCompanyContent] = useState<any>(null);
  const [aboutCompanyBlock, setAboutCompanyBlock] = useState<any>(null);
  const [aboutCompanyFeature, setAboutCompanyFeature] = useState<any>(null);
  const [productHeroData, setProductHeroData] = useState<any>(null);
  const [catalogCtaData, setCatalogCtaData] = useState<any>(null);
  const [productGridData, setProductGridData] = useState<ProductCardData[]>([]);
  const [productAboutData, setProductAboutData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsSectionRaw = await client.fetch(
          `*[_type == "testimonialsSection" && isActive == true][0]{ backgroundImage { ..., asset->{..., metadata { lqip }} }, testimonials[]{_key, quote, name, location, avatar } }`
        );
        const testimonialsSectionNoFilter = await client.fetch(
          `*[_type == "testimonialsSection"]`
        );

        const [
          hero,
          about,
          stats,
          contact,
          features,
          productSections,
          cta,
          gallery,
          inpusdata,
          footer,
          footerSecond,
          aboutCompanyImageData,
          aboutCompanyContentData,
          aboutCompanyBlockData,
          aboutCompanyFeatureData,
          productHeroDataResult,
          catalogCtaDataResult,
          productCardsRaw,
          productAboutDataResult,
        ] = await Promise.all([
          client.fetch(`*[_type == "hero" && isActive == true] | order(_updatedAt desc)[0]{..., backgroundImage { ..., asset->{..., metadata { lqip }} }}`),
          client.fetch(
            `*[_type == "aboutUs" && isActive != false] | order(_updatedAt desc)[0]{ title, descriptionPart1, descriptionHighlight, descriptionPart2, buttonText, topImage { ..., asset->{..., metadata { lqip }} }, bottomImage { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(
            `*[( _id == "stats" || _type == "stats" ) && isActive != false] | order(_updatedAt desc)[0]{ eyebrow, twoColorMode, description, descriptionPart1, descriptionHighlight, descriptionPart2, miniDescription, statistics, image}`
          ),
          client.fetch(`*[( _id == "contact" || _type == "contact" ) && isActive != false] | order(_updatedAt desc)[0]{ eyebrow, shortDescription, miniDescription, twoColorMode, description, longDescription, descriptionPart1, descriptionHighlight, descriptionPart2, phone, email, mapText, image { ..., asset->{..., metadata { lqip }} }}`),
          client.fetch(`*[_type == "features" && isActive == true] | order(_updatedAt desc)[0]{..., leftImage { ..., asset->{..., metadata { lqip }} }, rightImage { ..., asset->{..., metadata { lqip }} }}`),
          client.fetch(
            `*[_type == "productsSection"]{ products[]{ name, description, image { ..., asset->{..., metadata { lqip }} }}}`
          ),
          client.fetch(
            `*[_type == "ctaSection" && isActive == true] | order(_updatedAt desc)[0]{ badgeText, headingPart1, headingHighlight, headingPart2, buttonText, buttonLink, leftImage { ..., asset->{..., metadata { lqip }} }, rightImage { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(
            `*[_type == "galleryCard"] | order(order asc){ _id, title, tags, description, image { ..., asset->{..., metadata { lqip }} }, order }`
          ),
          client.fetch(
            `*[_id == "inpusSection" || _type == "inpusSection"] | order(_updatedAt desc)[0]{ twoColorMode, badgeText, description, descriptionPart1, descriptionHighlight, descriptionPart2, buttonText, topImage { ..., asset->{..., metadata { lqip }} }, bottomImage { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(
            `*[_type == "footer" && isActive == true] | order(_updatedAt desc)[0]{ backgroundImage { ..., asset->{..., metadata { lqip }} }, heading, ctaText, ctaLink, navLabel, navLinks[]{ label, href, external }, socialLabel, socialLinks[]{ label, href, external }, contactLabel, phone, email, address, copyrightText, privacyPolicyLink, termsOfUseLink}`
          ),
          client.fetch(
            `*[_type == "footerSecond" && isActive == true] | order(_updatedAt desc)[0]{ backgroundImage { ..., asset->{..., metadata { lqip }} }, heading, ctaText, ctaLink, navLabel, navLinks[]{ label, href, external }, socialLabel, socialLinks[]{ label, href, external }, contactLabel, phone, email, address, copyrightText, privacyPolicyLink, termsOfUseLink}`
          ),
          client.fetch(
            `*[_type == "aboutCompany" && isActive == true] | order(_updatedAt desc)[0]{ image { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(
            `*[_type == "aboutCompanyContent" && isActive == true] | order(_updatedAt desc)[0]{ image { ..., asset->{..., metadata { lqip }} }, title, description, phone, email, location}`
          ),
          client.fetch(
            `*[_type == "aboutCompanyBlock" && isActive == true] | order(_updatedAt desc)[0]{ title1, description1, title2, description2, bodyText, image370_1 { ..., asset->{..., metadata { lqip }} }, image370_2 { ..., asset->{..., metadata { lqip }} }, image350_1 { ..., asset->{..., metadata { lqip }} }, image350_2 { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(
            `*[_type == "aboutCompanyFeature" && isActive == true] | order(_updatedAt desc)[0]{ image { ..., asset->{..., metadata { lqip }} }, title, description}`
          ),
          client.fetch(
            `*[_type == "productHero" && isActive == true] | order(_updatedAt desc)[0]{ title, backgroundImage { ..., asset->{..., metadata { lqip }} }, logoText}`
          ),
          client.fetch(
            `*[_type == "catalogCtaSection" && isActive == true] | order(_updatedAt desc)[0]{ title, description, leftImage { ..., asset->{..., metadata { lqip }} }, rightImage { ..., asset->{..., metadata { lqip }} }}`
          ),
          client.fetch(PRODUCT_CARDS_QUERY),
          client.fetch(
            `*[_type == "productAbout" && isActive == true] | order(_updatedAt desc)[0]{
              title,
              descriptionPart1,
              descriptionPart2,
              leftImage { ..., asset->{..., metadata { lqip }} },
              rightImage { ..., asset->{..., metadata { lqip }} },
              buttonText,
              buttonLink
            }`
          ),
        ]);

        const testimonialsSection =
          testimonialsSectionRaw ||
          (testimonialsSectionNoFilter && testimonialsSectionNoFilter[0]) ||
          null;

        const allTestimonials = (testimonialsSectionNoFilter || [])
          .filter((doc: any) => doc.isActive !== false)
          .flatMap((doc: any) => doc.testimonials || []);


        const allProducts = (productSections || []).flatMap(
          (section: any) => section.products || []
        );

        const mappedGallery: GalleryCardData[] = (gallery || []).map(
          (item: any) => ({
            id: item._id,
            title: item.title,
            tags: item.tags || [],
            description: item.description,
            imageUrl: item.image ? urlFor(item.image).width(800).url() : "",
            imageAlt: item.image?.alt,
          })
        );

        const mappedProductCards: ProductCardData[] = (productCardsRaw || []).map(
          (item: any) => ({
            id: item._id,
            title: item.title,
            tags: item.tags || [],
            imageUrl: item.image ? urlFor(item.image).width(800).url() : "",
            imageAlt: item.image?.alt,
            detailSlug: item.detailSlug,
          })
        );

        const mappedTestimonials: Testimonial[] = (allTestimonials || []).map(
          (t: any) => ({
            id: t._key,
            quote: t.quote,
            name: t.name,
            location: t.location,
            avatarUrl: t.avatar ? urlFor(t.avatar).width(96).height(96).url() : "",
          })
        );

        const bgUrl = testimonialsSection?.backgroundImage
          ? urlFor(testimonialsSection.backgroundImage).width(1600).url()
          : "";

        setHeroData(hero);
        setAboutData(about);
        setStatsData(stats);
        setContactData(contact);
        setFeaturesData(features);
        setProductsData({ products: allProducts });
        setCtaData(cta);
        setGalleryData(mappedGallery);
        setTestimonialsBg(bgUrl);
        setTestimonialsBgAlt(testimonialsSection?.backgroundImage?.alt || "");
        setTestimonialsData(mappedTestimonials);
        setInpusData(inpusdata);
        setFooterData(footer);
        setFooterDataSecond(footerSecond);
        setAboutCompanyImage(aboutCompanyImageData);
        setAboutCompanyContent(aboutCompanyContentData);
        setAboutCompanyBlock(aboutCompanyBlockData);
        setAboutCompanyFeature(aboutCompanyFeatureData);
        setProductHeroData(productHeroDataResult);
        setCatalogCtaData(catalogCtaDataResult);
        setProductGridData(mappedProductCards);
        setProductAboutData(productAboutDataResult);
      } catch (error) {
        console.error("[DEBUG] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    return (
      <div className="min-h-screen bg-white">
        {getSkeletonByPath(path)}
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <div className="p-2 min-h-screen">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Hero {...heroData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <Navigation />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <AboutUs {...aboutData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Statsection {...statsData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <ContactSection {...contactData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <FeaturesSection {...featuresData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <ProductsSection {...productsData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <CtaSection {...ctaData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <IndustrialGalleryGrid items={galleryData} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <MonialsSection
                      backgroundImageUrl={testimonialsBg}
                      backgroundImageAlt={testimonialsBgAlt}
                      testimonials={testimonialsData}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <InpusSection {...inpusData} />
                  </motion.div>
                </div>
                <Footer {...(footerData || {})} />
              </>
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <div className="p-2 min-h-screen">
                  <Navigation />
                  <AboutPage
                    imageData={aboutCompanyImage}
                    contentData={aboutCompanyContent}
                    blockData={aboutCompanyBlock}
                    featureData={aboutCompanyFeature}
                  />
                  <MonialsSection
                    backgroundImageUrl={testimonialsBg}
                    backgroundImageAlt={testimonialsBgAlt}
                    testimonials={testimonialsData}
                  />
                  <InpusSection {...inpusData} />
                </div>
                <FooterSecond {...(footerDataSecond || {})} />
              </>
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <>
                <div className="p-2 min-h-screen">
                  <ProductHero data={productHeroData} />
                  <Navigation />
                  <CatalogCtaSection {...(catalogCtaData || {})} />
                  <ProductGrid items={productGridData} />
                  <MonialsSection
                    backgroundImageUrl={testimonialsBg}
                    backgroundImageAlt={testimonialsBgAlt}
                    testimonials={testimonialsData}
                  />
                  <ProductAbout {...(productAboutData || {})} />
                </div>
                <FooterSecond {...(footerDataSecond || {})} />
              </>
            }
          />

          {/* PRODUCT DETAIL */}
          <Route
            path="/products/:slug"
            element={
              <>
                <div className="p-2 min-h-screen">
                  <Navigation />
                  <ProductDetail />
                </div>
                <FooterSecond {...(footerDataSecond || {})} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;