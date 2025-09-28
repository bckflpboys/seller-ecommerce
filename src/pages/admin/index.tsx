import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import TabDashboard from '@/components/admin/TabDashboard';
import TabProducts from '@/components/admin/TabProducts';
import TabOrders from '@/components/admin/TabOrders';
import TabCustomers from '@/components/admin/TabCustomers';
import TabAnalytics from '@/components/admin/TabAnalytics';
import TabSettings from '@/components/admin/TabSettings';

interface AdminDashboardProps {
  defaultTab?: string;
}

export default function AdminDashboard({ defaultTab = 'dashboard' }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const router = useRouter();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
  ];

  // Update active tab based on URL
  useEffect(() => {
    const path = router.asPath;
    const tab = path.split('/')[2] || 'dashboard';
    setActiveTab(tab);
  }, [router.asPath]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const path = tabId === 'dashboard' ? '/admin' : `/admin/${tabId}`;
    router.push(path, undefined, { shallow: true });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TabDashboard />;
      case 'products':
        return <TabProducts />;
      case 'orders':
        return <TabOrders />;
      case 'customers':
        return <TabCustomers />;
      case 'analytics':
        return <TabAnalytics />;
      case 'settings':
        return <TabSettings />;
      default:
        return <TabDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab}>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-sage text-sage'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </AdminLayout>
  );
}
