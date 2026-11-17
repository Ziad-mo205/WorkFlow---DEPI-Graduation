import { useEffect, useState } from "react";
import LeaveRequests from "./../LeaveRequests";

const Insights = () => {
  let [departments, setDeparments] = useState([
    { Name: "Engineering", num: 16, id: 1, percentage: 50 },
    { Name: "Engineering", num: 16, id: 2, percentage: 50 },
    { Name: "Engineering", num: 16, id: 3, percentage: 50 },
    { Name: "Engineering", num: 16, id: 4, percentage: 50 },
    { Name: "Engineering", num: 16, id: 5, percentage: 50 },
  ]);

  let [leaveRequests, setLeaveRequests] = useState([
    {
      Name: "LAila Tarek",
      type: "Annual",
      time: "Nov 8-15",
      status: "Pending",
      id: 1,
    },
    {
      Name: "LAila Tarek",
      type: "Annual",
      time: "Nov 8-15",
      status: "Pending",
      id: 2,
    },
    {
      Name: "LAila Tarek",
      type: "Annual",
      time: "Nov 8-15",
      status: "Pending",
      id: 3,
    },
  ]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  return (
    <>
      {loading ? (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          {/* Employees by Department Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3 ">
            <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center gap-4"
                >
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 h-2.5 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Pending Leave Requests Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 ">
            <div className="h-6 w-52 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 border-b border-gray-100 pb-1 last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse shrink-0" />

                  <div className="flex flex-col gap-2 basis-1/2">
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="h-5 w-16 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3">
            <span className="font-bold text-lg">Employees by department</span>
            <div>
              {departments.map((department) => {
                return (
                  <div
                    key={department.id}
                    className="flex justify-between text-sm m-2 items-center gap-4"
                  >
                    <span className="font-medium ">{department.Name}</span>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${department.percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-500">{department.num}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3">
            <span className="font-bold text-lg">Pending leave requests</span>
            <div className="space-y-3">
              {leaveRequests.map((LeaveRequest) => {
                return (
                  <div
                    key={LeaveRequest.id}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 pb-1 last:border-0"
                  >
                    <span className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center  font-bold">
                      {/* <img src="" alt="" /> */}
                    </span>
                    <div className="flex flex-col basis-1/2">
                      <span className="text-sm font-semibold">
                        {LeaveRequest.Name}
                      </span>
                      <span className="text-sm text-gray-500 ">
                        {LeaveRequest.type}
                        <span className="text-xs">. {LeaveRequest.time}</span>
                      </span>
                    </div>
                    <span className="bg-orange-50 text-orange-600 text-xs px-2 rounded-lg whitespace-nowrap">
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
