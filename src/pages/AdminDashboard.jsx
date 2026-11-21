import AdminOverview from "./adminDashboardComponents/AdminOverview";
import OverviewCards from "./adminDashboardComponents/OverviewCards";
import Insights from "./adminDashboardComponents/Insights";
import RecentActivity from "./adminDashboardComponents/RecentActivity";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import AddEmployeeModal from "./../components/employees/AddEmployeeModal";
import CreateAnnouncementModal from "./../components/announcements/CreateAnnouncementModal";

export const AdminData = createContext(null);
export const Loading = createContext(null);
function AdminDashboard() {
  let [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({
    activities: [
      {
        id: 1,
        name: "Ziad",
        action: "New employee added to the system",
        time: "10 minutes ago",
      },
      {
        id: 2,
        name: "Ziad",
        action: "Project status updated",
        time: "30 minutes ago",
      },
      {
        id: 3,
        name: "Ziad",
        action: "Leave request approved",
        time: "1 hour ago",
      },
      {
        id: 4,
        name: "Ziad",
        action: "New department created",
        time: "3 hours ago",
      },
    ],

    announcements: [
      {
        id: 1,
        announce: "Company monthly meeting scheduled for next Monday.",
        time: "2 hours ago",
      },
      {
        id: 2,
        announce: "New employee attendance policy announced.",
        time: "1 day ago",
      },
      {
        id: 3,
        announce: "Annual performance reviews will start next month.",
        time: "3 days ago",
      },
    ],

    totalEmployees: 120,
    employeesThisMonth: 8,

    activeProjects: 15,
    projectsThisMonth: 4,
    leaveRequests: [
      {
        id: 1,
        Name: "Ahmed Mohamed",
        type: "Annual Leave",
        time: "2 days ago",
        status: "Pending",
      },
      {
        id: 2,
        Name: "Sara Ali",
        type: "Sick Leave",
        time: "5 hours ago",
        status: "Approved",
      },
      {
        id: 3,
        Name: "Omar Hassan",
        type: "Emergency Leave",
        time: "1 day ago",
        status: "Pending",
      },
      {
        id: 4,
        Name: "Mona Adel",
        type: "Annual Leave",
        time: "3 days ago",
        status: "Rejected",
      },
      {
        id: 5,
        Name: "Youssef Ahmed",
        type: "Sick Leave",
        time: "4 hours ago",
        status: "Pending",
      },
    ],
    leaveRequestsNum: 7,

    openTasks: 24,
    overdue: 5,

    departments: [
      {
        id: 1,
        Name: "Human Resources",
        percentage: 85,
        num: 12,
      },
      {
        id: 2,
        Name: "Development",
        percentage: 70,
        num: 35,
      },
      {
        id: 3,
        Name: "Marketing",
        percentage: 60,
        num: 18,
      },
      {
        id: 4,
        Name: "Finance",
        percentage: 90,
        num: 10,
      },
    ],

    LeaveRequest: [
      {
        id: 1,
        Name: "Ahmed Mohamed",
        type: "Annual Leave",
        time: "2 days ago",
        status: "Pending",
      },
      {
        id: 2,
        Name: "Sara Ali",
        type: "Sick Leave",
        time: "5 hours ago",
        status: "Approved",
      },
      {
        id: 3,
        Name: "Omar Hassan",
        type: "Emergency Leave",
        time: "1 day ago",
        status: "Pending",
      },
      {
        id: 4,
        Name: "Mona Adel",
        type: "Annual Leave",
        time: "3 days ago",
        status: "Rejected",
      },
    ],

    adminName: "Ziad",
  });

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await fetch("");

        if (!response.ok) {
          throw new Error("Failed.");
        }

        const result = await response.json();

        setAdminData(result);
      } catch (error) {
        // handleError(error);
      } finally {
        setLoading(false);
      }
    };

    getAdminData();
  }, []);

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showPostAnnouncementModal, setShowPostAnnouncementModal] =
    useState(false);

  const onCloseAddEmployee = () => {
    setShowAddEmployeeModal(false);
  };

  const onSubmitAddEmployee = (formData) => {
    try {
      console.log("New Employee Data: ", formData);

      setShowAddEmployeeModal(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const onClosePostAnnouncement = () => {
    setShowPostAnnouncementModal(false);
  };

  const onSubmitPostAnnouncement = (formData) => {
    try {
      console.log("New Announcement Data: ", formData);

      setShowPostAnnouncementModal(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const postAnnouncement = () => {
    setShowPostAnnouncementModal(true);
  };
  return (
    <AdminData.Provider value={adminData}>
      <Loading.Provider value={loading}>
        <div className="dark:bg-[#0E1115] flex flex-col max-lg:gap-3">
          <AdminOverview
            addEmployee={addEmployee}
            postAnnouncement={postAnnouncement}
            setShowAddEmployeeModal={setShowAddEmployeeModal}
            setShowPostAnnouncementModal={setShowPostAnnouncementModal}
          />
          <OverviewCards />
          <Insights />
          <RecentActivity />
          {showAddEmployeeModal && (
            <AddEmployeeModal
              onClose={onCloseAddEmployee}
              onSubmit={onSubmitAddEmployee}
            />
          )}
          {showPostAnnouncementModal && (
            <CreateAnnouncementModal
              onClose={onClosePostAnnouncement}
              onSubmit={onSubmitPostAnnouncement}
            />
          )}
        </div>
      </Loading.Provider>
    </AdminData.Provider>
  );
}

export default AdminDashboard;
