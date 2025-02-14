import React, { useState } from 'react';
import { parseWeeklyReport } from '../../utils/reportParser';
import { WeeklyReport } from '../../types/ProgressReport';

interface ReportInputProps {
  onReportParsed: (report: Partial<WeeklyReport>) => void;
}

export const ReportInput: React.FC<ReportInputProps> = ({ onReportParsed }) => {
  const [reportText, setReportText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedReport = parseWeeklyReport(reportText);
    onReportParsed(parsedReport);
    setReportText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Paste Weekly Report
        </label>
        <textarea
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={10}
          placeholder="Paste your weekly report here..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Process Report
      </button>
    </form>
  );
};
