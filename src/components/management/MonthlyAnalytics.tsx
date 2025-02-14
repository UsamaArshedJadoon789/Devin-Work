import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const MonthlyAnalytics: React.FC = () => {
  const monthlyData = [
    { week: 'Week 1', bugsAdded: 36, bugsClosed: 35, bugsReopened: 9, efficiency: 88 },
    { week: 'Week 2', bugsAdded: 42, bugsClosed: 38, bugsReopened: 12, efficiency: 85 },
    { week: 'Week 3', bugsAdded: 38, bugsClosed: 40, bugsReopened: 8, efficiency: 92 },
    { week: 'Week 4', bugsAdded: 45, bugsClosed: 42, bugsReopened: 10, efficiency: 89 },
  ];

  const memberPerformance = [
    { 
      name: 'Hamza Sohail',
      week1: 85,
      week2: 88,
      week3: 92,
      week4: 90
    },
    {
      name: 'Farah Al-Haj Ahmad',
      week1: 90,
      week2: 87,
      week3: 89,
      week4: 92
    },
    {
      name: 'Moath Abusall',
      week1: 88,
      week2: 90,
      week3: 87,
      week4: 91
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bugsAdded" stroke="#4f46e5" name="Bugs Added" />
                <Line type="monotone" dataKey="bugsClosed" stroke="#10b981" name="Bugs Closed" />
                <Line type="monotone" dataKey="bugsReopened" stroke="#ef4444" name="Bugs Reopened" />
                <Line type="monotone" dataKey="efficiency" stroke="#f59e0b" name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Member Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberPerformance}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="week1" fill="#4f46e5" name="Week 1" />
                <Bar dataKey="week2" fill="#10b981" name="Week 2" />
                <Bar dataKey="week3" fill="#f59e0b" name="Week 3" />
                <Bar dataKey="week4" fill="#ef4444" name="Week 4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Bugs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">161</p>
            <p className="text-sm text-gray-500">This Month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bugs Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">155</p>
            <p className="text-sm text-gray-500">96% Resolution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">88.5%</p>
            <p className="text-sm text-gray-500">Month to Date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">40.25</p>
            <p className="text-sm text-gray-500">Bugs/Week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
