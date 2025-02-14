import React from 'react';
import { TaskMetrics } from '../components/dashboard/TaskMetrics';
import { TeamPerformance } from '../components/dashboard/TeamPerformance';
import { BreadcrumbNav } from '../components/navigation/BreadcrumbNav';

const mockData = {
  daily: [
    { date: '2025-02-10', bugsAdded: 5, bugsClosed: 3, bugsReopened: 1 },
    { date: '2025-02-11', bugsAdded: 3, bugsClosed: 4, bugsReopened: 0 },
    { date: '2025-02-12', bugsAdded: 4, bugsClosed: 2, bugsReopened: 2 },
    { date: '2025-02-13', bugsAdded: 2, bugsClosed: 5, bugsReopened: 1 },
    { date: '2025-02-14', bugsAdded: 6, bugsClosed: 3, bugsReopened: 0 }
  ],
  weekly: [
    { name: 'Hamza Sohail', bugsAdded: 8, bugsClosed: 6, bugsReopened: 2, requirementsReviewed: 4 },
    { name: 'Farah Al-Haj Ahmad', bugsAdded: 6, bugsClosed: 5, bugsReopened: 1, requirementsReviewed: 3 },
    { name: 'Moath Abusall', bugsAdded: 7, bugsClosed: 4, bugsReopened: 2, requirementsReviewed: 5 }
  ]
};

const teamMembers = [
  {
    name: 'Hamza Sohail',
    bugsAdded: 8,
    bugsClosed: 6,
    bugsReopened: 2,
    requirementsReviewed: 4
  },
  {
    name: 'Farah Al-Haj Ahmad',
    bugsAdded: 6,
    bugsClosed: 5,
    bugsReopened: 1,
    requirementsReviewed: 3
  },
  {
    name: 'Moath Abusall',
    bugsAdded: 7,
    bugsClosed: 4,
    bugsReopened: 2,
    requirementsReviewed: 5
  }
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <BreadcrumbNav />
      
      <div className="grid gap-6">
        <TaskMetrics data={mockData} />
        <TeamPerformance members={teamMembers} />
      </div>
    </div>
  );
};
