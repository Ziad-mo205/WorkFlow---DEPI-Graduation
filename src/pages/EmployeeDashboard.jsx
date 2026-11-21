import EmployeeOverview from "./EmployeeDashboard/EmployeeOverview";
import EmployeeOverviewCards from "./EmployeeDashboard/EmployeeOverviewCards";
import EmployeeInsights from "./EmployeeDashboard/EmployeeInsights";
import LatestActivities from "./EmployeeDashboard/LatestActivities";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const EmployeeData = createContext(null);
export const Loading = createContext(null);
const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState({
    projects: [
      {
        id: 1,
        name: "Company Management System",
        progress: 75,
      },
      {
        id: 2,
        name: "Employee Portal",
        progress: 45,
      },
      {
        id: 3,
        name: "HR Dashboard",
        progress: 90,
      },
    ],

    announcements: [
      {
        id: 1,
        announce: "New company policy has been announced.",
        time: "2 hours ago",
      },
      {
        id: 2,
        announce: "Monthly meeting scheduled for next Monday.",
        time: "1 day ago",
      },
      {
        id: 3,
        announce: "Project submission deadline is approaching.",
        time: "3 days ago",
      },
    ],

    openTasks: 12,
    tasksDueThisMonth: 8,
    inProgress: 5,
    completedTasksThisMonth: 15,
    tasksThisWeek: 10,
    leaveBalance: 11,
    completedTasksLastMonth: 4,
    employeeName: "Ziad",

    tasks: [
      {
        id: 1,
        name: "Complete Dashboard UI",
        status: "In Progress",
        project: "Company Management System",
      },
      {
        id: 2,
        name: "Create Employee API",
        status: "Pending",
        project: "Employee Portal",
      },
      {
        id: 3,
        name: "Fix Authentication Bugs",
        status: "Completed",
        project: "HR Dashboard",
      },
      {
        id: 4,
        name: "Update Reports Page",
        status: "In Progress",
        project: "Company Management System",
      },
    ],

    leaves: [
      {
        id: 1,
        name: "Annual Leave",
        total: 21,
        days: 14,
      },
      {
        id: 2,
        name: "Sick Leave",
        total: 10,
        days: 7,
      },
      {
        id: 3,
        name: "Emergency Leave",
        total: 5,
        days: 3,
      },
    ],
  });

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("");

        if (!response.ok) {
          throw new Error("Failed.");
        }

        const result = await response.json();

        setEmployeeData(result);
      } catch (error) {
        // handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  return (
    <EmployeeData.Provider value={employeeData}>
      <Loading.Provider value={loading}>
        <div className="dark:bg-[#0E1115] flex flex-col max-lg:gap-3">
          <EmployeeOverview />

          <EmployeeOverviewCards />

          <EmployeeInsights />

          <LatestActivities />
        </div>
      </Loading.Provider>
    </EmployeeData.Provider>
  );
};

export default EmployeeDashboard;
