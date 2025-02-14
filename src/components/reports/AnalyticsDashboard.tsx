import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { WeeklyReport } from '../../types/ProgressReport';
import { DailyProgressData } from '../../types/DailyProgress';

interface AnalyticsDashboardProps {
  report: WeeklyReport;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ report }) => {
  // Calculate resource-specific metrics
  const resourceMetrics = Object.entries(report.dailyActivities || {}).map(([resourceName, activities]) => ({
    name: resourceName,

    bugsAdded: activities.reduce((sum, act) => sum + (act.metrics?.bugsAdded || 0), 0),
    bugsClosed: activities.reduce((sum, act) => sum + (act.metrics?.bugsClosed || 0), 0),
    bugsReopened: activities.reduce((sum, act) => sum + (act.metrics?.bugsReopened || 0), 0),
    requirementsReviewed: activities.reduce((sum, act) => sum + (act.metrics?.requirementsReviewed || 0), 0),
  }));

  // Calculate daily progress data
  const dailyProgress = Object.entries(report.dailyActivities || {}).reduce<Record<string, DailyProgressData>>((acc, [_name, activities]) => {
    activities.forEach(activity => {
      const date = activity.date;
      if (!acc[date]) {
        acc[date] = {
          date,
          totalBugsAdded: 0,
          totalBugsClosed: 0,
          totalBugsReopened: 0,
        };
      }
      acc[date].totalBugsAdded += activity.metrics?.bugsAdded || 0;
      acc[date].totalBugsClosed += activity.metrics?.bugsClosed || 0;
      acc[date].totalBugsReopened += activity.metrics?.bugsReopened || 0;
    });
    return acc;
  }, {} as Record<string, DailyProgressData>);

  const dailyProgressData = Object.values(dailyProgress);

  // Calculate efficiency metrics
  const efficiencyData = resourceMetrics.map(metric => ({
    name: metric.name,
    efficiency: metric.bugsClosed > 0 ? (metric.bugsClosed / (metric.bugsAdded || 1)) * 100 : 0,
    productivity: metric.bugsClosed + metric.requirementsReviewed,
  }));

  return (
    <Tabs defaultValue="overview" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Resource Overview</TabsTrigger>
        <TabsTrigger value="progress">Daily Progress</TabsTrigger>
        <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Resource Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceMetrics}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugsAdded" fill="#4f46e5" name="Bugs Added" />
                  <Bar dataKey="bugsClosed" fill="#10b981" name="Bugs Closed" />
                  <Bar dataKey="bugsReopened" fill="#ef4444" name="Bugs Reopened" />
                  <Bar dataKey="requirementsReviewed" fill="#f59e0b" name="Requirements Reviewed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>Daily Progress Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProgressData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="totalBugsAdded" stroke="#4f46e5" name="Total Bugs Added" />
                  <Line type="monotone" dataKey="totalBugsClosed" stroke="#10b981" name="Total Bugs Closed" />
                  <Line type="monotone" dataKey="totalBugsReopened" stroke="#ef4444" name="Total Bugs Reopened" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="efficiency">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#4f46e5" name="Efficiency %" />
                    <Bar dataKey="productivity" fill="#10b981" name="Productivity Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourceMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Resolution Rate</dt>
                      <dd className="text-2xl font-bold">
                        {metric.bugsAdded > 0
                          ? Math.round((metric.bugsClosed / metric.bugsAdded) * 100)
                          : 0}%
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Total Tasks</dt>
                      <dd className="text-2xl font-bold">
                        {metric.bugsClosed + metric.requirementsReviewed}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
