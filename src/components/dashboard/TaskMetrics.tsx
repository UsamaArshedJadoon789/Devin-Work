import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TaskMetricsProps {
  data: {
    daily: Array<{
      date: string;
      bugsAdded: number;
      bugsClosed: number;
      bugsReopened: number;
    }>;
    weekly: Array<{
      name: string;
      bugsAdded: number;
      bugsClosed: number;
      bugsReopened: number;
      requirementsReviewed: number;
    }>;
  };
}

export const TaskMetrics: React.FC<TaskMetricsProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Progress Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily Progress</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.daily}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="bugsAdded" 
                    stroke="#ef4444" 
                    name="Bugs Added" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bugsClosed" 
                    stroke="#10b981" 
                    name="Bugs Closed" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bugsReopened" 
                    stroke="#f59e0b" 
                    name="Bugs Reopened" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.weekly}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugsAdded" fill="#ef4444" name="Bugs Added" />
                  <Bar dataKey="bugsClosed" fill="#10b981" name="Bugs Closed" />
                  <Bar dataKey="bugsReopened" fill="#f59e0b" name="Bugs Reopened" />
                  <Bar dataKey="requirementsReviewed" fill="#6366f1" name="Requirements Reviewed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
