import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { IndianRupee, Calendar, CheckCircle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for earnings
const mockEarningsData = {
  totalEarnings: 45250,
  thisMonthEarnings: 12750,
  pendingPayments: 2450,
  completedJobs: 127,
  weeklyEarnings: [3200, 2800, 4100, 3500, 2900, 4200, 3800],
  monthlyGrowth: 15
};

const mockRecentTransactions: Array<{
  id: string;
  serviceName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}> = [
  {
    id: '1',
    serviceName: 'Electrical Wiring Repair',
    amount: 850,
    date: '2026-09-02',
    status: 'completed'
  },
  {
    id: '2',
    serviceName: 'Fan Installation',
    amount: 600,
    date: '2026-09-01',
    status: 'completed'
  },
  {
    id: '3',
    serviceName: 'Switchboard Replacement',
    amount: 450,
    date: '2026-08-31',
    status: 'pending'
  },
  {
    id: '4',
    serviceName: 'AC Repair',
    amount: 1200,
    date: '2026-08-30',
    status: 'completed'
  },
  {
    id: '5',
    serviceName: 'Geyser Installation',
    amount: 950,
    date: '2026-08-29',
    status: 'completed'
  }
];

export const WorkerEarnings: React.FC = () => {
  const [earningsData] = useState(mockEarningsData);
  const [recentTransactions] = useState(mockRecentTransactions);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="worker" userName="Rajesh Kumar" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Earnings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold">₹{earningsData.totalEarnings.toLocaleString()}</p>
            <p className="text-gray-600">Total Earnings</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <p className="text-3xl font-bold">₹{earningsData.thisMonthEarnings.toLocaleString()}</p>
            <p className="text-gray-600">Monthly Earnings</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <p className="text-3xl font-bold">₹{earningsData.pendingPayments.toLocaleString()}</p>
            <p className="text-gray-600">Pending Payments</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <p className="text-3xl font-bold">{earningsData.completedJobs}</p>
            <p className="text-gray-600">Jobs Completed</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${earningsData.monthlyGrowth >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {earningsData.monthlyGrowth >= 0 ? (
                  <ArrowUpRight className="w-8 h-8 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-8 h-8 text-red-600" />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {earningsData.monthlyGrowth >= 0 ? '+' : ''}{earningsData.monthlyGrowth}%
                </p>
                <p className="text-gray-600">vs last month</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
            <div className="flex items-end justify-between h-32 gap-2">
              {earningsData.weeklyEarnings.map((earning, index) => {
                const maxEarning = Math.max(...earningsData.weeklyEarnings);
                const height = (earning / maxEarning) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{days[index]}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${transaction.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      {transaction.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.serviceName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{transaction.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          )}
        </Card>
      </div>
    </div>
  );
};
