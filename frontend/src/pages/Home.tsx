import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileCheck, TrendingUp, Bell, CheckCircle2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const outcomes = [
    {
      icon: Shield,
      text: "Anonymous or verified complaint submission",
    },
    {
      icon: FileCheck,
      text: "Status tracking & escalation system",
    },
    {
      icon: TrendingUp,
      text: "Admin dashboard for resolutions",
    },
    {
      icon: Bell,
      text: "Reports and analytics",
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: "Easy Submission",
      description: "Submit complaints in minutes with our simple form",
    },
    {
      icon: Bell,
      title: "Real-time Updates",
      description: "Get notified when your complaint status changes",
    },
    {
      icon: Users,
      title: "Expert Resolution",
      description: "Dedicated admins work to resolve your issues",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <Card className="shadow-2xl border-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    Online Complaint &<br />Grievance Portal
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    A trusted platform designed to help you submit complaints with confidence,
                    track their progress in real-time, and ensure swift resolution by our
                    dedicated team.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/login")}
                    className="text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Login / Signup
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/anonymous")}
                    className="text-lg px-8 h-12 border-2"
                  >
                    Submit Anonymously
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Outcomes */}
          <Card className="border-primary/10">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                What You Can Expect
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                      <outcome.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-left text-foreground pt-1">{outcome.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-8 text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to Submit Your Complaint?
              </h2>
              <p className="text-primary-foreground/90 max-w-xl mx-auto">
                Join thousands of users who trust our platform for fair and efficient
                grievance resolution.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/signup")}
                className="mt-4 text-lg px-8 h-12"
              >
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
