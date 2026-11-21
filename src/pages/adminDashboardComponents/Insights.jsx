import { useContext } from "react";
import { AdminData, Loading } from "../AdminDashboard";

const Insights = () => {
  const adminData = useContext(AdminData);
  const departments = adminData.departments;
  const leaveRequests = adminData.leaveRequests;
  const loading = useContext(Loading);
  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <>
      {loading ? (
        <div className="flex gap-5 m-2 mx-8 max-lg:flex-col ">
          {/* Employees by Department Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center gap-4"
                >
                  <div className={`h-4 w-28 ${skeleton}`} />
                  <div className={`flex-1 h-2.5 ${skeleton}`} />
                  <div className={`h-4 w-8 ${skeleton}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Pending Leave Requests Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <div className="h-6 w-52 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 border-b border-gray-100 pb-1 last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse shrink-0" />

                  <div className="flex flex-col gap-2 basis-1/2">
                    <div className={`h-4 w-28 ${skeleton}`} />
                    <div className={`h-3 w-36 ${skeleton}`} />
                  </div>

                  <div className={`h-5 w-16 ${skeleton}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              Employees by department
            </span>
            <div>
              {departments.map((department) => {
                return (
                  <div
                    key={department.id}
                    className="flex justify-between text-sm m-2 items-center gap-4"
                  >
                    <span className="font-medium dark:text-[#E4E7EB]">
                      {department.Name}
                    </span>
                    <div className="w-full bg-gray-100 dark:bg-[#292E3A] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full dark:bg-[#34089d]"
                        style={{ width: `${department.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-500 dark:text-[#E4E7EB]">
                      {department.num}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              Pending leave requests
            </span>
            <div className="space-y-3">
              {leaveRequests.map((LeaveRequest) => {
                return (
                  <div
                    key={LeaveRequest.id}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 pb-1 dark:border-[#292E3A] last:border-0"
                  >
                    <span className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center  font-bold">
                      {/* <img src="" alt="" /> */}
                    </span>
                    <div className="flex flex-col basis-1/2">
                      <span className="text-sm font-semibold dark:text-[#E4E7EB]">
                        {LeaveRequest.Name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-[#9BA1AE]">
                        {LeaveRequest.type}
                        <span className="text-xs">. {LeaveRequest.time}</span>
                      </span>
                    </div>
                    <span className="bg-orange-50 text-orange-600 text-xs px-2 rounded-lg whitespace-nowrap dark:bg-[#4A2412] dark:text-[#FDB973]">
                      {LeaveRequest.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Insights;
