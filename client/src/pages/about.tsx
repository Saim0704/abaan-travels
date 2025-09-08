export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
              About Abaan Travel
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For over 15 years, we have been dedicated to providing exceptional Hajj and Umrah experiences, 
              combining spiritual guidance with premium comfort and service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To provide authentic, comfortable, and spiritually enriching pilgrimage experiences 
                that allow our clients to focus entirely on their worship and spiritual growth.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that every Muslim deserves the opportunity to perform Hajj and Umrah 
                with dignity, comfort, and proper guidance, regardless of their background or circumstances.
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg p-8">
              <div className="text-center">
                <i className="fas fa-kaaba text-6xl text-primary mb-4"></i>
                <h3 className="text-2xl font-bold text-foreground mb-4">15+ Years of Excellence</h3>
                <p className="text-muted-foreground">
                  Serving the Muslim community with dedication, integrity, and uncompromising quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Spiritual Excellence</h3>
              <p className="text-muted-foreground">
                We prioritize the spiritual aspects of the journey, ensuring every moment contributes to your spiritual growth.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Trust & Integrity</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of honesty and transparency in all our dealings.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Premium Service</h3>
              <p className="text-muted-foreground">
                We deliver exceptional service quality that exceeds expectations at every step of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-team-title">
              Our Commitment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What sets us apart in serving the Muslim community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Licensed & Authorized</h3>
                  <p className="text-muted-foreground">
                    Fully licensed by Saudi authorities and authorized by the Ministry of Hajj and Umrah.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-users text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">
                    Our team consists of experienced professionals and religious scholars who understand your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Continuous support throughout your journey, from booking to your safe return home.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-medal text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    Rigorous quality standards ensure every aspect of your journey meets our high expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-handshake text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Community Focus</h3>
                  <p className="text-muted-foreground">
                    We serve the entire Muslim community with respect for diverse backgrounds and traditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Global Experience</h3>
                  <p className="text-muted-foreground">
                    Extensive experience serving pilgrims from around the world with cultural sensitivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
