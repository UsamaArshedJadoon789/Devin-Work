export interface TeamMember {
  name: string;
  role: string;
}

export interface DailyActivity {
  date: string;
  description: string;
  resourceName?: string;
  metrics: {
    bugsAdded?: number;
    bugsClosed?: number;
    bugsReopened?: number;
    testsCompleted?: number;
    requirementsReviewed?: number;
  };
}

export interface WeeklyReport {
  startDate: string;
  endDate: string;
  teamName: string;
  attendees: TeamMember[];
  dailyActivities: Record<string, DailyActivity[]>; // Key is team member name
}
