import { useContext } from "react";
import { AdminData, Loading } from "../AdminDashboard";

const RecentActivity = () => {
  const loading = useContext(Loading);
  const adminData = useContext(AdminData);
  const announcements = adminData.announcements;
  const activities = adminData.activities;
  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <>
      {loading ? (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          {/* System Activity Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-2/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <div className={`h-6 w-40 ${skeleton} mb-6`} />

            <div>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border-b  border-gray-100 last:border-0 pb-3"
                >
                  <div className={` w-10 h-10 ${skeleton} shrink-0`} />

                  <div className="flex flex-col gap-2 flex-1">
                    <div className={`h-4 w-3/4 ${skeleton}`} />
                    <div className={`h-3 w-24 ${skeleton}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Announcements Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <div className={`h-6 w-48 ${skeleton} mb-6`} />

            <div className="flex flex-col gap-0.5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50 p-3 rounded-xl flex gap-3"
                >
                  <div className={`h-4 w-3/4 ${skeleton}`} />
                  <div className={`h-3 w-24 ${skeleton}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          <div className="bg-white p-2 px-8 border border-gray-100 rounded-2xl shadow-sm basis-2/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              System activity
            </span>
            <div>
              {activities.map((activity) => {
                return (
                  <div
                    key={activity.id}
                    className="flex flex-col justify-between text-sm m-2 items-start gap-2"
                  >
                    <span className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      {/* <img src="" alt="" /> */}
                    </span>
                    <div>
                      <span className="font-medium dark:text-[#E4E7EB]">
                        {activity.name}, {activity.action}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              Latest announcements
            </span>
            <div>
              {announcements.map((announcement) => {
                return (
                  <div
                    key={announcement.id}
                    className="bg-gray-50 p-1 rounded-xl dark:bg-[#171A20] flex flex-col"
                  >
                    <span className="dark:bg-[#20242D] bg-purple-100 text-purple-600 p-1 rounded-lg">
                      {announcement.announce}........
                      <span className="text-xs text-gray-400">
                        {announcement.time}
                      </span>
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

export default RecentActivity;
