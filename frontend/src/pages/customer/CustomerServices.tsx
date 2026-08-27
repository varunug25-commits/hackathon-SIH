import React from 'react';
import { Navbar } from '../../components/Navbar';
import { ServiceCard } from '../../components/ServiceCard';
import { mockServices } from '../../data/mockData';

export const CustomerServices: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="customer" userName="Rahul Sharma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select a Service
          </h1>
          <p className="text-gray-600">Choose the type of service you need</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
