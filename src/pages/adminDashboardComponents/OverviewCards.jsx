import { useContext } from "react";
import { AdminData, Loading } from "../AdminDashboard";

const OverviewCards = () => {
  const adminData = useContext(AdminData);
  let totalEmployees = adminData.totalEmployees;
  let employeesThisMonth = adminData.employeesThisMonth;
  let activeProjects = adminData.activeProjects;
  let projectsThisMonth = adminData.projectsThisMonth;
  let leaveRequestsNum = adminData.leaveRequestsNum;
  let openTasks = adminData.openTasks;
  let overdue = adminData.overdue;
  const loading = useContext(Loading);
  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-8 ">
          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm gap-3 dark:bg-[#171A20] dark:border-[#292E3A]"
            >
              <div className={`h-4 w-32 ${skeleton}`}></div>

              <div className={`h-6 w-10 ${skeleton}`}></div>

              <div className={`h-4 w-40 ${skeleton}`}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-8">
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Total Employees</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {totalEmployees}
            </span>
            <span className="dark:text-[#9BA1AE]">
              +{employeesThisMonth} this month
            </span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Active Projects</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {activeProjects}
            </span>
            <span className="dark:text-[#9BA1AE]">
              {projectsThisMonth} due this month
            </span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Pending Leave Requests</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {leaveRequestsNum}
            </span>
            <span className="dark:text-[#9BA1AE]">Across all teams</span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Open Tasks</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {openTasks}
            </span>
            <span className="dark:text-[#9BA1AE]">{overdue} overdue</span>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewCards;
