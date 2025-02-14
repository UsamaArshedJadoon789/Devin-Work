import { DailyActivity, WeeklyReport } from '../types/ProgressReport';

export const parseWeeklyReport = (reportText: string): Partial<WeeklyReport> => {
  const lines = reportText.split('\n').filter(line => line.trim());
  const report: Partial<WeeklyReport> = {
    teamName: '',
    attendees: [],
    dailyActivities: {}
  };

  let currentMember = '';
  let isInDetails = false;

  lines.forEach((line, index) => {
    if (index === 0) {
      report.teamName = line.trim();
    } else if (line.includes('To')) {
      const [startDate, endDate] = line.split('To').map(d => d.trim());
      report.startDate = startDate;
      report.endDate = endDate;
    } else if (line.includes('ATTENDEES')) {
      const nextLine = lines[index + 1];
      report.attendees = nextLine.split(',').map(name => ({
        name: name.trim(),
        role: 'QA Engineer'
      }));
    } else if (line.includes('Details')) {
      isInDetails = true;
    } else if (isInDetails) {
      if (line.includes(':')) {
        currentMember = line.split(':')[0].trim();
        if (!report.dailyActivities![currentMember]) {
          report.dailyActivities![currentMember] = [];
        }
      } else if (currentMember && line.trim()) {
        const activity: DailyActivity = {
          date: new Date().toISOString().split('T')[0],
          description: line.trim(),
          metrics: parseMetrics(line.trim())
        };
        report.dailyActivities![currentMember].push(activity);
      }
    }
  });

  return report;
};

const parseMetrics = (description: string): DailyActivity['metrics'] => {
  const metrics: DailyActivity['metrics'] = {};
  
  const numberPattern = /(\d+)/;
  
  if (description.toLowerCase().includes('bug')) {
    if (description.toLowerCase().includes('added')) {
      const match = description.match(numberPattern);
      if (match) metrics.bugsAdded = parseInt(match[1]);
    }
    if (description.toLowerCase().includes('closed')) {
      const match = description.match(numberPattern);
      if (match) metrics.bugsClosed = parseInt(match[1]);
    }
    if (description.toLowerCase().includes('re-open') || description.toLowerCase().includes('reopen')) {
      const match = description.match(numberPattern);
      if (match) metrics.bugsReopened = parseInt(match[1]);
    }
  }
  
  if (description.toLowerCase().includes('reviewed')) {
    const match = description.match(numberPattern);
    if (match) metrics.requirementsReviewed = parseInt(match[1]);
  }

  return metrics;
};
