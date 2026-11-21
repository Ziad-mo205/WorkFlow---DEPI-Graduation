import { useContext } from "react";
import { EmployeeData, Loading } from "./../EmployeeDashboard";

const EmployeeOverviewCards = () => {
  const employee = useContext(EmployeeData);
  const openTasks = employee.openTasks;
  const leaveBalance = employee.leaveBalance;
  const tasksDueThisMonth = employee.tasksDueThisMonth;
  const inProgress = employee.inProgress;
  const completedTasksThisMonth = employee.completedTasksThisMonth;
  const completedTasksLastMonth = employee.completedTasksLastMonth;
  const loading = useContext(Loading);
  const def = completedTasksLastMonth - completedTasksThisMonth;

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
            <span className="dark:text-[#9BA1AE]">Open Tasks</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {openTasks}
            </span>
            <span className="dark:text-[#9BA1AE]">
              +{tasksDueThisMonth} due this month
            </span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">In Progress</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {inProgress}
            </span>
            <span className="dark:text-[#9BA1AE]">
              {inProgress > 0 ? "Keep going" : "_________"}
            </span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Completed This Month</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {completedTasksThisMonth}
            </span>
            <span className="dark:text-[#9BA1AE]">
              {def >= 0 ? "+" : ""}
              {def} vs last month
            </span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="dark:text-[#9BA1AE]">Leave Balance</span>
            <span className="text-2xl font-bold dark:text-[#E4E7EB] px-1">
              {leaveBalance}
            </span>
            <span className="dark:text-[#9BA1AE]">Annual leave left</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeOverviewCards;
