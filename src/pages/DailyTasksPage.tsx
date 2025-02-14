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
            <Card key={member} className="overflow-hidden">
              <CardHeader className="border-b bg-muted/40">
                <CardTitle className="text-lg font-semibold">{member}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Efficiency</span>
                      <span className="text-sm font-bold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Tasks Completed</p>
                      <p className="text-2xl font-bold text-foreground">{tasks.completed}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Total Tasks</p>
                      <p className="text-2xl font-bold text-foreground">{tasks.total}</p>
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
