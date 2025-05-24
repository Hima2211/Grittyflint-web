import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPortfolioProjectSchema, type InsertPortfolioProject, type PortfolioProject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Eye, Star } from "lucide-react";

export default function PortfolioManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  const { data: portfolioProjects, isLoading } = useQuery({
    queryKey: ["/api/admin/portfolio"],
  });

  const form = useForm<InsertPortfolioProject>({
    resolver: zodResolver(insertPortfolioProjectSchema),
    defaultValues: {
      title: "",
      client: "",
      description: "",
      thumbnailUrl: "",
      videoUrl: "",
      category: "",
      isActive: true,
      isFeatured: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPortfolioProject) => {
      return await apiRequest("POST", "/api/admin/portfolio", data);
    },
    onSuccess: () => {
      toast({ title: "Portfolio project created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/featured"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error creating portfolio project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertPortfolioProject> }) => {
      return await apiRequest("PUT", `/api/admin/portfolio/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Portfolio project updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/featured"] });
      setIsDialogOpen(false);
      setEditingProject(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating portfolio project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/portfolio/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Portfolio project deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/featured"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting portfolio project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPortfolioProject) => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      client: project.client || "",
      description: project.description || "",
      thumbnailUrl: project.thumbnailUrl || "",
      videoUrl: project.videoUrl || "",
      category: project.category || "",
      isActive: project.isActive ?? true,
      isFeatured: project.isFeatured ?? false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this portfolio project?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading portfolio projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-white"
              onClick={() => {
                setEditingProject(null);
                form.reset();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1A1A1A] border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Portfolio Project" : "Add Portfolio Project"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Luxury Auto Campaign" 
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
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Mercedes-Benz" 
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0A0A0A] border-gray-700">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="brand">Brand Film</SelectItem>
                          <SelectItem value="digital">Digital Content</SelectItem>
                          <SelectItem value="music">Music Video</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the project" 
                          className="bg-[#0A0A0A] border-gray-700"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail Image URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/thumbnail.jpg" 
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
                          placeholder="https://vimeo.com/... or https://youtube.com/..." 
                          className="bg-[#0A0A0A] border-gray-700"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Featured</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                      : editingProject ? "Update" : "Create"
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {portfolioProjects?.length === 0 ? (
          <Card className="bg-[#0A0A0A] border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center text-gray-400">
                No portfolio projects found. Create your first project to get started.
              </div>
            </CardContent>
          </Card>
        ) : (
          portfolioProjects?.map((project: PortfolioProject) => (
            <Card key={project.id} className="bg-[#0A0A0A] border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg text-white">
                        {project.title}
                      </CardTitle>
                      {project.isFeatured && (
                        <Star className="w-4 h-4 text-[#FF6B35] fill-current" />
                      )}
                      {!project.isActive && (
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    {project.client && (
                      <p className="text-[#00D4FF] font-medium">{project.client}</p>
                    )}
                    {project.category && (
                      <span className="inline-block text-xs bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-1 rounded mt-1">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.videoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.videoUrl!, '_blank')}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                      className="border-red-700 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {project.thumbnailUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {project.description && (
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Created: {new Date(project.createdAt!).toLocaleDateString()}</span>
                      {project.updatedAt !== project.createdAt && (
                        <span>Updated: {new Date(project.updatedAt!).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
