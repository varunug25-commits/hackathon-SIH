import React from 'react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <p>{message}</p>
    </div>
  );
};
