import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, FileVideo, MessageSquare, Upload, CheckCircle2, AlertCircle, PlayCircle } from "lucide-react";
import type { ClientProject, ProjectAsset, ProjectFeedback, ProjectMilestone } from "@shared/schema";

export default function ClientPortal() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { data: projects, isLoading: projectsLoading } = useQuery<ClientProject[]>({
    queryKey: ["/api/client/projects"],
  });

  const { data: assets } = useQuery<ProjectAsset[]>({
    queryKey: ["/api/client/assets", selectedProject],
    enabled: !!selectedProject,
  });

  const { data: feedback } = useQuery<ProjectFeedback[]>({
    queryKey: ["/api/client/feedback", selectedProject],
    enabled: !!selectedProject,
  });

  const { data: milestones } = useQuery<ProjectMilestone[]>({
    queryKey: ["/api/client/milestones", selectedProject],
    enabled: !!selectedProject,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (milestones: ProjectMilestone[] = []) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.isCompleted).length;
    return (completed / milestones.length) * 100;
  };

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
              <p className="text-gray-600">Collaborate on your video projects with GrittyFlint</p>
            </div>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Project List Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Projects</CardTitle>
                <CardDescription>Select a project to view details</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {projects?.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`p-4 cursor-pointer border-l-4 transition-colors ${
                        selectedProject === project.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{project.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{project.projectType}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(project.status || "planning")}`}>
                          {project.status}
                        </Badge>
                      </div>
                      {project.deadline && (
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedProject ? (
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="assets">Files & Assets</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* Project Info */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{projects?.find(p => p.id === selectedProject)?.title}</CardTitle>
                            <CardDescription>{projects?.find(p => p.id === selectedProject)?.description}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(projects?.find(p => p.id === selectedProject)?.status || "planning")}>
                            {projects?.find(p => p.id === selectedProject)?.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Project Type</p>
                            <p className="text-lg">{projects?.find(p => p.id === selectedProject)?.projectType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Budget</p>
                            <p className="text-lg">{projects?.find(p => p.id === selectedProject)?.budget || "TBD"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Deadline</p>
                            <p className="text-lg">
                              {projects?.find(p => p.id === selectedProject)?.deadline 
                                ? new Date(projects.find(p => p.id === selectedProject)!.deadline!).toLocaleDateString()
                                : "TBD"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Progress</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={calculateProgress(milestones)} className="flex-1" />
                              <span className="text-sm font-medium">{Math.round(calculateProgress(milestones))}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {feedback?.slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-start space-x-3">
                              <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm">{item.comment}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant={item.status === "resolved" ? "default" : "secondary"}>
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="assets">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Files & Assets</CardTitle>
                      <CardDescription>View and download project files, videos, and documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assets?.map((asset) => (
                          <div key={asset.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center space-x-2">
                              {asset.fileType === "video" ? (
                                <PlayCircle className="w-5 h-5 text-blue-500" />
                              ) : (
                                <FileVideo className="w-5 h-5 text-gray-500" />
                              )}
                              <span className="font-medium text-sm">{asset.fileName}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Version {asset.version}</span>
                              <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                              View File
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="feedback">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback & Comments</CardTitle>
                      <CardDescription>Review feedback and provide comments on project assets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {feedback?.map((item) => (
                          <div key={item.id} className="border-l-4 border-blue-200 pl-4 py-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm">{item.comment}</p>
                                {item.timestamp && (
                                  <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Video timestamp: {item.timestamp}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={
                                  item.priority === "high" ? "destructive" :
                                  item.priority === "medium" ? "default" : "secondary"
                                }>
                                  {item.priority}
                                </Badge>
                                <Badge variant={item.status === "resolved" ? "default" : "secondary"}>
                                  {item.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Timeline</CardTitle>
                      <CardDescription>Track project milestones and deadlines</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {milestones?.map((milestone, index) => (
                          <div key={milestone.id} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              {milestone.isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : (
                                <AlertCircle className="w-6 h-6 text-gray-400" />
                              )}
                              {index < (milestones?.length || 0) - 1 && (
                                <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium">{milestone.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                  {milestone.dueDate && (
                                    <p>Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                                  )}
                                  {milestone.isCompleted && milestone.completedAt && (
                                    <p className="text-green-600">
                                      Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileVideo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Project</h3>
                  <p className="text-gray-600">Choose a project from the sidebar to view details and collaborate</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}