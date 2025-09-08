import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <i className="fas fa-kaaba text-2xl mr-3"></i>
              <h3 className="text-2xl font-bold">Abaan Travel</h3>
            </div>
            <p className="text-primary-foreground/80">
              Your trusted partner for sacred journeys to the holy lands. Experience spirituality with comfort and authenticity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-youtube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/umrah-packages" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-umrah">
                  Umrah Packages
                </Link>
              </li>
              <li>
                <Link href="/hajj-packages" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-hajj">
                  Hajj Packages
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-visa-processing">
                  Visa Processing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-group-tours">
                  Group Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-custom-packages">
                  Custom Packages
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-why-choose-us">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-testimonials">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-travel-tips">
                  Travel Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" data-testid="link-terms">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span className="text-primary-foreground/80" data-testid="text-phone">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span className="text-primary-foreground/80" data-testid="text-email">info@abaantravel.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                <span className="text-primary-foreground/80" data-testid="text-address">
                  123 Islamic Center Ave<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span className="text-primary-foreground/80" data-testid="text-hours">Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm" data-testid="text-copyright">
              &copy; 2024 Abaan Travel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors" data-testid="link-terms-service">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors" data-testid="link-cookies">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
