import React, { useState } from 'react';
import { WeeklyReport, DailyActivity, TeamMember } from '../../types/ProgressReport';
import { DailyReport } from './DailyReport';
import { WeeklyStats } from './WeeklyStats';

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Hamza Sohail', role: 'QA Engineer' },
  { name: 'Farah Al-Haj Ahmad', role: 'QA Engineer' },
  { name: 'Moath Abusall', role: 'QA Engineer' },
];

export const ProgressReportPage: React.FC = () => {
  const [report, setReport] = useState<WeeklyReport>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    teamName: 'QC Team',
    attendees: TEAM_MEMBERS,
    dailyActivities: {},
  });

  const handleDailyReport = (memberName: string, activity: DailyActivity) => {
    setReport((prev) => ({
      ...prev,
      dailyActivities: {
        ...prev.dailyActivities,
        [memberName]: [...(prev.dailyActivities[memberName] || []), activity],
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-6">QC Team Progress Report System</h1>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-xl font-bold">Daily Reports</h2>
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="bg-white p-4 rounded-lg shadow">
                <DailyReport
                  memberName={member.name}
                  onSubmit={(activity) => handleDailyReport(member.name, activity)}
                />
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Weekly Statistics</h2>
            <WeeklyStats report={report} />
          </div>
        </div>
      </div>
    </div>
  );
};
