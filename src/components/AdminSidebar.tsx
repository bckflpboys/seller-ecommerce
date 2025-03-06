import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  BarChart
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    id: 'dashboard'
  },
  {
    title: 'Products',
    icon: Package,
    href: '/admin/products',
    id: 'products'
  },
  {
    title: 'Orders',
    icon: ShoppingBag,
    href: '/admin/orders',
    id: 'orders'
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/admin/customers',
    id: 'customers'
  },
  {
    title: 'Analytics',
    icon: BarChart,
    href: '/admin/analytics',
    id: 'analytics'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    id: 'settings'
  }
];

export default function AdminSidebar({ activeTab }: AdminSidebarProps) {
  const router = useRouter();

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-earth-dark">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="px-4 py-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-sage/10 text-sage' 
                  : 'text-gray-600 hover:bg-sage/5 hover:text-sage'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
