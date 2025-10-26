import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ComplaintForm from "@/components/ComplaintForm";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Plus } from "lucide-react";

interface Complaint {
  id: number;
  category: string;
  description: string;
  priority: string;
  status: string;
  date: string;
  name?: string;
}

const UserDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "User";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(stored);
  }, []);

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

  const handleComplaintSubmitted = () => {
    const stored = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(stored);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar role="user" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {userEmail}</CardTitle>
                <CardDescription>Manage and track your complaints</CardDescription>
              </CardHeader>
            </Card>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Complaints</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Complaint
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit New Complaint</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to submit your complaint
                    </DialogDescription>
                  </DialogHeader>
                  <ComplaintForm onSubmit={handleComplaintSubmitted} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {complaints.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No complaints yet. Submit your first complaint to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                complaints.map((complaint) => (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <h3 className="font-semibold capitalize">{complaint.category}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {complaint.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span>
                              {new Date(complaint.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="capitalize">Priority: {complaint.priority}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status === "new" && "New"}
                          {complaint.status === "under-review" && "Under Review"}
                          {complaint.status === "resolved" && "Resolved"}
                        </Badge>
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

export default UserDashboard;
