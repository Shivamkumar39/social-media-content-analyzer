import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Image, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisData } from "@/pages/Index";

interface FileUploadProps {
  onAnalysisComplete: (data: AnalysisData) => void;
  onAnalyzingChange: (analyzing: boolean) => void;
}

export const FileUpload = ({ onAnalysisComplete, onAnalyzingChange }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const fileType = file.type;

    // Validate file type
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    onAnalyzingChange(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          
          toast({
            title: "Processing document",
            description: "Extracting text and analyzing content...",
          });

          // Call edge function for analysis
          const { data, error } = await supabase.functions.invoke('analyze-content', {
            body: {
              file: base64Data,
              fileType: fileType,
              fileName: file.name,
            }
          });

          if (error) throw error;

          if (data) {
            onAnalysisComplete(data);
            toast({
              title: "Analysis complete",
              description: "Your content has been analyzed successfully",
            });
          }
        } catch (error) {
          console.error('Analysis error:', error);
          toast({
            title: "Analysis failed",
            description: "There was an error analyzing your document. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
          onAnalyzingChange(false);
        }
      };

      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "Could not read the file. Please try again.",
          variant: "destructive",
        });
        setIsUploading(false);
        onAnalyzingChange(false);
      };
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
      onAnalyzingChange(false);
    }
  }, [toast, onAnalysisComplete, onAnalyzingChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <Card className="overflow-hidden shadow-medium transition-shadow hover:shadow-lg">
      <div
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed p-12 text-center transition-all ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary hover:bg-primary/5'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {isUploading ? (
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          ) : (
            <Upload className="h-10 w-10 text-primary" />
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {isUploading ? 'Processing...' : isDragActive ? 'Drop your file here' : 'Upload Document'}
        </h3>
        
        <p className="mb-6 text-muted-foreground">
          {isUploading 
            ? 'Extracting text and analyzing content...' 
            : 'Drag and drop a PDF or image file, or click to browse'}
        </p>

        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <p>We are working on it.</p>
            <span>PDF Files</span>
          </div>
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            <span>Images (OCR)</span>
          </div>
        </div>

        {!isUploading && (
          <Button variant="outline" className="mt-6" type="button">
            Select File
          </Button>
        )}
      </div>
    </Card>
  );
};
