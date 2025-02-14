import { WeeklyReport, DailyActivity } from '../types/ProgressReport';

export const calculateMemberStats = (activities: DailyActivity[]) => {
  return activities.reduce((stats, activity) => {
    const { metrics } = activity;
    return {
      totalBugsAdded: (stats.totalBugsAdded || 0) + (metrics.bugsAdded || 0),
      totalBugsClosed: (stats.totalBugsClosed || 0) + (metrics.bugsClosed || 0),
      totalBugsReopened: (stats.totalBugsReopened || 0) + (metrics.bugsReopened || 0),
      totalTestsCompleted: (stats.totalTestsCompleted || 0) + (metrics.testsCompleted || 0),
      totalRequirementsReviewed: (stats.totalRequirementsReviewed || 0) + (metrics.requirementsReviewed || 0),
    };
  }, {
    totalBugsAdded: 0,
    totalBugsClosed: 0,
    totalBugsReopened: 0,
    totalTestsCompleted: 0,
    totalRequirementsReviewed: 0,
  });
};

export const generateWeeklyStats = (report: WeeklyReport) => {
  const memberStats: Record<string, ReturnType<typeof calculateMemberStats>> = {};
  
  Object.entries(report.dailyActivities).forEach(([memberName, activities]) => {
    memberStats[memberName] = calculateMemberStats(activities);
  });

  return memberStats;
};

export const parseActivityDescription = (description: string): Partial<DailyActivity['metrics']> => {
  const metrics: DailyActivity['metrics'] = {};
  
  // Extract numbers from common patterns
  if (description.match(/added\s+(\d+)\s+(?:new\s+)?bugs?/i)) {
    metrics.bugsAdded = parseInt(RegExp.$1);
  }
  if (description.match(/closed\s+(\d+)\s+(?:ready\s+)?bugs?/i)) {
    metrics.bugsClosed = parseInt(RegExp.$1);
  }
  if (description.match(/re-?opened?\s+(\d+)\s+(?:ready\s+)?bugs?/i)) {
    metrics.bugsReopened = parseInt(RegExp.$1);
  }
  if (description.match(/reviewed\s+(\d+)\s+(?:requirements?|PRD)/i)) {
    metrics.requirementsReviewed = parseInt(RegExp.$1);
  }
  
  return metrics;
};
