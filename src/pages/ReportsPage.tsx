import React from 'react';
import { BreadcrumbNav } from '../components/navigation/BreadcrumbNav';
import { FileUploadZone } from '../components/reports/FileUploadZone';
import { AnalyticsDashboard } from '../components/reports/AnalyticsDashboard';

export const ReportsPage: React.FC = () => {
  const handleFileUpload = (content: string, type: 'weekly' | 'daily', resourceName?: string) => {
    // Process uploaded file
    void content;
    void type;
    void resourceName;
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav />
      
      <div className="grid gap-6">
        <FileUploadZone onFileUpload={handleFileUpload} />
        <AnalyticsDashboard report={{
          startDate: '2025-02-10',
          endDate: '2025-02-14',
          teamName: 'QC Team',
          attendees: [
            { name: 'Hamza Sohail', role: 'QA Engineer' },
            { name: 'Farah Al-Haj Ahmad', role: 'QA Engineer' },
            { name: 'Moath Abusall', role: 'QA Engineer' }
          ],
          dailyActivities: {}
        }} />
      </div>
    </div>
  );
};
