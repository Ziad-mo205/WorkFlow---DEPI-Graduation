import AdminOverview from "./adminDashboardComponents/AdminOverview";
import OverviewCards from "./adminDashboardComponents/OverviewCards";
import Insights from "./adminDashboardComponents/Insights";
import RecentActivity from "./adminDashboardComponents/RecentActivity";
function AdminDashboard() {
  return (
    <div>
      <AdminOverview />
      <OverviewCards />
      <Insights />
      <RecentActivity />
    </div>
  );
}

export default AdminDashboard;
