import { useContext } from "react";
import { EmployeeData, Loading } from "./../EmployeeDashboard";

const EmployeeInsights = () => {
  const employee = useContext(EmployeeData);
  const leaves = employee.leaves;
  const tasks = employee.tasks;
  const loading = useContext(Loading);
  leaves.map((leave) => {
    leave.percentage = (leave.days / leave.total) * 100;
  });

  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";
  const card =
    "bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2 dark:bg-[#171A20] dark:border-[#292E3A]";
  const statusStyles = {
    "In Progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Pending:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    Completed:
      "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  };

  return (
    <div className=" m-2 mx-8 ">
      {loading ? (
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Tasks */}
          <div className={`${card} basis-2/3`}>
            <div className={`${skeleton} w-40 mb-1`} />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between text-sm m-2 items-center gap-4 border-b border-gray-100 dark:border-[#292E3A] last:border-0"
              >
                <div className="space-y-1 flex-1">
                  <div className={`${skeleton} h-4 w-48`} />
                  <div className={`${skeleton} h-4 w-36`} />
                </div>
                <div className={`${skeleton} h-9 w-24 rounded-full`} />
              </div>
            ))}
          </div>

          {/* Leave Balance */}
          <div className={`${card} basis-1/3`}>
            <div className={`${skeleton} h-6 w-36`} />

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <div className={`${skeleton} h-4 w-20`} />
                <div className={`${skeleton} h-3 w-full rounded-full`} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* My Tasks Today */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3 flex flex-col gap-2 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              My Tasks Today
            </span>

            <div>
              {tasks.map((task) => (
                <div
                  key={task.name}
                  className="flex justify-between text-sm m-2 items-center gap-4 border-b border-gray-100 dark:border-[#292E3A] last:border-0"
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-2.5 h-2.5 rounded border ${task.status == "Completed" ? "bg-success" : "border-amber-300"}`}
                      ></span>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {task.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.project}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full w-fit ${statusStyles[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Balance */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              Leave Balance
            </span>

            <div className="space-y-1">
              {leaves.map((leave) => (
                <div
                  key={leave.name}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-gray-600 dark:text-[#E4E7EB] w-25">
                    {leave.name}
                  </span>
                  <div className="w-full bg-gray-100 dark:bg-[#292E3A] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full dark:bg-[#34089d]"
                      style={{ width: `${leave.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold dark:text-[#E4E7EB]">
                    {leave.days}/{leave.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeInsights;
