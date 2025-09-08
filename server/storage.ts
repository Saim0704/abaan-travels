import { type User, type InsertUser, type Package, type InsertPackage, type SliderImage, type InsertSliderImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Package methods
  getAllPackages(): Promise<Package[]>;
  getPackagesByType(type: string): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(packageData: InsertPackage): Promise<Package>;
  updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package>;
  deletePackage(id: string): Promise<boolean>;
  
  // Slider methods
  getAllSliderImages(): Promise<SliderImage[]>;
  createSliderImage(sliderData: InsertSliderImage): Promise<SliderImage>;
  updateSliderImage(id: string, sliderData: Partial<InsertSliderImage>): Promise<SliderImage>;
  deleteSliderImage(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private packages: Map<string, Package>;
  private sliderImages: Map<string, SliderImage>;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.sliderImages = new Map();
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Default slider images
    const defaultSliders: SliderImage[] = [
      {
        id: randomUUID(),
        title: "Your Sacred Journey Awaits",
        subtitle: "Experience the spiritual journey of a lifetime with our premium Hajj and Umrah packages",
        buttonText: "Explore Packages",
        imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        order: 0
      },
      {
        id: randomUUID(),
        title: "Visit the Holy Cities",
        subtitle: "Discover Makkah and Medina with expertly crafted itineraries and premium accommodations",
        buttonText: "Learn More",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        order: 1
      },
      {
        id: randomUUID(),
        title: "Trusted Travel Partner",
        subtitle: "Over 15 years of experience in organizing spiritual journeys with complete care and comfort",
        buttonText: "Contact Us",
        imageUrl: "https://pixabay.com/get/g80984cf1237d2fcc22276989cce52430be54b2638ed082e2750b04a3a28751845ebd4e0e9e90cb98affc54873f532acd8c791f50cafc2a622c6bd2dd437bfa35_1280.jpg",
        order: 2
      }
    ];

    defaultSliders.forEach(slider => {
      this.sliderImages.set(slider.id, slider);
    });

    // Default packages
    const defaultPackages: Package[] = [
      // Umrah packages
      {
        id: randomUUID(),
        title: "Premium Umrah Package",
        description: "Experience luxury with 5-star hotels near Haram, premium transportation, and guided spiritual tours.",
        price: 2500,
        duration: "14 Days",
        type: "umrah",
        accommodation: "5-star hotel near Haram",
        transport: "Direct flights included",
        meals: "All meals included",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true
      },
      {
        id: randomUUID(),
        title: "Standard Umrah Package",
        description: "Comfortable accommodation with essential services, guided tours, and convenient transportation.",
        price: 1800,
        duration: "10 Days",
        type: "umrah",
        accommodation: "4-star hotel accommodation",
        transport: "Group transportation",
        meals: "Breakfast & dinner included",
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      },
      {
        id: randomUUID(),
        title: "Economy Umrah Package",
        description: "Affordable pilgrimage option with clean accommodation, basic meals, and essential services.",
        price: 1200,
        duration: "7 Days",
        type: "umrah",
        accommodation: "3-star hotel accommodation",
        transport: "Shared transportation",
        meals: "Breakfast included",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      },
      // Hajj packages
      {
        id: randomUUID(),
        title: "VIP Hajj Package",
        description: "Ultimate luxury Hajj experience with premium tents, private transportation, and personalized service.",
        price: 6500,
        duration: "21 Days",
        type: "hajj",
        accommodation: "Premium tents in Mina & Arafat",
        transport: "Private AC transportation",
        meals: "Personal guide included",
        image: "https://pixabay.com/get/g81043d2b84a4f0158d9cae5a48c2007353d2a4e91c6324fb31f8f8021b7dd4dc15b417c93102df07a392427364c2f0cbe1cf95e9bbab0613dd509aafbeafdb6e_1280.jpg",
        featured: true
      },
      {
        id: randomUUID(),
        title: "Standard Hajj Package",
        description: "Complete Hajj package with comfortable accommodation, group services, and spiritual guidance.",
        price: 4200,
        duration: "18 Days",
        type: "hajj",
        accommodation: "Standard tents & hotels",
        transport: "Group transportation",
        meals: "Group guide service",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      },
      {
        id: randomUUID(),
        title: "Budget Hajj Package",
        description: "Affordable Hajj option with essential services and shared accommodation.",
        price: 3200,
        duration: "15 Days",
        type: "hajj",
        accommodation: "Shared tents & basic hotels",
        transport: "Shared bus transport",
        meals: "Basic guidance provided",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      }
    ];

    defaultPackages.forEach(pkg => {
      this.packages.set(pkg.id, pkg);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackagesByType(type: string): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(pkg => pkg.type === type);
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(packageData: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const pkg: Package = { ...packageData, id, featured: packageData.featured ?? false };
    this.packages.set(id, pkg);
    return pkg;
  }

  async updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package> {
    const existing = this.packages.get(id);
    if (!existing) {
      throw new Error("Package not found");
    }
    const updated: Package = { ...existing, ...packageData };
    this.packages.set(id, updated);
    return updated;
  }

  async deletePackage(id: string): Promise<boolean> {
    return this.packages.delete(id);
  }

  async getAllSliderImages(): Promise<SliderImage[]> {
    return Array.from(this.sliderImages.values()).sort((a, b) => a.order - b.order);
  }

  async createSliderImage(sliderData: InsertSliderImage): Promise<SliderImage> {
    const id = randomUUID();
    const slider: SliderImage = { ...sliderData, id, order: sliderData.order ?? 0 };
    this.sliderImages.set(id, slider);
    return slider;
  }

  async updateSliderImage(id: string, sliderData: Partial<InsertSliderImage>): Promise<SliderImage> {
    const existing = this.sliderImages.get(id);
    if (!existing) {
      throw new Error("Slider image not found");
    }
    const updated: SliderImage = { ...existing, ...sliderData };
    this.sliderImages.set(id, updated);
    return updated;
  }

  async deleteSliderImage(id: string): Promise<boolean> {
    return this.sliderImages.delete(id);
  }
}

export const storage = new MemStorage();
