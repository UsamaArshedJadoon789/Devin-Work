import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface ReportUploadProps {
  onUpload: (content: string, type: 'weekly' | 'daily', resourceName?: string) => void;
}

const teamMembers = [
  'Hamza Sohail',
  'Farah Al-Haj Ahmad',
  'Moath Abusall'
];

export const ReportUpload: React.FC<ReportUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState<'weekly' | 'daily'>('weekly');
  const [selectedResource, setSelectedResource] = useState<string>('');

  const handleFile = async (file: globalThis.File) => {
    if (!file.name.endsWith('.txt')) {
      setError('Please upload a text file');
      return;
    }

    if (uploadType === 'daily' && !selectedResource) {
      setError('Please select a team member');
      return;
    }

    try {
      setProgress(30);
      const text = await file.text();
      setProgress(60);
      
      // Validate report format
      if (!text.includes('QC Team Weekly Progress')) {
        setError('Invalid report format');
        setProgress(0);
        return;
      }
      
      setProgress(90);
      onUpload(text, uploadType, selectedResource);
      setError('');
      setProgress(100);
      
      globalThis.setTimeout(() => setProgress(0), 1000);
    } catch {
      setError('Error reading file');
      setProgress(0);
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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
            <TabsTrigger value="daily">Daily Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div
              className={`border-2 border-dashed rounded-lg transition-colors ${
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
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your weekly report file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload a text file containing the full week's report for all team members
                  </p>
                </label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="daily">
            <div className="space-y-4">
              <select
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Team Member</option>
                {teamMembers.map(resource => (
                  <option key={resource} value={resource}>{resource}</option>
                ))}
              </select>

              <div
                className={`border-2 border-dashed rounded-lg transition-colors ${
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
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your daily report file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload a text file containing a single day's report for {selectedResource || 'selected team member'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {progress > 0 && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">
              {progress === 100 ? 'Upload complete!' : 'Processing file...'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
