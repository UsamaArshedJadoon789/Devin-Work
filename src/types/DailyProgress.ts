export interface DailyProgressData {
  date: string;
  totalBugsAdded: number;
  totalBugsClosed: number;
  totalBugsReopened: number;
}

export interface ResourceMetrics {
  name: string;
  bugsAdded: number;
  bugsClosed: number;
  bugsReopened: number;
  requirementsReviewed: number;
}
