import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import { useToast } from "@/hooks/use-toast";

interface EscalationRecord {
  id: string;
  complaint_id: string;
  escalated_to: string;
  escalated_at: string;
  reason: string;
  notes: string;
}

const EscalationHistory = () => {
  const [escalations, setEscalations] = useState<EscalationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEscalations();
  }, []);

  const fetchEscalations = async () => {
    try {
      // TODO: Replace with backend call to fetch escalation history
      setEscalations([]); // Demo: no data
    } catch (error: any) {
      console.error("Error fetching escalations:", error);
      toast({
        title: "Error",
        description: "Failed to load escalation history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Escalation History</h1>
              <p className="text-muted-foreground mt-2">
                View all complaint escalations
              </p>
            </div>

            <div className="grid gap-4">
              {loading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Loading escalations...</p>
                  </CardContent>
                </Card>
              ) : escalations.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No escalations found.</p>
                  </CardContent>
                </Card>
              ) : (
                escalations.map((escalation) => (
                  <Card key={escalation.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Complaint #{escalation.complaint_id.slice(0, 8)}</span>
                        <Badge variant="destructive">Escalated</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Escalated At</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(escalation.escalated_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Reason</p>
                        <p className="text-sm text-muted-foreground">
                          {escalation.reason}
                        </p>
                      </div>
                      {escalation.notes && (
                        <div>
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-muted-foreground">
                            {escalation.notes}
                          </p>
                        </div>
                      )}
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

export default EscalationHistory;
