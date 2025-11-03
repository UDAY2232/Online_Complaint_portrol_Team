import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

import { AlertCircle } from "lucide-react";

interface Complaint {
  id: number;
  category: string;
  description: string;
  priority: string;
  status: string;
  date: string;
  name?: string;
  anonymous?: boolean;
  escalation_status?: string;
  escalated_at?: string;
}

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isCheckingEscalations, setIsCheckingEscalations] = useState(false);
  const { toast } = useToast();

  const fetchComplaints = async () => {
    try {
      const response = await api.getComplaints();
      // normalize created_at -> date for compatibility and show only user-raised complaints
      const normalized = response.data.map((c: any) => ({ ...c, date: c.date || c.created_at }));
      setComplaints(normalized.filter((c: any) => !c.is_anonymous));
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "Error",
        description: "Failed to fetch complaints. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const checkEscalations = async () => {
    setIsCheckingEscalations(true);
    try {
      const response = await api.checkEscalations();
      const escalatedCount = response.data.escalated?.length || 0;
      
      toast({
        title: "Escalation check complete",
        description: `${escalatedCount} complaints escalated`
      });
      
      // Reload complaints
      fetchComplaints();
    } catch (error: any) {
      console.error("Escalation check failed:", error);
      toast({
        title: "Escalation check failed",
        description: error.message || "Failed to check escalations",
        variant: "destructive",
      });
    } finally {
      setIsCheckingEscalations(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const adminEmail = localStorage.getItem('userEmail') || 'admin';
      await api.updateComplaintStatus(id, newStatus, adminEmail);
      
      // Update local state
      setComplaints(complaints.map(c =>
        c.id === id ? { ...c, status: newStatus } : c
      ));
      
      toast({
        title: "Status updated",
        description: "Complaint status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update complaint status. Please try again.",
        variant: "destructive",
      });
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Manage and resolve all complaints
                </p>
              </div>
              <Button 
                onClick={checkEscalations}
                disabled={isCheckingEscalations}
                variant="outline"
              >
                {isCheckingEscalations ? "Checking..." : "Check Escalations"}
              </Button>
            </div>

            <div className="grid gap-4">
              {complaints.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No complaints to display.</p>
                  </CardContent>
                </Card>
              ) : (
                complaints.map((complaint) => (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start gap-3">
                              {complaint.escalation_status === "escalated" && (
                                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold capitalize">{complaint.category}</h3>
                                  <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                                    {complaint.priority} priority
                                  </Badge>
                                  {complaint.escalation_status === "escalated" && (
                                    <Badge variant="destructive">Escalated</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Submitted by: {complaint.name || "Anonymous"} • {" "}
                                  {new Date(complaint.date).toLocaleDateString()}
                                  {complaint.escalated_at && (
                                    <> • Escalated: {new Date(complaint.escalated_at).toLocaleDateString()}</>
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm">{complaint.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Status:</span>
                            <Select
                              value={complaint.status}
                              onValueChange={(value) => updateStatus(complaint.id, value)}
                            >
                              <SelectTrigger className="w-[150px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="under-review">Under Review</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status === "new" && "New"}
                            {complaint.status === "under-review" && "Under Review"}
                            {complaint.status === "resolved" && "Resolved"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedComplaint(complaint)}
                          >
                            View Details
                          </Button>
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

      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">{selectedComplaint?.category}</DialogTitle>
            <DialogDescription>
              Complaint ID: {selectedComplaint?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Submitted By</p>
              <p className="text-sm text-muted-foreground">
                {selectedComplaint?.name || "Anonymous"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {selectedComplaint && new Date(selectedComplaint.date).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <Badge variant="outline" className={selectedComplaint && getPriorityColor(selectedComplaint.priority)}>
                {selectedComplaint?.priority}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {selectedComplaint?.description}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge className={selectedComplaint && getStatusColor(selectedComplaint.status)}>
                {selectedComplaint?.status}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
