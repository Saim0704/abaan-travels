import HeroSlider from "@/components/hero-slider";
import PackageSection from "@/components/package-section";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      
      {/* Trust Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <i className="fas fa-users text-3xl text-primary"></i>
              <h3 className="text-2xl font-bold text-foreground" data-testid="text-pilgrims-count">15,000+</h3>
              <p className="text-muted-foreground">Happy Pilgrims</p>
            </div>
            <div className="space-y-2">
              <i className="fas fa-calendar text-3xl text-primary"></i>
              <h3 className="text-2xl font-bold text-foreground" data-testid="text-experience-years">15+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-2">
              <i className="fas fa-star text-3xl text-secondary"></i>
              <h3 className="text-2xl font-bold text-foreground" data-testid="text-rating">4.9</h3>
              <p className="text-muted-foreground">Customer Rating</p>
            </div>
            <div className="space-y-2">
              <i className="fas fa-certificate text-3xl text-accent"></i>
              <h3 className="text-2xl font-bold text-foreground" data-testid="text-certification">100%</h3>
              <p className="text-muted-foreground">Licensed & Certified</p>
            </div>
          </div>
        </div>
      </section>

      <PackageSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-why-choose-title">
              Why Choose Abaan Travel?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to providing you with an exceptional spiritual journey that combines comfort, authenticity, and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-certificate text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Licensed & Certified</h3>
              <p className="text-muted-foreground">
                Fully licensed by Saudi authorities and certified by religious institutions for authentic pilgrimage services.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock assistance during your journey with dedicated customer service team available anytime.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Expert Guides</h3>
              <p className="text-muted-foreground">
                Knowledgeable spiritual guides who provide religious instruction and historical context throughout your journey.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-hotel text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Premium Accommodation</h3>
              <p className="text-muted-foreground">
                Carefully selected hotels and accommodations near the holy sites for your convenience and comfort.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-plane text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Hassle-Free Travel</h3>
              <p className="text-muted-foreground">
                Complete travel arrangements including visa processing, flights, and ground transportation.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Spiritual Focus</h3>
              <p className="text-muted-foreground">
                Designed itineraries that prioritize spiritual reflection and religious obligations over tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
              What Our Pilgrims Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from thousands of satisfied pilgrims who experienced their spiritual journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Alhamdulillah, my Umrah journey with Abaan Travel was absolutely perfect. The accommodation was excellent and the guides were very knowledgeable about Islamic history."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Ahmed Hassan</h4>
                  <p className="text-sm text-muted-foreground">Umrah 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The Hajj package was well-organized and the staff took care of everything. I could focus completely on my spiritual obligations without any worries."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Fatima Al-Zahra</h4>
                  <p className="text-sm text-muted-foreground">Hajj 2022</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "Professional service from start to finish. The group size was perfect and the accommodations exceeded my expectations. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Omar Abdullah</h4>
                  <p className="text-sm text-muted-foreground">Umrah 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
