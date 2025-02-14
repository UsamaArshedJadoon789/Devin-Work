import React from 'react';
import { WeeklyReport } from '../../types/ProgressReport';
import { generateWeeklyStats } from '../../utils/reportAnalytics';

interface WeeklyStatsProps {
  report: WeeklyReport;
}

export const WeeklyStats: React.FC<WeeklyStatsProps> = ({ report }) => {
  const stats = generateWeeklyStats(report);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Weekly Statistics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Member
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bugs Added
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bugs Closed
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bugs Reopened
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirements Reviewed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(stats).map(([memberName, memberStats]) => (
              <tr key={memberName}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {memberName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {memberStats.totalBugsAdded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {memberStats.totalBugsClosed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {memberStats.totalBugsReopened}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {memberStats.totalRequirementsReviewed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
