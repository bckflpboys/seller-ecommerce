import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminDashboard from './index';

export default function AnalyticsPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.replace('/admin');
  // }, []);

  return <AdminDashboard defaultTab="analytics" />;
}
