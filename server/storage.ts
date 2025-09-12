import { type User, type InsertUser, type Package, type InsertPackage, type SliderImage, type InsertSliderImage, UserModel, PackageModel, SliderImageModel } from "@shared/schema";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private packages: Map<string, Package>;
  private sliderImages: Map<string, SliderImage>;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.sliderImages = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
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
        days: 14,
        fromDate: "2024-12-01",
        toDate: "2024-12-14",
        type: "umrah",
        accommodation: "5-star hotel near Haram",
        transport: "Direct flights included",
        meals: "All meals included",
        hotelDistanceMakkah: "200m from Haram",
        hotelDistanceMadinah: "150m from Masjid Nabawi",
        amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat", "Umrah kit"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true
      },
      {
        id: randomUUID(),
        title: "Standard Umrah Package",
        description: "Comfortable accommodation with essential services, guided tours, and convenient transportation.",
        price: 1800,
        duration: "10 Days",
        days: 10,
        fromDate: "2024-11-15",
        toDate: "2024-11-24",
        type: "umrah",
        accommodation: "4-star hotel accommodation",
        transport: "Group transportation",
        meals: "Breakfast & dinner included",
        hotelDistanceMakkah: "500m from Haram",
        hotelDistanceMadinah: "400m from Masjid Nabawi",
        amenities: ["Direct flight", "Transport", "Visa", "Ziyarat"],
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      },
      {
        id: randomUUID(),
        title: "Economy Umrah Package",
        description: "Affordable pilgrimage option with clean accommodation, basic meals, and essential services.",
        price: 1200,
        duration: "7 Days",
        days: 7,
        fromDate: "2024-10-20",
        toDate: "2024-10-26",
        type: "umrah",
        accommodation: "3-star hotel accommodation",
        transport: "Shared transportation",
        meals: "Breakfast included",
        hotelDistanceMakkah: "800m from Haram",
        hotelDistanceMadinah: "600m from Masjid Nabawi",
        amenities: ["Transport", "Visa"],
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
        days: 21,
        fromDate: "2025-06-15",
        toDate: "2025-07-05",
        type: "hajj",
        accommodation: "Premium tents in Mina & Arafat",
        transport: "Private AC transportation",
        meals: "Personal guide included",
        hotelDistanceMakkah: "100m from Haram",
        hotelDistanceMadinah: "100m from Masjid Nabawi",
        amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat", "Umrah kit", "Zam Zam", "Laundry"],
        image: "https://pixabay.com/get/g81043d2b84a4f0158d9cae5a48c2007353d2a4e91c6324fb31f8f8021b7dd4dc15b417c93102df07a392427364c2f0cbe1cf95e9bbab0613dd509aafbeafdb6e_1280.jpg",
        featured: true
      },
      {
        id: randomUUID(),
        title: "Standard Hajj Package",
        description: "Complete Hajj package with comfortable accommodation, group services, and spiritual guidance.",
        price: 4200,
        duration: "18 Days",
        days: 18,
        fromDate: "2025-06-20",
        toDate: "2025-07-07",
        type: "hajj",
        accommodation: "Standard tents & hotels",
        transport: "Group transportation",
        meals: "Group guide service",
        hotelDistanceMakkah: "400m from Haram",
        hotelDistanceMadinah: "300m from Masjid Nabawi",
        amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat"],
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false
      },
      {
        id: randomUUID(),
        title: "Budget Hajj Package",
        description: "Affordable Hajj option with essential services and shared accommodation.",
        price: 3200,
        duration: "15 Days",
        days: 15,
        fromDate: "2025-06-25",
        toDate: "2025-07-09",
        type: "hajj",
        accommodation: "Shared tents & basic hotels",
        transport: "Shared bus transport",
        meals: "Basic guidance provided",
        hotelDistanceMakkah: "1km from Haram",
        hotelDistanceMadinah: "800m from Masjid Nabawi",
        amenities: ["Transport", "Visa"],
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
    const pkg: Package = { 
      ...packageData, 
      id, 
      featured: packageData.featured ?? false,
      days: packageData.days ?? 7,
      fromDate: packageData.fromDate ?? '',
      toDate: packageData.toDate ?? '',
      hotelDistanceMakkah: packageData.hotelDistanceMakkah ?? '',
      hotelDistanceMadinah: packageData.hotelDistanceMadinah ?? '',
      amenities: packageData.amenities ?? []
    };
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

export class MongoStorage implements IStorage {
  private isConnected = false;
  public sessionStore: session.Store;

  constructor() {
    // For MongoDB, we use MemoryStore for sessions to keep it simple
    // In production, you might want to use connect-mongo for MongoDB session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      if (!process.env.MONGODB_URI) {
        console.log('MongoDB URI not provided, using in-memory storage...');
        return;
      }
      
      await mongoose.connect(process.env.MONGODB_URI);
      this.isConnected = true;
      console.log('Connected to MongoDB successfully');
      
      // Initialize with default data if collections are empty
      await this.initializeDefaultData();
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      this.isConnected = false;
    }
  }

  private async initializeDefaultData() {
    try {
      // Check if data already exists
      const existingPackages = await PackageModel.countDocuments();
      const existingSliders = await SliderImageModel.countDocuments();

      if (existingPackages === 0) {
        const defaultPackages = [
          {
            title: "Premium Umrah Package",
            description: "Experience luxury with 5-star hotels near Haram, premium transportation, and guided spiritual tours.",
            price: 2500,
            duration: "14 Days",
            days: 14,
            fromDate: "2024-12-01",
            toDate: "2024-12-14",
            type: "umrah",
            accommodation: "5-star hotel near Haram",
            transport: "Direct flights included",
            meals: "All meals included",
            hotelDistanceMakkah: "200m from Haram",
            hotelDistanceMadinah: "150m from Masjid Nabawi",
            amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat", "Umrah kit"],
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            featured: true
          },
          {
            title: "Standard Umrah Package",
            description: "Comfortable accommodation with essential services, guided tours, and convenient transportation.",
            price: 1800,
            duration: "10 Days",
            days: 10,
            fromDate: "2024-11-15",
            toDate: "2024-11-24",
            type: "umrah",
            accommodation: "4-star hotel accommodation",
            transport: "Group transportation",
            meals: "Breakfast & dinner included",
            hotelDistanceMakkah: "500m from Haram",
            hotelDistanceMadinah: "400m from Masjid Nabawi",
            amenities: ["Direct flight", "Transport", "Visa", "Ziyarat"],
            image: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            featured: false
          },
          {
            title: "Economy Umrah Package",
            description: "Affordable pilgrimage option with clean accommodation, basic meals, and essential services.",
            price: 1200,
            duration: "7 Days",
            days: 7,
            fromDate: "2024-10-20",
            toDate: "2024-10-26",
            type: "umrah",
            accommodation: "3-star hotel accommodation",
            transport: "Shared transportation",
            meals: "Breakfast included",
            hotelDistanceMakkah: "800m from Haram",
            hotelDistanceMadinah: "600m from Masjid Nabawi",
            amenities: ["Transport", "Visa"],
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            featured: false
          },
          {
            title: "VIP Hajj Package",
            description: "Ultimate luxury Hajj experience with premium tents, private transportation, and personalized service.",
            price: 6500,
            duration: "21 Days",
            days: 21,
            fromDate: "2025-06-15",
            toDate: "2025-07-05",
            type: "hajj",
            accommodation: "Premium tents in Mina & Arafat",
            transport: "Private AC transportation",
            meals: "Personal guide included",
            hotelDistanceMakkah: "100m from Haram",
            hotelDistanceMadinah: "100m from Masjid Nabawi",
            amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat", "Umrah kit", "Zam Zam", "Laundry"],
            image: "https://pixabay.com/get/g81043d2b84a4f0158d9cae5a48c2007353d2a4e91c6324fb31f8f8021b7dd4dc15b417c93102df07a392427364c2f0cbe1cf95e9bbab0613dd509aafbeafdb6e_1280.jpg",
            featured: true
          },
          {
            title: "Standard Hajj Package",
            description: "Complete Hajj package with comfortable accommodation, group services, and spiritual guidance.",
            price: 4200,
            duration: "18 Days",
            days: 18,
            fromDate: "2025-06-20",
            toDate: "2025-07-07",
            type: "hajj",
            accommodation: "Standard tents & hotels",
            transport: "Group transportation",
            meals: "Group guide service",
            hotelDistanceMakkah: "400m from Haram",
            hotelDistanceMadinah: "300m from Masjid Nabawi",
            amenities: ["Direct flight", "3 times buffet meals", "Transport", "Visa", "Ziyarat"],
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            featured: false
          },
          {
            title: "Budget Hajj Package",
            description: "Affordable Hajj option with essential services and shared accommodation.",
            price: 3200,
            duration: "15 Days",
            days: 15,
            fromDate: "2025-06-25",
            toDate: "2025-07-09",
            type: "hajj",
            accommodation: "Shared tents & basic hotels",
            transport: "Shared bus transport",
            meals: "Basic guidance provided",
            hotelDistanceMakkah: "1km from Haram",
            hotelDistanceMadinah: "800m from Masjid Nabawi",
            amenities: ["Transport", "Visa"],
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            featured: false
          }
        ];

        await PackageModel.insertMany(defaultPackages);
        console.log('Default packages initialized');
      }

      if (existingSliders === 0) {
        const defaultSliders = [
          {
            title: "Your Sacred Journey Awaits",
            subtitle: "Experience the spiritual journey of a lifetime with our premium Hajj and Umrah packages",
            buttonText: "Explore Packages",
            imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
            order: 0
          },
          {
            title: "Visit the Holy Cities",
            subtitle: "Discover Makkah and Medina with expertly crafted itineraries and premium accommodations",
            buttonText: "Learn More",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
            order: 1
          },
          {
            title: "Trusted Travel Partner",
            subtitle: "Over 15 years of experience in organizing spiritual journeys with complete care and comfort",
            buttonText: "Contact Us",
            imageUrl: "https://pixabay.com/get/g80984cf1237d2fcc22276989cce52430be54b2638ed082e2750b04a3a28751845ebd4e0e9e90cb98affc54873f532acd8c791f50cafc2a622c6bd2dd437bfa35_1280.jpg",
            order: 2
          }
        ];

        await SliderImageModel.insertMany(defaultSliders);
        console.log('Default slider images initialized');
      }
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id).lean();
      return user ? { ...user, id: user._id.toString() } : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username }).lean();
      return user ? { ...user, id: user._id.toString() } : undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const user = new UserModel(insertUser);
      const saved = await user.save();
      return { ...saved.toJSON(), id: saved._id.toString() };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getAllPackages(): Promise<Package[]> {
    try {
      const packages = await PackageModel.find({}).lean();
      return packages.map(pkg => ({ ...pkg, id: pkg._id.toString() }));
    } catch (error) {
      console.error('Error getting all packages:', error);
      return [];
    }
  }

  async getPackagesByType(type: string): Promise<Package[]> {
    try {
      const packages = await PackageModel.find({ type }).lean();
      return packages.map(pkg => ({ ...pkg, id: pkg._id.toString() }));
    } catch (error) {
      console.error('Error getting packages by type:', error);
      return [];
    }
  }

  async getPackage(id: string): Promise<Package | undefined> {
    try {
      const pkg = await PackageModel.findById(id).lean();
      return pkg ? { ...pkg, id: pkg._id.toString() } : undefined;
    } catch (error) {
      console.error('Error getting package:', error);
      return undefined;
    }
  }

  async createPackage(packageData: InsertPackage): Promise<Package> {
    try {
      const pkg = new PackageModel({ 
        ...packageData, 
        featured: packageData.featured ?? false,
        days: packageData.days ?? 7,
        fromDate: packageData.fromDate ?? '',
        toDate: packageData.toDate ?? '',
        hotelDistanceMakkah: packageData.hotelDistanceMakkah ?? '',
        hotelDistanceMadinah: packageData.hotelDistanceMadinah ?? '',
        amenities: packageData.amenities ?? []
      });
      const saved = await pkg.save();
      return { ...saved.toJSON(), id: saved._id.toString() };
    } catch (error) {
      console.error('Error creating package:', error);
      throw error;
    }
  }

  async updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package> {
    try {
      const updated = await PackageModel.findByIdAndUpdate(id, packageData, { new: true }).lean();
      if (!updated) {
        throw new Error("Package not found");
      }
      return { ...updated, id: updated._id.toString() };
    } catch (error) {
      console.error('Error updating package:', error);
      throw error;
    }
  }

  async deletePackage(id: string): Promise<boolean> {
    try {
      const result = await PackageModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting package:', error);
      return false;
    }
  }

  async getAllSliderImages(): Promise<SliderImage[]> {
    try {
      const sliders = await SliderImageModel.find({}).sort({ order: 1 }).lean();
      return sliders.map(slider => ({ ...slider, id: slider._id.toString() }));
    } catch (error) {
      console.error('Error getting slider images:', error);
      return [];
    }
  }

  async createSliderImage(sliderData: InsertSliderImage): Promise<SliderImage> {
    try {
      const slider = new SliderImageModel({ ...sliderData, order: sliderData.order ?? 0 });
      const saved = await slider.save();
      return { ...saved.toJSON(), id: saved._id.toString() };
    } catch (error) {
      console.error('Error creating slider image:', error);
      throw error;
    }
  }

  async updateSliderImage(id: string, sliderData: Partial<InsertSliderImage>): Promise<SliderImage> {
    try {
      const updated = await SliderImageModel.findByIdAndUpdate(id, sliderData, { new: true }).lean();
      if (!updated) {
        throw new Error("Slider image not found");
      }
      return { ...updated, id: updated._id.toString() };
    } catch (error) {
      console.error('Error updating slider image:', error);
      throw error;
    }
  }

  async deleteSliderImage(id: string): Promise<boolean> {
    try {
      const result = await SliderImageModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting slider image:', error);
      return false;
    }
  }
}

// Use MongoDB storage if available, fallback to in-memory storage
const useMongoStorage = process.env.MONGODB_URI || process.env.NODE_ENV === 'production';
export const storage = useMongoStorage ? new MongoStorage() : new MemStorage();
