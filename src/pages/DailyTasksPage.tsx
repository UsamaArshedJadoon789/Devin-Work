import React from 'react';
import { BreadcrumbNav } from '../components/navigation/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

const teamMembers = [
  'Hamza Sohail',
  'Farah Al-Haj Ahmad',
  'Moath Abusall'
];

interface TaskStatus {
  total: number;
  completed: number;
}

const mockTasks: Record<string, TaskStatus> = {
  'Hamza Sohail': { total: 10, completed: 6 },
  'Farah Al-Haj Ahmad': { total: 8, completed: 5 },
  'Moath Abusall': { total: 12, completed: 8 }
};

export const DailyTasksPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <BreadcrumbNav />
      
      <div className="grid gap-6">
        {teamMembers.map(member => {
          const tasks = mockTasks[member];
          const progress = (tasks.completed / tasks.total) * 100;
          
          return (
            <Card key={member}>
              <CardHeader>
                <CardTitle>{member}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      <p className="text-2xl font-bold">{tasks.completed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                      <p className="text-2xl font-bold">{tasks.total}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
