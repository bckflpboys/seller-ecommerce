import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  BarChart
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    title: 'Products',
    icon: Package,
    href: '/admin/products'
  },
  {
    title: 'Orders',
    icon: ShoppingBag,
    href: '/admin/orders'
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/admin/customers'
  },
  {
    title: 'Analytics',
    icon: BarChart,
    href: '/admin/analytics'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings'
  }
];

export default function AdminSidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-earth-dark">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="px-4 py-2">
        {menuItems.map((item) => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
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
