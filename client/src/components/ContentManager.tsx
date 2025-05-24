import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContentSectionSchema, type InsertContentSection, type ContentSection } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ContentManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);

  const { data: contentSections, isLoading } = useQuery({
    queryKey: ["/api/admin/content"],
  });

  const form = useForm<InsertContentSection>({
    resolver: zodResolver(insertContentSectionSchema),
    defaultValues: {
      sectionType: "",
      title: "",
      subtitle: "",
      content: "",
      imageUrl: "",
      videoUrl: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertContentSection) => {
      return await apiRequest("POST", "/api/admin/content", data);
    },
    onSuccess: () => {
      toast({ title: "Content section created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error creating content section",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertContentSection> }) => {
      return await apiRequest("PUT", `/api/admin/content/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Content section updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      setIsDialogOpen(false);
      setEditingSection(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating content section",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/content/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Content section deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting content section",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContentSection) => {
    if (editingSection) {
      updateMutation.mutate({ id: editingSection.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (section: ContentSection) => {
    setEditingSection(section);
    form.reset({
      sectionType: section.sectionType,
      title: section.title || "",
      subtitle: section.subtitle || "",
      content: section.content || "",
      imageUrl: section.imageUrl || "",
      videoUrl: section.videoUrl || "",
      isActive: section.isActive ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this content section?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading content sections...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-white"
              onClick={() => {
                setEditingSection(null);
                form.reset();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content Section
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1A1A1A] border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSection ? "Edit Content Section" : "Add Content Section"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="sectionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0A0A0A] border-gray-700">
                            <SelectValue placeholder="Select section type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hero">Hero</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="portfolio">Portfolio</SelectItem>
                          <SelectItem value="about">About</SelectItem>
                          <SelectItem value="testimonials">Testimonials</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Section title" 
                          className="bg-[#0A0A0A] border-gray-700"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Section subtitle" 
                          className="bg-[#0A0A0A] border-gray-700"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Section content" 
                          className="bg-[#0A0A0A] border-gray-700"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          className="bg-[#0A0A0A] border-gray-700"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/video.mp4" 
                          className="bg-[#0A0A0A] border-gray-700"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-[#00D4FF] hover:bg-[#00D4FF]/80"
                  >
                    {createMutation.isPending || updateMutation.isPending 
                      ? "Saving..." 
                      : editingSection ? "Update" : "Create"
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {contentSections?.length === 0 ? (
          <Card className="bg-[#0A0A0A] border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center text-gray-400">
                No content sections found. Create your first content section to get started.
              </div>
            </CardContent>
          </Card>
        ) : (
          contentSections?.map((section: ContentSection) => (
            <Card key={section.id} className="bg-[#0A0A0A] border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-[#00D4FF]">
                      {section.sectionType.charAt(0).toUpperCase() + section.sectionType.slice(1)}
                    </CardTitle>
                    {section.title && (
                      <p className="text-white font-semibold mt-1">{section.title}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(section)}
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(section.id)}
                      className="border-red-700 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {section.subtitle && (
                  <p className="text-gray-400 mb-2">{section.subtitle}</p>
                )}
                {section.content && (
                  <p className="text-gray-300 text-sm">{section.content}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Status: {section.isActive ? "Active" : "Inactive"}</span>
                  {section.imageUrl && <span>Has Image</span>}
                  {section.videoUrl && <span>Has Video</span>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
