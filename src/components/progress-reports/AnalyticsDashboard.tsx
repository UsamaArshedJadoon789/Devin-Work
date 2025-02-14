import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { WeeklyReport } from '../../types/ProgressReport';

interface AnalyticsDashboardProps {
  report: WeeklyReport;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ report }) => {
  // Calculate bug statistics for each team member
  const bugStats = Object.entries(report.dailyActivities || {}).map(([name, activities]) => ({
    name,
    added: activities.reduce((sum, act) => sum + (act.metrics?.bugsAdded || 0), 0),
    closed: activities.reduce((sum, act) => sum + (act.metrics?.bugsClosed || 0), 0),
    reopened: activities.reduce((sum, act) => sum + (act.metrics?.bugsReopened || 0), 0),
  }));

  // Calculate progress metrics
  const progressData = Object.entries(report.dailyActivities || {}).map(([name, activities]) => {
    const totalBugs = activities.reduce((sum, act) => sum + (act.metrics?.bugsAdded || 0), 0);
    const closedBugs = activities.reduce((sum, act) => sum + (act.metrics?.bugsClosed || 0), 0);
    const requirementsReviewed = activities.reduce((sum, act) => sum + (act.metrics?.requirementsReviewed || 0), 0);
    
    return {
      name,
      completion: totalBugs ? (closedBugs / totalBugs) * 100 : 0,
      efficiency: activities.length ? (closedBugs / activities.length) : 0,
      requirements: requirementsReviewed,
    };
  });

  // Daily activity breakdown
  const dailyBreakdown = Object.entries(report.dailyActivities || {}).map(([name, activities]) => {
    const dailyStats = activities.reduce((acc, activity) => {
      const date = activity.date;
      if (!acc[date]) {
        acc[date] = {
          bugsAdded: 0,
          bugsClosed: 0,
          bugsReopened: 0,
          requirementsReviewed: 0,
        };
      }
      acc[date].bugsAdded += activity.metrics?.bugsAdded || 0;
      acc[date].bugsClosed += activity.metrics?.bugsClosed || 0;
      acc[date].bugsReopened += activity.metrics?.bugsReopened || 0;
      acc[date].requirementsReviewed += activity.metrics?.requirementsReviewed || 0;
      return acc;
    }, {} as Record<string, { bugsAdded: number; bugsClosed: number; bugsReopened: number; requirementsReviewed: number; }>);

    return {
      name,
      dailyStats,
    };
  });

  return (
    <Tabs defaultValue="overview" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Bug Overview</TabsTrigger>
        <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        <TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Bug Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bugStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="added" fill="#4f46e5" name="Bugs Added" />
                  <Bar dataKey="closed" fill="#10b981" name="Bugs Closed" />
                  <Bar dataKey="reopened" fill="#ef4444" name="Bugs Reopened" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>Progress Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#4f46e5" 
                    name="Bug Completion Rate %" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#10b981" 
                    name="Bugs Closed per Day" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requirements" 
                    stroke="#f59e0b" 
                    name="Requirements Reviewed" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="daily">
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dailyBreakdown.map(({ name, dailyStats }) => (
                <Card key={name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={Object.entries(dailyStats).map(([date, stats]) => ({
                            date,
                            ...stats,
                          }))}
                        >
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="bugsAdded" stroke="#4f46e5" name="Bugs Added" />
                          <Line type="monotone" dataKey="bugsClosed" stroke="#10b981" name="Bugs Closed" />
                          <Line type="monotone" dataKey="bugsReopened" stroke="#ef4444" name="Bugs Reopened" />
                          <Line type="monotone" dataKey="requirementsReviewed" stroke="#f59e0b" name="Requirements Reviewed" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
