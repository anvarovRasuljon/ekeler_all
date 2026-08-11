import React, { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../../sanity/client';
import AboutCompanyContentBlock from './AboutCompanyContentBlock';
import type { AboutCompanyContentData } from './AboutCompanyContentBlock';
import AboutCompanyBlock from './AboutCompanyBlock';
import type { AboutCompanyBlockData } from './AboutCompanyBlock';
import type { AboutCompanyFeatureData } from './AboutFeatures';
import AboutCompanyFeature from './AboutFeatures';

import aboutMainImg from '../../assets/home_about_first_img.jpg';
import aboutContentImg from '../../assets/home_features_img.png';
import block370_1 from '../../assets/Industry_1.png';
import block370_2 from '../../assets/Industry_2.png';
import block350_1 from '../../assets/Industry_3.png';
import block350_2 from '../../assets/Industry_4.png';
import aboutFeatureImg from '../../assets/home_about_second_img.png';

const DEFAULT_IMAGE_DATA: AboutCompanyImageData = {
  image: aboutMainImg,
};

const DEFAULT_CONTENT_DATA: AboutCompanyContentData = {
  image: aboutContentImg,
  title: { ru: 'О компании', uz: 'Biz Haqimizda', eng: 'About Us' },
  description: {
    ru: `Мы — первая компания, начавшая производство гофрокартона в Узбекистане.`,
    uz: `Biz - O'zbekistonda sota kartonni birinchi ishlab chiqargan kompaniyamiz.`,
    eng: `We are the first company to produce corrugated cardboard in Uzbekistan.`,
  },
  descriptionHighlight: {
    ru: `первая компания, начавшая производство гофрокартона в Узбекистане`,
    uz: `birinchi ishlab chiqargan kompaniyamiz`,
    eng: `the first company to produce corrugated cardboard in Uzbekistan`,
  },
  phone: '+998 90 123 45 67',
  email: 'info@ekeler.uz',
  location: { ru: 'Ташкент, Узбекистан', uz: "Toshkent, O'zbekiston", eng: 'Tashkent, Uzbekistan' },
};
const NAV_HEIGHT_PX = 65;
const IMG_GAP = 30;
const DEFAULT_BLOCK_DATA: AboutCompanyBlockData = {
  title1: { ru: 'О компании', uz: 'Biz Haqimizda', eng: 'About Us' },
  description1: {
    ru: `Ekeler — первая локальная компания по производству гофрокартона, основанная в 2020 году на рынке Узбекистана. До нас этот материал поставлялся только импортом, и клиенты сталкивались с таможенными задержками и дополнительными расходами. Мы запустили производство в Узбекистане, чтобы закрыть эту пустоту.`,
    uz: `Ekeler — 2020-yilda tashkil topgan, O'zbekiston bozorida sota kartonni birinchi ishlab chiqargan kompaniyamiz. Bizgacha bu material faqat import orqali kelib, mijozlar bojxona kechikishlari va qo'shimcha xarajatlarga duch kelishardi. Biz shu bo'shliqni to'ldirish uchun ishlab chiqarishni O'zbekistonda yo'lga qo'ydik.`,
    eng: `Ekeler is the first local company producing corrugated cardboard, founded in 2020 in the Uzbekistan market. Before us, this material was supplied only by import, and customers faced customs delays and extra costs. We launched production in Uzbekistan to fill this gap.`,
  },
  description1Highlight: {
    ru: `первая локальная компания по производству гофрокартона`,
    uz: `birinchi ishlab chiqargan kompaniyamiz`,
    eng: `the first local company producing corrugated cardboard`,
  },
  description1_bottom: {
    ru: `Сегодня продукция Ekeler используется логистическими компаниями, производителями мебели и предприятиями различных отраслей для упаковки, транспортировки и защиты. Каждый заказ адаптируется под требования клиента и готовится в короткие сроки.`,
    uz: `Bugungi kunda Ekeler mahsulotlari logistika kompaniyalari, mebel ishlab chiqaruvchilari va turli sohadagi korxonalar tomonidan qadoqlash, tashish va himoya maqsadlarida qo'llaniladi. Har bir buyurtma mijoz talabiga moslashtirilib, qisqa muddatda tayyorlanadi.`,
    eng: `Today, Ekeler products are used by logistics companies, furniture manufacturers, and enterprises across various industries for packaging, shipping, and protection. Every order is tailored to the client\'s requirements and prepared within a short time.`,
  },
  title2: { ru: 'Наши ценности', uz: 'Qadriyatlarimiz', eng: 'Our Values' },
  description2: {
    ru: `Наша работа основана на трёх вещах: локальность, качество и ответственность. Благодаря местному производству мы избавляем клиентов от импортных задержек и дополнительных расходов, готовим каждый продукт в соответствии с установленными стандартами и строго соблюдаем сроки доставки.`,
    uz: `Bizning ishimiz uchta narsaga asoslanadi: mahalliylik, sifat va mas'uliyat. Mahalliy ishlab chiqarish orqali mijozlarimizni import bilan bog'liq kechikish va qo'shimcha xarajatlardan xalos qilamiz, har bir mahsulotni belgilangan standartlarga mos tayyorlaymiz va yetkazib berish muddatlariga qat'iy rioya qilamiz.`,
    eng: `Our work is based on three things: local sourcing, quality, and responsibility. Through local production, we save customers from import-related delays and extra costs, prepare every product to meet established standards, and strictly adhere to delivery deadlines.`,
  },
  bodyText: {
    ru: `Наша цель — освободить промышленность Узбекистана от зависимости от импортных упаковочных материалов.`,
    uz: `Maqsadimiz — O'zbekiston sanoatini import qadoqlash materiallariga bog'liqlikdan ozod qilish.`,
    eng: `Our goal is to free Uzbekistan's industry from dependence on imported packaging materials.`,
  },
  image370_1: block370_1,
  image370_2: block370_2,
  image350_1: block350_1,
  image350_2: block350_2,
};

const DEFAULT_FEATURE_DATA: AboutCompanyFeatureData = {
  image: aboutFeatureImg,
  title: { ru: 'Технологии', uz: 'Texnologiyamiz', eng: 'Our Technology' },
  description: {
    ru: `Производственный процесс осуществляется на полуавтоматическом оборудовании. Бумажное сырьё превращается в шестигранную ячеистую структуру на специальных станках, затем подгоняется под нужную толщину и размеры. На каждом этапе продукция проходит проверку на прочность и качество.`,
    uz: `Ishlab chiqarish jarayonimiz yarim avtomatlashtirilgan uskunalarda amalga oshiriladi. Qog'oz xomashyosi maxsus jihozlarda olti qirrali uyachali tuzilmaga aylantiriladi, so'ngra kerakli qalinlik va o'lchamlarga moslab kesiladi. Har bir bosqichda mahsulot mustahkamlik va sifat bo'yicha tekshiruvdan o'tkaziladi.`,
    eng: `Our production process is carried out on semi-automated equipment. The paper raw material is turned into a hexagonal honeycomb structure on special machines, then trimmed to the required thickness and dimensions. At every stage, the product is tested for strength and quality.`,
  },
  description_bottom: {
    ru: `Стандартная продукция готовится за 2–3 дня, индивидуальные заказы — за 7 дней. Производственные мощности позволяют доставлять до 100 000 единиц в месяц.`,
    uz: `Standart mahsulotlar 2–3 kun ichida, individual o'lchamdagi buyurtmalar esa 7 kun ichida tayyor bo'ladi. Ishlab chiqarish quvvatimiz oyiga 100 000 donagacha yetkazib berish imkonini beradi.`,
    eng: `Standard products are ready in 2–3 days, custom-sized orders in 7 days. Our production capacity allows us to deliver up to 100,000 units per month.`,
  },
};

interface AboutCompanyImageData {
  image?: unknown;
}

function SanityImage({
  source,
  alt,
  className,
  width,
  height,
  priority = false,
  reveal = 'top-bottom',
}: {
  source: unknown;
  alt?: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  reveal?: 'top-bottom' | 'bottom-top' | 'left-right' | 'right-left' | 'scale';
}) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const url = getImageUrl(source, { width, height });

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    if (priority) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const initialClip =
    reveal === 'bottom-top' ? 'inset(100% 0 0 0)' :
    reveal === 'left-right' ? 'inset(0 100% 0 0)' :
    reveal === 'right-left' ? 'inset(0 0 0 100%)' :
    reveal === 'scale' ? 'inset(0 0 0 0)' :
    'inset(0 0 100% 0)';

  if (!url) return null;
  return (
    <div ref={divRef} className="w-full h-full">
      <img
        src={url}
        alt={alt || ''}
        className={`${className} transition-all duration-700 ${loaded ? 'scale-100 blur-0' : 'scale-95 blur-[15px]'}`}
        style={{ opacity: loaded ? 1 : 0.6, clipPath: visible ? 'inset(0 0 0 0)' : initialClip }}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function useStickyColumn(topOffset: number, bottomGap: number) {
  const containerRef = useRef<HTMLDivElement>(null); // ikki ustunni o'rab turgan qator
  const columnRef = useRef<HTMLDivElement>(null); // o'ng ustun (joy va kenglikni belgilaydi)
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const container = containerRef.current;
      const column = columnRef.current;
      if (!container || !column) return;

      if (window.innerWidth < 1024) {
        setStyle((prev) => (Object.keys(prev).length ? {} : prev));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const stickyHeightPx = Math.max(200, window.innerHeight - topOffset - bottomGap);

      let next: React.CSSProperties;

      if (containerRect.top > topOffset) {
        // Hali sticky nuqtaga yetib kelmadi — oddiy holatda, lekin bir xil balandlikda
        next = { height: stickyHeightPx };
      } else if (containerRect.bottom < topOffset + stickyHeightPx) {
        // Chap ustun tugadi — rasm pastda to'xtaydi, keyingi bo'limni bosib o'tmaydi
        next = {
          position: 'absolute',
          bottom: 0,
          top: 'auto',
          left: 0,
          width: '100%',
          height: stickyHeightPx,
        };
      } else {
        // O'rtada — ekranga "yopishib" turadi
        next = {
          position: 'fixed',
          top: topOffset,
          left: columnRect.left,
          width: columnRect.width,
          height: stickyHeightPx,
        };
      }

      setStyle((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [topOffset, bottomGap]);

  return { containerRef, columnRef, style };
}

function AboutPage({
  imageData = DEFAULT_IMAGE_DATA,
  contentData = DEFAULT_CONTENT_DATA,
  blockData = DEFAULT_BLOCK_DATA,
  featureData = DEFAULT_FEATURE_DATA,
}: {
  imageData?: AboutCompanyImageData | null;
  contentData?: AboutCompanyContentData | null;
  blockData?: AboutCompanyBlockData | null;
  featureData?: AboutCompanyFeatureData | null;
}) {
  const showMainImage = !!imageData?.image;
  const mainImageAlt = (imageData?.image as { alt?: string })?.alt;
  const stickyTop = NAV_HEIGHT_PX + IMG_GAP;

  const { containerRef, columnRef, style: stickyStyle } = useStickyColumn(stickyTop, IMG_GAP);

  const renderMainPortrait = (className: string) =>
    showMainImage ? (
      <SanityImage
        source={imageData!.image}
        alt={mainImageAlt}
        className={className}
        width={900}
        height={1200}
        priority
        reveal="top-bottom"
      />
    ) : null;

  if (!imageData && !contentData && !blockData && !featureData) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 text-center text-neutral-500 font-['Inter']">
        Kontent hali qo&apos;shilmagan. Adminkada «About Company» hujjatlarini yarating.
      </div>
    );
  }

return (
    <div className="w-full bg-white text-[#1B1D20]">
      <div className="pb-16 w-full md:px-6 lg:px-8">
        {/* 50% / 50%, o'rtada 30px */}
        <div ref={containerRef} className="flex relative flex-col gap-[30px] lg:flex-row">
          {/* CHAP — ekran yarmi */}
          <div className="flex flex-col gap-16 w-full min-w-0 lg:w-1/2 md:gap-20">
            <AboutCompanyContentBlock data={contentData} />
            <AboutCompanyBlock data={blockData} />

            {/* Mobil/tablet rasm — Block va Feature orasida, faqat lg dan pastda ko'rinadi */}
            {showMainImage && (
              <div className="lg:hidden w-full rounded-lg overflow-hidden h-[50vh] max-h-[420px]">
                {renderMainPortrait('w-full h-full object-cover')}
              </div>
            )}

            <AboutCompanyFeature data={featureData} />
          </div>

          {/* O'NG — ekran yarmi, JS-based sticky rasm, faqat desktop (lg+) */}
          {showMainImage && (
            <div ref={columnRef} className="hidden relative w-1/2 lg:block shrink-0">
              <div
                className="overflow-hidden rounded-lg"
                style={stickyStyle}
              >
                {renderMainPortrait('w-full h-full object-cover block')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AboutPage);