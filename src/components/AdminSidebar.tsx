import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  BarChart,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
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

export default function AdminSidebar({ activeTab, isOpen, onClose }: AdminSidebarProps) {
  const router = useRouter();

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 min-h-screen bg-white border-r border-gray-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="flex items-center justify-between p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-earth-dark">Admin Panel</span>
        </Link>
        <button onClick={onClose} className="md:hidden">
          <X className="w-6 h-6" />
        </button>
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
