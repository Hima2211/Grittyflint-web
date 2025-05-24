import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-r from-[#1A1A1A] via-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000" 
          alt="Abstract cinematic pattern background" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Tell Your <span className="text-[#00D4FF]">Story</span>?
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto mb-8">
            Let's create something extraordinary together. Reach out today for a consultation and discover how we can transform your vision into cinematic reality.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="bg-[#1A1A1A]/50 border-gray-700 focus:border-[#00D4FF]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Company name" 
                            className="bg-[#1A1A1A]/50 border-gray-700 focus:border-[#00D4FF]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          className="bg-[#1A1A1A]/50 border-gray-700 focus:border-[#00D4FF]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#1A1A1A]/50 border-gray-700 focus:border-[#00D4FF]">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial/Ad</SelectItem>
                          <SelectItem value="marketing">Marketing Video</SelectItem>
                          <SelectItem value="brand">Brand Film</SelectItem>
                          <SelectItem value="digital">Digital Content</SelectItem>
                          <SelectItem value="post-production">Post-Production</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Tell us about your project vision, goals, and timeline..." 
                          className="bg-[#1A1A1A]/50 border-gray-700 focus:border-[#00D4FF]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  {mutation.isPending ? "Sending..." : "Get Started"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 cinematic-gradient rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-[#A1A1AA]">hello@spectramedia.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 cinematic-gradient-alt rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-[#A1A1AA]">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#FF6B35] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Studio</div>
                    <div className="text-[#A1A1AA]">Los Angeles, CA</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Our Work</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-[#1A1A1A]/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:border-[#00D4FF] transition-all duration-300"
                >
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-[#1A1A1A]/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:border-[#00D4FF] transition-all duration-300"
                >
                  <i className="fab fa-linkedin text-white"></i>
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-[#1A1A1A]/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:border-[#00D4FF] transition-all duration-300"
                >
                  <i className="fab fa-vimeo text-white"></i>
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-[#1A1A1A]/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:border-[#00D4FF] transition-all duration-300"
                >
                  <i className="fab fa-youtube text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
