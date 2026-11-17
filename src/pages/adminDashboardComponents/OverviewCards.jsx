import { useEffect, useState } from "react";

const OverviewCards = () => {
  let [totalEmployees, setTotalEmployees] = useState(0);
  let [employeesThisMonth, setEmployeesThisMonth] = useState(0);
  let [activeProjects, setActiveProjects] = useState(0);
  let [projectsThisMonth, setProjectsThisMonth] = useState(0);
  let [leaveRequests, setLeaveRequests] = useState(0);
  let [openTasks, setOpenTasks] = useState(0);
  let [overdue, setOverdue] = useState(0);
  let [loading, setLoading] = useState(true);
  useEffect(() => {}, []); // totalEmployees
  useEffect(() => {}, []); // employeesThisMonth
  useEffect(() => {}, []); // activeProjects
  useEffect(() => {}, []); // projectsThisMonth
  useEffect(() => {}, []); // leaveRequests
  useEffect(() => {}, []); // openTasks
  useEffect(() => {}, []); // overDue
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-8 ">
          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm gap-3"
            >
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-6 w-10 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-8">
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm">
            <span>Total Employees</span>
            <span className="text-2xl font-bold">{totalEmployees}</span>
            <span>+{employeesThisMonth} this month</span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm">
            <span>Active Projects</span>
            <span className="text-2xl font-bold">{activeProjects}</span>
            <span>{projectsThisMonth} due this month</span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm">
            <span>Pending Leave Requests</span>
            <span className="text-2xl font-bold">{leaveRequests}</span>
            <span>Across all teams</span>
          </div>
          <div className="flex flex-col bg-white p-2 px-6 rounded-2xl border border-gray-100 shadow-sm">
            <span>Open Tasks</span>
            <span className="text-2xl font-bold">{openTasks}</span>
            <span>{overdue} overdue</span>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewCards;
