import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Content sections table for managing website content
export const contentSections = pgTable("content_sections", {
  id: serial("id").primaryKey(),
  sectionType: varchar("section_type").notNull(), // 'hero', 'services', 'about', etc.
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  iconClass: varchar("icon_class"), // Font Awesome class
  isActive: boolean("is_active").default(true),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Portfolio projects table
export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  client: varchar("client"),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url"),
  category: varchar("category"), // 'commercial', 'music-video', 'documentary', 'brand', 'digital', etc.
  tags: text("tags").array(), // ['automotive', 'luxury', 'lifestyle', etc.]
  year: varchar("year"),
  duration: varchar("duration"), // '30s', '1:30', etc.
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImageUrl: text("featured_image_url"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name").notNull(),
  clientTitle: varchar("client_title"),
  clientCompany: varchar("client_company"),
  clientImageUrl: text("client_image_url"),
  quote: text("quote").notNull(),
  rating: serial("rating"),
  isActive: boolean("is_active").default(true),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  company: varchar("company"),
  projectType: varchar("project_type"),
  message: text("message"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Client projects table for project collaboration
export const clientProjects = pgTable("client_projects", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  clientId: varchar("client_id").references(() => users.id),
  status: varchar("status").default("planning"), // 'planning', 'in-progress', 'review', 'completed'
  budget: varchar("budget"),
  deadline: timestamp("deadline"),
  projectType: varchar("project_type"), // 'commercial', 'music-video', 'documentary', etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project files and assets
export const projectAssets = pgTable("project_assets", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").references(() => clientProjects.id),
  fileName: varchar("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type"), // 'video', 'image', 'document', 'audio'
  version: varchar("version").default("1.0"),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  isCurrentVersion: boolean("is_current_version").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Client feedback and comments
export const projectFeedback = pgTable("project_feedback", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").references(() => clientProjects.id),
  assetId: serial("asset_id").references(() => projectAssets.id),
  userId: varchar("user_id").references(() => users.id),
  comment: text("comment").notNull(),
  timestamp: varchar("timestamp"), // For video timestamps like "1:23"
  status: varchar("status").default("open"), // 'open', 'addressed', 'resolved'
  priority: varchar("priority").default("medium"), // 'low', 'medium', 'high'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project milestones and timeline
export const projectMilestones = pgTable("project_milestones", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").references(() => clientProjects.id),
  title: varchar("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for validation
export const insertContentSectionSchema = createInsertSchema(contentSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export const insertClientProjectSchema = createInsertSchema(clientProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectAssetSchema = createInsertSchema(projectAssets).omit({
  id: true,
  createdAt: true,
});

export const insertProjectFeedbackSchema = createInsertSchema(projectFeedback).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectMilestoneSchema = createInsertSchema(projectMilestones).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type ContentSection = typeof contentSections.$inferSelect;
export type InsertContentSection = z.infer<typeof insertContentSectionSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

// Client portal types
export type ClientProject = typeof clientProjects.$inferSelect;
export type InsertClientProject = z.infer<typeof insertClientProjectSchema>;
export type ProjectAsset = typeof projectAssets.$inferSelect;
export type InsertProjectAsset = z.infer<typeof insertProjectAssetSchema>;
export type ProjectFeedback = typeof projectFeedback.$inferSelect;
export type InsertProjectFeedback = z.infer<typeof insertProjectFeedbackSchema>;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;
export type InsertProjectMilestone = z.infer<typeof insertProjectMilestoneSchema>;
