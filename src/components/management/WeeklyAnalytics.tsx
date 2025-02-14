import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const WeeklyAnalytics: React.FC = () => {
  const weeklyData = [
    { day: 'Monday', bugsAdded: 8, bugsClosed: 5, bugsReopened: 2 },
    { day: 'Tuesday', bugsAdded: 6, bugsClosed: 7, bugsReopened: 1 },
    { day: 'Wednesday', bugsAdded: 10, bugsClosed: 8, bugsReopened: 3 },
    { day: 'Thursday', bugsAdded: 5, bugsClosed: 6, bugsReopened: 1 },
    { day: 'Friday', bugsAdded: 7, bugsClosed: 9, bugsReopened: 2 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Bug Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bugsAdded" stroke="#4f46e5" name="Bugs Added" />
                <Line type="monotone" dataKey="bugsClosed" stroke="#10b981" name="Bugs Closed" />
                <Line type="monotone" dataKey="bugsReopened" stroke="#ef4444" name="Bugs Reopened" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Bugs Added</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">36</p>
            <p className="text-sm text-gray-500">This Week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">87%</p>
            <p className="text-sm text-gray-500">Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">92%</p>
            <p className="text-sm text-gray-500">Based on Metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
