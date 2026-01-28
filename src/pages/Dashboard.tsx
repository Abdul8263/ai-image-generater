import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Zap } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Studio
            </h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unleash the Power of
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into reality with our cutting-edge AI tools.
            Generate stunning images and summarize complex texts instantly.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Image Generator Card */}
          <Link to="/image-generator" className="group">
            <Card className="relative overflow-hidden bg-gradient-card border-border/50 p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:animate-float">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  AI Image Generator
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Transform your imagination into stunning visuals. Describe what you want,
                  and watch AI create beautiful, high-quality images in seconds.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  Start Creating
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Text Summarizer Card */}
          <Link to="/text-summarizer" className="group">
            <Card className="relative overflow-hidden bg-gradient-card border-border/50 p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-gradient-secondary flex items-center justify-center mb-6 group-hover:animate-float">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-secondary transition-colors">
                  Text Summarizer
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Extract key insights from lengthy content instantly. Paste any text
                  and get concise, accurate summaries in your preferred format.
                </p>
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  Start Summarizing
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Fast
            </div>
            <div className="text-muted-foreground">Lightning-quick results</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Powerful
            </div>
            <div className="text-muted-foreground">Advanced AI models</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Simple
            </div>
            <div className="text-muted-foreground">Easy to use interface</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
