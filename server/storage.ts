import {
  users,
  contentSections,
  services,
  portfolioProjects,
  blogPosts,
  testimonials,
  contactSubmissions,
  clientProjects,
  projectAssets,
  projectFeedback,
  projectMilestones,
  type User,
  type UpsertUser,
  type ContentSection,
  type InsertContentSection,
  type Service,
  type InsertService,
  type PortfolioProject,
  type InsertPortfolioProject,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type ContactSubmission,
  type InsertContactSubmission,
  type ClientProject,
  type InsertClientProject,
  type ProjectAsset,
  type InsertProjectAsset,
  type ProjectFeedback,
  type InsertProjectFeedback,
  type ProjectMilestone,
  type InsertProjectMilestone,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Content sections
  getContentSections(): Promise<ContentSection[]>;
  getContentSectionByType(type: string): Promise<ContentSection | undefined>;
  createContentSection(section: InsertContentSection): Promise<ContentSection>;
  updateContentSection(id: number, section: Partial<InsertContentSection>): Promise<ContentSection>;
  deleteContentSection(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Portfolio projects
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getActivePortfolioProjects(): Promise<PortfolioProject[]>;
  getFeaturedPortfolioProjects(): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject>;
  deletePortfolioProject(id: number): Promise<void>;

  // Blog posts
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  // Contact submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getUnreadContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<void>;
  deleteContactSubmission(id: number): Promise<void>;

  // Client projects
  getClientProjects(clientId?: string): Promise<ClientProject[]>;
  getClientProject(id: number): Promise<ClientProject | undefined>;
  createClientProject(project: InsertClientProject): Promise<ClientProject>;
  updateClientProject(id: number, project: Partial<InsertClientProject>): Promise<ClientProject>;
  deleteClientProject(id: number): Promise<void>;

  // Project assets
  getProjectAssets(projectId: number): Promise<ProjectAsset[]>;
  createProjectAsset(asset: InsertProjectAsset): Promise<ProjectAsset>;
  updateProjectAsset(id: number, asset: Partial<InsertProjectAsset>): Promise<ProjectAsset>;
  deleteProjectAsset(id: number): Promise<void>;

  // Project feedback
  getProjectFeedback(projectId: number): Promise<ProjectFeedback[]>;
  createProjectFeedback(feedback: InsertProjectFeedback): Promise<ProjectFeedback>;
  updateProjectFeedback(id: number, feedback: Partial<InsertProjectFeedback>): Promise<ProjectFeedback>;
  deleteProjectFeedback(id: number): Promise<void>;

  // Project milestones
  getProjectMilestones(projectId: number): Promise<ProjectMilestone[]>;
  createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone>;
  updateProjectMilestone(id: number, milestone: Partial<InsertProjectMilestone>): Promise<ProjectMilestone>;
  deleteProjectMilestone(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Content sections
  async getContentSections(): Promise<ContentSection[]> {
    return await db.select().from(contentSections).orderBy(contentSections.sectionType);
  }

  async getContentSectionByType(type: string): Promise<ContentSection | undefined> {
    const [section] = await db
      .select()
      .from(contentSections)
      .where(and(eq(contentSections.sectionType, type), eq(contentSections.isActive, true)));
    return section;
  }

  async createContentSection(section: InsertContentSection): Promise<ContentSection> {
    const [newSection] = await db.insert(contentSections).values(section).returning();
    return newSection;
  }

  async updateContentSection(id: number, section: Partial<InsertContentSection>): Promise<ContentSection> {
    const [updatedSection] = await db
      .update(contentSections)
      .set({ ...section, updatedAt: new Date() })
      .where(eq(contentSections.id, id))
      .returning();
    return updatedSection;
  }

  async deleteContentSection(id: number): Promise<void> {
    await db.delete(contentSections).where(eq(contentSections.id, id));
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.sortOrder);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.sortOrder);
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Portfolio projects
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).orderBy(portfolioProjects.sortOrder);
  }

  async getActivePortfolioProjects(): Promise<PortfolioProject[]> {
    return await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.isActive, true))
      .orderBy(portfolioProjects.sortOrder);
  }

  async getFeaturedPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db
      .select()
      .from(portfolioProjects)
      .where(and(eq(portfolioProjects.isActive, true), eq(portfolioProjects.isFeatured, true)))
      .orderBy(portfolioProjects.sortOrder);
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const [newProject] = await db.insert(portfolioProjects).values(project).returning();
    return newProject;
  }

  async updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject> {
    const [updatedProject] = await db
      .update(portfolioProjects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(portfolioProjects.id, id))
      .returning();
    return updatedProject;
  }

  async deletePortfolioProject(id: number): Promise<void> {
    await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  }

  // Blog posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.sortOrder);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(testimonials.sortOrder);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Contact submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getUnreadContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.isRead, false))
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }

  async markContactSubmissionAsRead(id: number): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
  }

  async deleteContactSubmission(id: number): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  // Client projects
  async getClientProjects(clientId?: string): Promise<ClientProject[]> {
    if (clientId) {
      return await db.select().from(clientProjects).where(eq(clientProjects.clientId, clientId)).orderBy(desc(clientProjects.createdAt));
    }
    return await db.select().from(clientProjects).orderBy(desc(clientProjects.createdAt));
  }

  async getClientProject(id: number): Promise<ClientProject | undefined> {
    const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, id));
    return project;
  }

  async createClientProject(project: InsertClientProject): Promise<ClientProject> {
    const [newProject] = await db.insert(clientProjects).values(project).returning();
    return newProject;
  }

  async updateClientProject(id: number, project: Partial<InsertClientProject>): Promise<ClientProject> {
    const [updatedProject] = await db
      .update(clientProjects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(clientProjects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteClientProject(id: number): Promise<void> {
    await db.delete(clientProjects).where(eq(clientProjects.id, id));
  }

  // Project assets
  async getProjectAssets(projectId: number): Promise<ProjectAsset[]> {
    return await db.select().from(projectAssets).where(eq(projectAssets.projectId, projectId)).orderBy(desc(projectAssets.createdAt));
  }

  async createProjectAsset(asset: InsertProjectAsset): Promise<ProjectAsset> {
    const [newAsset] = await db.insert(projectAssets).values(asset).returning();
    return newAsset;
  }

  async updateProjectAsset(id: number, asset: Partial<InsertProjectAsset>): Promise<ProjectAsset> {
    const [updatedAsset] = await db
      .update(projectAssets)
      .set(asset)
      .where(eq(projectAssets.id, id))
      .returning();
    return updatedAsset;
  }

  async deleteProjectAsset(id: number): Promise<void> {
    await db.delete(projectAssets).where(eq(projectAssets.id, id));
  }

  // Project feedback
  async getProjectFeedback(projectId: number): Promise<ProjectFeedback[]> {
    return await db.select().from(projectFeedback).where(eq(projectFeedback.projectId, projectId)).orderBy(desc(projectFeedback.createdAt));
  }

  async createProjectFeedback(feedback: InsertProjectFeedback): Promise<ProjectFeedback> {
    const [newFeedback] = await db.insert(projectFeedback).values(feedback).returning();
    return newFeedback;
  }

  async updateProjectFeedback(id: number, feedback: Partial<InsertProjectFeedback>): Promise<ProjectFeedback> {
    const [updatedFeedback] = await db
      .update(projectFeedback)
      .set({ ...feedback, updatedAt: new Date() })
      .where(eq(projectFeedback.id, id))
      .returning();
    return updatedFeedback;
  }

  async deleteProjectFeedback(id: number): Promise<void> {
    await db.delete(projectFeedback).where(eq(projectFeedback.id, id));
  }

  // Project milestones
  async getProjectMilestones(projectId: number): Promise<ProjectMilestone[]> {
    return await db.select().from(projectMilestones).where(eq(projectMilestones.projectId, projectId)).orderBy(projectMilestones.sortOrder);
  }

  async createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone> {
    const [newMilestone] = await db.insert(projectMilestones).values(milestone).returning();
    return newMilestone;
  }

  async updateProjectMilestone(id: number, milestone: Partial<InsertProjectMilestone>): Promise<ProjectMilestone> {
    const [updatedMilestone] = await db
      .update(projectMilestones)
      .set(milestone)
      .where(eq(projectMilestones.id, id))
      .returning();
    return updatedMilestone;
  }

  async deleteProjectMilestone(id: number): Promise<void> {
    await db.delete(projectMilestones).where(eq(projectMilestones.id, id));
  }
}

export const storage = new DatabaseStorage();
