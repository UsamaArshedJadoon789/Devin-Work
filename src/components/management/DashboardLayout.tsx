import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { WeeklyAnalytics } from './WeeklyAnalytics';
import { MonthlyAnalytics } from './MonthlyAnalytics';
import { TeamOverview } from './TeamOverview';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          QA Team Management Dashboard
        </h1>
        
        <div className="grid gap-8">
          <TeamOverview />
          
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly">
              <WeeklyAnalytics />
            </TabsContent>
            
            <TabsContent value="monthly">
              <MonthlyAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
