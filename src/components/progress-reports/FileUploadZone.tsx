import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface FileUploadZoneProps {
  onFileUpload: (content: string, type: 'weekly' | 'daily') => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState<'weekly' | 'daily'>('weekly');

  const handleFile = async (file: Blob) => {
    if (!(file instanceof File) || !file.name.endsWith('.txt')) {
      setError('Please upload a text file');
      return;
    }

    try {
      setProgress(50);
      const text = await file.text();
      setProgress(100);
      onFileUpload(text, uploadType);
      setError('');
    } catch (_err) {
      setError('Error reading file');
    } finally {
      window.setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload QA Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" onValueChange={(value) => setUploadType(value as 'weekly' | 'daily')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
            <TabsTrigger value="daily">Daily Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div
              className={`mt-4 border-2 border-dashed rounded-lg ${
                isDragging ? 'border-primary' : 'border-muted'
              }`}
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  handleFile(file);
                }}
                className="flex flex-col items-center justify-center p-8 cursor-pointer"
              >
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload-weekly"
                />
                <label htmlFor="file-upload-weekly" className="cursor-pointer text-center">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your weekly report file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload a text file containing the full week's report
                  </p>
                </label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="daily">
            <div
              className={`mt-4 border-2 border-dashed rounded-lg ${
                isDragging ? 'border-primary' : 'border-muted'
              }`}
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  handleFile(file);
                }}
                className="flex flex-col items-center justify-center p-8 cursor-pointer"
              >
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload-daily"
                />
                <label htmlFor="file-upload-daily" className="cursor-pointer text-center">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your daily report file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload a text file containing a single day's report
                  </p>
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {progress > 0 && <Progress value={progress} className="mt-4" />}
      </CardContent>
    </Card>
  );
};
