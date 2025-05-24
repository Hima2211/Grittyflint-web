import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-6xl md:text-7xl font-light text-black mb-8 leading-none">
              Let's Work<br />
              Together
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Ready to bring your vision to life? We'd love to hear about your project and explore how we can create something extraordinary together.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Email</h3>
                <p className="text-lg text-black">hello@grittyflint.com</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Phone</h3>
                <p className="text-lg text-black">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Location</h3>
                <p className="text-lg text-black">Los Angeles, CA</p>
              </div>
            </div>
          </div>

          <div className="lg:pt-16">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-500 uppercase tracking-wider">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Smith" 
                            {...field} 
                            className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-3 focus:border-black focus:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-500 uppercase tracking-wider">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@company.com" 
                            {...field} 
                            className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-3 focus:border-black focus:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-500 uppercase tracking-wider">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Company" 
                          {...field} 
                          className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-3 focus:border-black focus:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-500 uppercase tracking-wider">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project, goals, and timeline..." 
                          {...field} 
                          rows={6}
                          className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-3 focus:border-black focus:ring-0 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-8">
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-none uppercase tracking-wider text-sm font-medium transition-colors duration-300"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}