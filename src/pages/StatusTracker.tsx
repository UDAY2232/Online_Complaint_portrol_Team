import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface Complaint {
  id: number;
  category: string;
  description: string;
  priority: string;
  status: string;
  date: string;
  name?: string;
}

const StatusTracker = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(stored);
  }, []);

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { label: "New", value: "new", icon: Circle },
      { label: "Under Review", value: "under-review", icon: Clock },
      { label: "Resolved", value: "resolved", icon: CheckCircle2 },
    ];

    const currentIndex = steps.findIndex((s) => s.value === currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-primary text-primary-foreground";
      case "under-review":
        return "bg-warning text-warning-foreground";
      case "resolved":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Track Complaint Status</h1>
              <p className="text-muted-foreground mt-2">
                Monitor the progress of your submitted complaints
              </p>
            </div>

            <div className="space-y-6">
              {complaints.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No complaints to track. Submit a complaint to see its status here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                complaints.map((complaint) => (
                  <Card key={complaint.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="capitalize">{complaint.category}</CardTitle>
                          <CardDescription>
                            Submitted on {new Date(complaint.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status === "new" && "New"}
                          {complaint.status === "under-review" && "Under Review"}
                          {complaint.status === "resolved" && "Resolved"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description</p>
                          <p className="text-sm">{complaint.description}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-4">Status Timeline</p>
                          <div className="relative">
                            <div className="flex items-center justify-between">
                              {getStatusSteps(complaint.status).map((step, index) => (
                                <div key={step.value} className="flex flex-col items-center flex-1">
                                  <div className="relative flex items-center justify-center w-full">
                                    {index > 0 && (
                                      <div
                                        className={`absolute right-1/2 h-0.5 w-full ${
                                          step.completed
                                            ? "bg-primary"
                                            : "bg-muted"
                                        }`}
                                      />
                                    )}
                                    <div
                                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                                        step.completed
                                          ? "border-primary bg-primary text-primary-foreground"
                                          : "border-muted bg-background text-muted-foreground"
                                      }`}
                                    >
                                      <step.icon className="h-5 w-5" />
                                    </div>
                                    {index < 2 && (
                                      <div
                                        className={`absolute left-1/2 h-0.5 w-full ${
                                          getStatusSteps(complaint.status)[index + 1].completed
                                            ? "bg-primary"
                                            : "bg-muted"
                                        }`}
                                      />
                                    )}
                                  </div>
                                  <p
                                    className={`mt-2 text-xs font-medium ${
                                      step.completed
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {step.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Priority: <span className="capitalize font-medium">{complaint.priority}</span></span>
                          <span>•</span>
                          <span>ID: #{complaint.id}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatusTracker;
