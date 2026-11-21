import { useContext } from "react";
import { AdminData, Loading } from "../AdminDashboard";

const AdminOverview = ({
  addEmployee,
  postAnnouncement,
  setShowAddEmployeeModal,
  setShowPostAnnouncementModal,
}) => {
  const adminData = useContext(AdminData);
  const adminName = adminData.adminName;
  const leaveRequestsNum = adminData.leaveRequestsNum;
  const loading = useContext(Loading);

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

  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <div className="flex mx-8 justify-between flex-col lg:flex-row m-4 ">
      {loading ? (
        <div className="m-4 mx-8 mb-8">
          <div className={`h-6 w-48 ${skeleton} mb-4`}></div>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className={`h-4 w-52 ${skeleton}`}></div>
            <div className={`h-4 w-48 ${skeleton}`}></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center p-4 lg:text-start lg:p-0">
          <h2 className="font-bold max-lg:text-2xl dark:text-[#E4E7EB]">
            {message}, {adminName}
          </h2>
          <div className="flex flex-col lg:flex-row">
            <span className="text-gray-500 dark:text-[#9BA1AE]">{day}....</span>
            <span className="text-gray-500 dark:text-[#9BA1AE]">
              {leaveRequestsNum}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-5 mx-8">
        <button
          disabled={loading}
          onClick={() => {
            postAnnouncement();
            setShowPostAnnouncementModal();
          }}
          className=" btn btn-active hover:bg-gray-700  rounded-xl transition py-7 md:py-4 disabled:opacity-50 dark:border-[#292E3A] dark:bg-[#20242D] dark:text-[#E4E7EB]"
        >
          + Post Announcement
        </button>
        <button
          disabled={loading}
          onClick={() => {
            addEmployee();
            setShowAddEmployeeModal(true);
          }}
          className=" btn btn-primary hover:bg-blue-700  rounded-xl transition py-7 md:py-4 disabled:opacity-50"
        >
          + Add Employee
        </button>
      </div>
    </div>
  );
};

export default AdminOverview;
