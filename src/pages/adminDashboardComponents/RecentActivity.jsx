import { useEffect, useState } from "react";

const RecentActivity = () => {
  let [activities, setActivities] = useState([
    {
      name: "Nour",
      action: "added Rana Fathy as Employee",
      time: "20 min ago",
      id: 1,
    },
    {
      name: "Nour",
      action: "added Rana Fathy as Employee",
      time: "20 min ago",
      id: 2,
    },
    {
      name: "Nour",
      action: "added Rana Fathy as Employee",
      time: "20 min ago",
      id: 3,
    },
  ]);
  let [announcements, setAnnouncements] = useState([
    { announce: "Office closed for National Day", time: "Oct 28", id: 1 },
    { announce: "Office closed for National Day", time: "Oct 28", id: 2 },
    { announce: "Office closed for National Day", time: "Oct 28", id: 3 },
    { announce: "Office closed for National Day", time: "Oct 28", id: 4 },
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
          {/* System Activity Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl shadow-sm basis-2/3 ">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6" />

            <div>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border-b border-gray-100 last:border-0 pb-3"
                >
                  <div className="bg-gray-200 w-10 h-10 rounded-full animate-pulse shrink-0" />

                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Announcements Loading */}
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />

            <div className="flex flex-col gap-0.5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50 p-3 rounded-xl flex gap-3"
                >
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 m-2 mx-8 flex-col lg:flex-row">
          <div className="bg-white p-2 px-8 rounded-2xl shadow-sm basis-2/3">
            <span className="font-bold text-lg">System activity</span>
            <div className="space-y-3">
              {activities.map((activity) => {
                return (
                  <div
                    key={activity.id}
                    className="flex gap-3  border-b border-gray-100 last:border-0 pb-1"
                  >
                    <span className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      {/* <img src="" alt="" /> */}
                    </span>
                    <div>
                      <span className="text-sm text-gray-500 mt-1">
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
          <div className="bg-white p-2 px-8 rounded-2xl border border-gray-100 shadow-sm basis-1/3">
            <span className="font-bold text-lg">Latest announcements</span>
            <div>
              {announcements.map((announcement) => {
                return (
                  <div
                    key={announcement.id}
                    className="bg-gray-50 p-1 rounded-xl  flex flex-col"
                  >
                    <span className="bg-purple-100 text-purple-600 p-1 rounded-lg">
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
