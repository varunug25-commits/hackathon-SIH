import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../types';
import { Card } from './Card';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const Icon = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/customer/workers')}>
      <div className="flex flex-col items-center text-center">
        {Icon && <Icon className="w-12 h-12 text-blue-600 mb-3" />}
        <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    </Card>
  );
};
