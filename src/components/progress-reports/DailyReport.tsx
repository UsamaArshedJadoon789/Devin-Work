import React, { useState } from 'react';
import { DailyActivity } from '../../types/ProgressReport';

interface DailyReportProps {
  onSubmit: (report: DailyActivity) => void;
  memberName: string;
}

export const DailyReport: React.FC<DailyReportProps> = ({ onSubmit, memberName }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activity: DailyActivity = {
      date: new Date().toISOString().split('T')[0],
      description,
      metrics: {
        bugsAdded: 0,
        bugsClosed: 0,
        bugsReopened: 0,
        requirementsReviewed: 0,
      },
    };
    onSubmit(activity);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Daily Report for {memberName}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
          placeholder="Enter your daily activities..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Daily Report
      </button>
    </form>
  );
};
