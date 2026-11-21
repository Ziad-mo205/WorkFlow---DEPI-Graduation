// import CreateTaskModal from "../../components/tasks/CreateTaskModal";
import { useContext } from "react";
import { EmployeeData, Loading } from "./../EmployeeDashboard";

const EmployeeOverview = () => {
  const employee = useContext(EmployeeData);
  const employeeName = employee.employeeName;
  const tasksThisWeek = employee.tasksThisWeek;
  const loading = useContext(Loading);
  // const { requestLeave } = useContext();

  let message;
  const hour = new Date().getHours();
  if (hour < 12) {
    message = "Good Morning";
  } else if (hour < 17) {
    message = "Good Afternoon";
  } else if (hour < 21) {
    message = "Good Evening";
  } else {
    message = "Good Night";
  }
  const day = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <div className="flex mx-8 justify-between flex-col lg:flex-row ">
      {loading ? (
        <div className="m-1 ">
          <div className={`h-6 w-48 ${skeleton} mb-2`}></div>

          <div className="flex flex-col lg:flex-row gap-1">
            <div className={`h-4 w-52 ${skeleton}`}></div>
            <div className={`h-4 w-48 ${skeleton}`}></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center p-4 lg:text-start lg:p-0">
          <h2 className="font-bold max-lg:text-2xl dark:text-[#E4E7EB]">
            {message}, {employeeName}
          </h2>
          <div className="flex flex-col lg:flex-row">
            <span className="text-gray-500 dark:text-[#9BA1AE]">{day}....</span>
            <span className="text-gray-500 dark:text-[#9BA1AE]">
              {tasksThisWeek} tasks due this week
            </span>
          </div>
        </div>
      )}
      <button
        disabled={loading}
        // onClick={requestLeave}
        className=" btn btn-primary hover:bg-blue-700  rounded-xl transition py-7 md:py-4 disabled:opacity-50"
      >
        + Request Leave
      </button>
    </div>
  );
};

export default EmployeeOverview;
