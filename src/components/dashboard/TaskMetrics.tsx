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
                <LineChart 
                  data={data.daily}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    labelStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bugsAdded" 
                    stroke="hsl(var(--destructive))" 
                    name="Bugs Added"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bugsClosed" 
                    stroke="hsl(var(--primary))" 
                    name="Bugs Closed"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bugsReopened" 
                    stroke="hsl(var(--secondary))" 
                    name="Bugs Reopened"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={data.weekly}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    labelStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar 
                    dataKey="bugsAdded" 
                    fill="hsl(var(--destructive))" 
                    name="Bugs Added"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="bugsClosed" 
                    fill="hsl(var(--primary))" 
                    name="Bugs Closed"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="bugsReopened" 
                    fill="hsl(var(--secondary))" 
                    name="Bugs Reopened"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="requirementsReviewed" 
                    fill="hsl(var(--accent))" 
                    name="Requirements Reviewed"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
