import React from 'react';
import { WeeklyReport } from '../../types/ProgressReport';

interface WeeklyStatsProps {
  report: Partial<WeeklyReport>;
}

interface MemberStats {
  bugsAdded: number;
  bugsClosed: number;
  bugsReopened: number;
  requirementsReviewed: number;
}

export const WeeklyStats: React.FC<WeeklyStatsProps> = ({ report }) => {
  const calculateMemberStats = (memberActivities: any[]): MemberStats => {
    return memberActivities.reduce((stats, activity) => {
      const metrics = activity.metrics || {};
      return {
        bugsAdded: (stats.bugsAdded || 0) + (metrics.bugsAdded || 0),
        bugsClosed: (stats.bugsClosed || 0) + (metrics.bugsClosed || 0),
        bugsReopened: (stats.bugsReopened || 0) + (metrics.bugsReopened || 0),
        requirementsReviewed: (stats.requirementsReviewed || 0) + (metrics.requirementsReviewed || 0),
      };
    }, { bugsAdded: 0, bugsClosed: 0, bugsReopened: 0, requirementsReviewed: 0 });
  };

  const memberStats = report.dailyActivities ? 
    Object.entries(report.dailyActivities).reduce((acc, [member, activities]) => {
      acc[member] = calculateMemberStats(activities);
      return acc;
    }, {} as Record<string, MemberStats>) : {};

  return (
    <div className="mt-4">
      {report.startDate && report.endDate && (
        <div className="mb-4 text-sm text-gray-600">
          Period: {report.startDate} to {report.endDate}
        </div>
      )}
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
            {Object.entries(memberStats).map(([memberName, stats]) => (
              <tr key={memberName}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {memberName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stats.bugsAdded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stats.bugsClosed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stats.bugsReopened}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stats.requirementsReviewed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
