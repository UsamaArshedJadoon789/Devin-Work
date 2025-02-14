import React, { useState } from 'react';
import { WeeklyReport } from '../../types/ProgressReport';
import { FileUploadZone } from './FileUploadZone';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { parseWeeklyReport } from '../../utils/reportParser';

export const ProgressReportPage: React.FC = () => {
  const [report, setReport] = useState<WeeklyReport | null>(null);

  const handleFileUpload = (content: string, type: 'weekly' | 'daily') => {
    try {
      const parsedReport = parseWeeklyReport(content);
      if (type === 'weekly') {
        setReport(parsedReport as WeeklyReport);
      } else {
        // For daily reports, merge with existing data if available
        setReport((prevReport) => {
          if (!prevReport) return parsedReport as WeeklyReport;
          return {
            ...prevReport,
            dailyActivities: {
              ...prevReport.dailyActivities,
              ...parsedReport.dailyActivities,
            },
          };
        });
      }
    } catch {
      // Handle error silently - error state is managed by FileUploadZone
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          QA Team Progress Report Analysis
        </h1>
        
        <div className="grid gap-8">
          <FileUploadZone onFileUpload={handleFileUpload} />
          
          {report && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Analysis Dashboard</h2>
                {report.startDate && report.endDate && (
                  <p className="text-sm text-gray-500">
                    Period: {report.startDate} to {report.endDate}
                  </p>
                )}
              </div>
              <AnalyticsDashboard report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
