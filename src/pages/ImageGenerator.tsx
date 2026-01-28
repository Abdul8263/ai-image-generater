import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Sparkles, Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your image",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });

      if (error) throw error;

      if (data?.image) {
        setGeneratedImage(data.image);
        toast({
          title: "Success!",
          description: "Your image has been generated",
        });
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Your image has been saved",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-primary mb-6">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Image Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Describe your vision and watch AI bring it to life
            </p>
          </div>

          {/* Generator Card */}
          <Card className="bg-gradient-card border-border/50 p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Describe your image
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A futuristic city at sunset with flying cars and neon lights..."
                  className="min-h-32 bg-background/50 border-border/50 focus:border-primary resize-none"
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold h-12"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Image Display */}
          {generatedImage && (
            <Card className="bg-gradient-card border-border/50 p-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Generated Image</h3>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden bg-muted/20">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-sm text-muted-foreground bg-muted/10 p-4 rounded-lg">
                  <strong>Prompt:</strong> {prompt}
                </div>
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="bg-gradient-card border-border/50 p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">✨ Tips for better results</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Be specific about style, colors, and mood</li>
              <li>• Include details about lighting and composition</li>
              <li>• Mention art styles (e.g., "watercolor", "cyberpunk", "minimalist")</li>
              <li>• Describe the main subject clearly</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ImageGenerator;
