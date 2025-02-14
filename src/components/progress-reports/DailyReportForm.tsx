import React, { useState } from 'react';
import { TeamMember, DailyActivity } from '../../types/ProgressReport';

interface DailyReportFormProps {
  teamMembers: TeamMember[];
  onSubmit: (memberName: string, activity: DailyActivity) => void;
}

export const DailyReportForm: React.FC<DailyReportFormProps> = ({ teamMembers, onSubmit }) => {
  const [selectedMember, setSelectedMember] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !description) return;

    const activity: DailyActivity = {
      date,
      description,
      metrics: {}, // Will be parsed by the analytics utility
    };

    onSubmit(selectedMember, activity);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Member</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="">Select a team member</option>
          {teamMembers.map((member) => (
            <option key={member.name} value={member.name}>
              {member.name} - {member.role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Activity Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
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
