import React, { useState } from 'react';
import { WeeklyReport, DailyActivity, TeamMember } from '../../types/ProgressReport';
import { DailyReportForm } from './DailyReportForm';
import { WeeklyStats } from './WeeklyStats';
import { parseActivityDescription } from '../../utils/reportAnalytics';

export const ProgressReportPage: React.FC = () => {
  const [report, setReport] = useState<WeeklyReport>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    teamName: 'QC Team',
    attendees: [
      { name: 'Hamza Sohail', role: 'QA Engineer' },
      { name: 'Farah Al-Haj Ahmad', role: 'QA Engineer' },
      { name: 'Moath Abusall', role: 'QA Engineer' },
    ],
    dailyActivities: {},
  });

  const handleDailyReport = (memberName: string, activity: DailyActivity) => {
    const metrics = parseActivityDescription(activity.description);
    const updatedActivity = { ...activity, metrics };

    setReport((prev) => ({
      ...prev,
      dailyActivities: {
        ...prev.dailyActivities,
        [memberName]: [...(prev.dailyActivities[memberName] || []), updatedActivity],
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-6">{report.teamName} Weekly Progress</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold mb-4">Add Daily Report</h2>
            <DailyReportForm
              teamMembers={report.attendees}
              onSubmit={handleDailyReport}
            />
          </div>
          
          <div>
            <WeeklyStats report={report} />
          </div>
        </div>
      </div>
    </div>
  );
};
