import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ComplaintFormProps {
  onSubmit?: () => void;
}

const ComplaintForm = ({ onSubmit }: ComplaintFormProps) => {
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const complaint = {
      id: Date.now(),
      category,
      description,
      priority,
      status: "new",
      date: new Date().toISOString(),
      name: localStorage.getItem("userEmail") || "User",
    };

    const existingComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    localStorage.setItem("complaints", JSON.stringify([...existingComplaints, complaint]));

    toast({
      title: "Complaint submitted",
      description: "Your complaint has been submitted successfully.",
    });

    setCategory("");
    setDescription("");
    setPriority("");
    setFile(null);

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Complaint Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="behavior">Behavior</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your complaint in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={priority} onValueChange={setPriority} required>
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload Evidence (Optional)</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Complaint
      </Button>
    </form>
  );
};

export default ComplaintForm;
