import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, FileText, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SummaryLength = "short" | "medium" | "detailed";

const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Text required",
        description: "Please enter some text to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsSummarizing(true);
    setSummary(null);

    try {
      const { data, error } = await supabase.functions.invoke("summarize-text", {
        body: { text, length: summaryLength },
      });

      if (error) throw error;

      if (data?.summary) {
        setSummary(data.summary);
        toast({
          title: "Success!",
          description: "Your text has been summarized",
        });
      }
    } catch (error: any) {
      console.error("Error summarizing text:", error);
      toast({
        title: "Summarization failed",
        description: error.message || "Failed to summarize text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard",
    });

    setTimeout(() => setCopied(false), 2000);
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
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-secondary mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Text Summarizer
            </h1>
            <p className="text-xl text-muted-foreground">
              Extract key insights from any text instantly
            </p>
          </div>

          {/* Summarizer Card */}
          <Card className="bg-gradient-card border-border/50 p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Paste your text here
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste an article, document, or any long text you want to summarize..."
                  className="min-h-64 bg-background/50 border-border/50 focus:border-secondary resize-none"
                  disabled={isSummarizing}
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  {text.length} characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Summary length
                </label>
                <Select
                  value={summaryLength}
                  onValueChange={(value) => setSummaryLength(value as SummaryLength)}
                  disabled={isSummarizing}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (2-3 sentences)</SelectItem>
                    <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
                    <SelectItem value="detailed">Detailed (Multiple paragraphs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSummarize}
                disabled={isSummarizing || !text.trim()}
                className="w-full bg-gradient-secondary hover:opacity-90 text-white font-semibold h-12"
              >
                {isSummarizing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Summary
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Summary Display */}
          {summary && (
            <Card className="bg-gradient-card border-border/50 p-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Summary</h3>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="border-secondary/50 hover:bg-secondary/10"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted/20 p-6 rounded-lg">
                  <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="bg-gradient-card border-border/50 p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">💡 Tips for best results</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Works best with articles, blog posts, and documents</li>
              <li>• Longer texts provide more context for accurate summaries</li>
              <li>• Choose "detailed" for complex or technical content</li>
              <li>• Use "short" for quick overviews and key points</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TextSummarizer;
