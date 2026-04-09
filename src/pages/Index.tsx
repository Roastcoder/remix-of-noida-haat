import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Mail, Truck, Shield, MapPin, Award, Users, Heart, Palette, Gem
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProductCard } from "@/components/ProductCard";
import { PremiumHeroBanner } from "@/components/PremiumHeroBanner";
import { ContactSection } from "@/components/ContactSection";
import { InfiniteServiceCarousel } from "@/components/InfiniteServiceCarousel";
import { useBanners } from "@/hooks/use-banners";
import { useProducts } from "@/hooks/use-products";
import { categories, services } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

import bannerArtisan from "@/assets/banner-artisan.jpg";
import bannerEco from "@/assets/banner-eco.jpg";

import catPottery from "@/assets/cat-pottery.jpg";
import catJewelry from "@/assets/cat-jewelry.jpg";
import catTextiles from "@/assets/cat-textiles.jpg";
import catArt from "@/assets/cat-art.jpg";
import catHomedecor from "@/assets/cat-homedecor.jpg";

const serviceCards = [
  { image: catPottery, label: "Pottery", link: "/category/pottery" },
  { image: catJewelry, label: "Jewelry", link: "/category/jewelry" },
  { image: catTextiles, label: "Textiles", link: "/category/textiles" },
  { image: catArt, label: "Art", link: "/category/art" },
  { image: catHomedecor, label: "Home Decor", link: "/category/homedecor" },
];

const trustStats = [
  { icon: Star, value: "4.9★", label: "Customer Rating", color: "text-yellow-500" },
  { icon: Palette, value: "500+", label: "Artisan Products", color: "text-primary" },
  { icon: Users, value: "10,000+", label: "Happy Customers", color: "text-primary" },
  { icon: Heart, value: "200+", label: "Artisans Supported", color: "text-red-500" },
];

const trustBadges = [
  { icon: Truck, label: "Free Delivery", desc: "Pan India Shipping" },
  { icon: Shield, label: "100% Handcrafted", desc: "Authentic artisan products" },
  { icon: Gem, label: "Eco-Friendly", desc: "Sustainable materials" },
];

const fallbackPromos = [
  { image: bannerArtisan, title: "Meet Our Artisans", subtitle: "Every product tells a story of tradition & skill", link: "/about" },
  { image: bannerEco, title: "Eco-Friendly Crafts", subtitle: "Sustainable, handmade & good for the planet", link: "/category/gifts" },
];

function PromoBannerCard({ image, title, subtitle, link }: { image: string; title: string; subtitle: string; link: string }) {
  return (
    <section className="py-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <Link to={link} className="block rounded-xl overflow-hidden relative group">
          <img src={image} alt={title} className="w-full h-[120px] sm:h-[160px] md:h-[180px] object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 sm:px-8">
            <div>
              <h3 className="text-white text-sm sm:text-lg md:text-2xl font-bold">{title}</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">{subtitle}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-3 sm:p-4">
          <Skeleton className="w-full aspect-square rounded-lg mb-3" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const { t } = useTranslation();
  const { data: dbPromos } = useBanners("home", "promo");
  const { data: products = [], isLoading } = useProducts();

  const promos = dbPromos && dbPromos.length > 0
    ? dbPromos.map(b => ({ image: b.image_url, title: b.title, subtitle: b.subtitle || "", link: b.cta_link }))
    : fallbackPromos;

  const bestSellers = products.filter((p) => p.badge).slice(0, 8);
  const newArrivals = products.slice(0, 4);

  return (
    <div className="bg-background">
      <PremiumHeroBanner />

      {/* Trust Stats Bar */}
      <section className="py-4 sm:py-6 bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {trustStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-xl border border-border text-center justify-center">
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-8 sm:py-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-5">{t("shopByCategory")}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Link to={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all group">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-foreground text-center leading-tight">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {promos[0] && <PromoBannerCard {...promos[0]} />}

      {/* Trust Badges */}
      <section className="py-6 sm:py-8 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {trustBadges.map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card rounded-xl border border-border">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{b.label}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {promos[1] && <PromoBannerCard {...promos[1]} />}

      {/* Best Sellers */}
      <section className="py-8 sm:py-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">{t("bestSellers")}</h2>
            <Link to="/category/all" className="text-primary text-xs sm:text-sm font-medium hover:underline">{t("viewAll")} →</Link>
          </div>
          {isLoading ? <ProductGridSkeleton /> : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {(bestSellers.length > 0 ? bestSellers : newArrivals).slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Browse Categories Carousel */}
      <section className="py-8 sm:py-10 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Browse Collections</h2>
            <Link to="/category/all" className="text-primary text-xs sm:text-sm font-medium hover:underline">{t("viewAll")} →</Link>
          </div>
          <InfiniteServiceCarousel cards={serviceCards} />
        </div>
      </section>

      {/* New Arrivals */}
      {products.length > 4 && (
        <section className="py-8 sm:py-10 bg-background">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-5">{t("newArrivals")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(4, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />

      {/* Newsletter */}
      <section className="py-8 sm:py-10 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3" />
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2">{t("stayUpdated")}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">{t("newsletterDesc")}</p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 px-3 sm:px-4 py-2.5 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 border border-border" />
              <button type="submit" className="px-4 sm:px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity">{t("subscribe")}</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
