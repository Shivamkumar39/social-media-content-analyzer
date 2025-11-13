import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Sparkles } from "lucide-react";

export interface AnalysisData {
  extractedText: string;
  titles: string[];
  hashtags: string[];
  suggestions: string[];
  engagement: {
    score: number;
    improvements: string[];
  };
}

const Index = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">AI-Powered Content Analysis</span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Social Media Content Analyzer
            </h1>
            <p className="text-xl text-white/90">
              Upload your documents and get instant AI-powered suggestions to boost engagement
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <FileUpload 
            onAnalysisComplete={setAnalysisData} 
            onAnalyzingChange={setIsAnalyzing}
          />
          
          {analysisData && !isAnalyzing && (
            <AnalysisResults data={analysisData} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Extract text from PDFs and images with OCR</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
