import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { Schema, model, type Document } from "mongoose";

// Predefined amenities list
export const PREDEFINED_AMENITIES = [
  "Direct flight",
  "3 times buffet meals", 
  "Transport",
  "Visa",
  "Ziyarat",
  "Umrah kit",
  "Zam Zam",
  "Laundry"
] as const;

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  days: integer("days").notNull().default(7),
  fromDate: text("from_date").notNull().default(''),
  toDate: text("to_date").notNull().default(''),
  type: text("type").notNull(), // 'hajj' or 'umrah'
  accommodation: text("accommodation").notNull(),
  transport: text("transport").notNull(),
  meals: text("meals").notNull(),
  hotelDistanceMakkah: text("hotel_distance_makkah").notNull().default(''),
  hotelDistanceMadinah: text("hotel_distance_madinah").notNull().default(''),
  amenities: text("amenities").array().notNull().default([]),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

export const sliderImages = pgTable("slider_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  buttonText: text("button_text").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
});

export const insertSliderImageSchema = createInsertSchema(sliderImages).omit({
  id: true,
});

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertSliderImage = z.infer<typeof insertSliderImageSchema>;
export type SliderImage = typeof sliderImages.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// MongoDB/Mongoose Schemas and Models
export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
}

export interface IPackage extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  days: number;
  fromDate: string;
  toDate: string;
  type: string;
  accommodation: string;
  transport: string;
  meals: string;
  hotelDistanceMakkah: string;
  hotelDistanceMadinah: string;
  amenities: string[];
  image: string;
  featured: boolean;
}

export interface ISliderImage extends Document {
  _id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  order: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: false,
  toJSON: {
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const PackageSchema = new Schema<IPackage>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  days: { type: Number, required: true, default: 7 },
  fromDate: { type: String, required: true, default: '' },
  toDate: { type: String, required: true, default: '' },
  type: { type: String, required: true },
  accommodation: { type: String, required: true },
  transport: { type: String, required: true },
  meals: { type: String, required: true },
  hotelDistanceMakkah: { type: String, required: true, default: '' },
  hotelDistanceMadinah: { type: String, required: true, default: '' },
  amenities: [{ type: String }],
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, {
  timestamps: false,
  toJSON: {
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const SliderImageSchema = new Schema<ISliderImage>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  buttonText: { type: String, required: true },
  imageUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: false,
  toJSON: {
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const UserModel = model<IUser>('User', UserSchema);
export const PackageModel = model<IPackage>('Package', PackageSchema);
export const SliderImageModel = model<ISliderImage>('SliderImage', SliderImageSchema);
