import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, TrendingUp, FileText, Lightbulb, Hash, Type } from "lucide-react";
import type { AnalysisData } from "@/pages/Index";

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-accent text-accent-foreground";
    if (score >= 60) return "bg-primary text-primary-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Engagement Score */}
      <Card className="overflow-hidden shadow-medium">
        <div className="bg-gradient-primary p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-sm font-medium text-white/80">Engagement Score</h2>
              <p className="text-4xl font-bold text-white">{data.engagement.score}%</p>
            </div>
            <Badge className={`${getScoreColor(data.engagement.score)} text-sm px-4 py-1`}>
              {getScoreLabel(data.engagement.score)}
            </Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Key Improvements</h3>
          </div>
          <ul className="space-y-2">
            {data.engagement.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Suggested Titles */}
      {data.titles && data.titles.length > 0 && (
        <Card className="shadow-medium">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Suggested Titles</h3>
            </div>
            <div className="space-y-3">
              {data.titles.map((title, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(title)}
                  title="Click to copy"
                >
                  <p className="font-medium text-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Suggested Hashtags */}
      {data.hashtags && data.hashtags.length > 0 && (
        <Card className="shadow-medium">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Suggested Hashtags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.hashtags.map((hashtag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer text-sm px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => navigator.clipboard.writeText(hashtag.startsWith('#') ? hashtag : `#${hashtag}`)}
                  title="Click to copy"
                >
                  {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* AI Suggestions */}
      <Card className="shadow-medium">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Suggestions</h3>
          </div>
          <div className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
              >
                <p className="text-sm text-foreground">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Extracted Text */}
      <Card className="shadow-medium">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Extracted Text</h3>
          </div>
          <Separator className="my-4" />
          <div className="rounded-lg bg-muted p-4">
            <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
              {data.extractedText}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
