import { useEffect, useState } from "react";

const AdminOverview = () => {
  let [loading, setLoading] = useState(true);
  let [adminName, setAdminName] = useState("Ziad"); // will come from backend later
  let [leaveRequests, setLeaveRequests] = useState(
    // will come from backend later
    "5 leave requests are waiting",
  );
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

  const today = new Date();
  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  useEffect(() => {}, []); // adminName
  useEffect(() => {}, []); // leaveRequests
  return (
    <>
      {loading ? (
        <div className="m-4 mx-8 mb-8">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="flex mx-8 justify-between flex-col lg:flex-row m-4 mb-8">
          <div className="flex flex-col ">
            <h2 className="font-bold">
              {message}, {adminName}
            </h2>
            <div className="flex flex-col lg:flex-row">
              <span className="text-gray-500 ">{day}.</span>
              <span className="text-gray-500 ">{leaveRequests}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mx-8">
            <button
              disabled={loading}
              className=" btn btn-active hover:bg-gray-300  rounded-xl transition py-7 md:py-4 disabled:opacity-50"
            >
              + Post Announcement
            </button>
            <button
              disabled={loading}
              className=" btn btn-primary hover:bg-blue-700  rounded-xl transition py-7 md:py-4 disabled:opacity-50"
            >
              + Add Employee
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOverview;
