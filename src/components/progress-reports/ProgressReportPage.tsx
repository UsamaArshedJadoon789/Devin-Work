import React, { useState } from 'react';
import { WeeklyReport } from '../../types/ProgressReport';
import { ReportInput } from './ReportInput';
import { WeeklyStats } from './WeeklyStats';

export const ProgressReportPage: React.FC = () => {
  const [report, setReport] = useState<Partial<WeeklyReport> | null>(null);

  const handleReportParsed = (parsedReport: Partial<WeeklyReport>) => {
    setReport(parsedReport);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-6">QC Team Progress Report Analyzer</h1>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold mb-4">Input Weekly Report</h2>
            <ReportInput onReportParsed={handleReportParsed} />
          </div>
          
          {report && (
            <div>
              <h2 className="text-xl font-bold mb-4">Weekly Statistics</h2>
              <WeeklyStats report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
