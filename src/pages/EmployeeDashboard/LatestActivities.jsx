// import { FiMegaphone, FiCalendar } from "react-icons/fi";

import { useContext } from "react";
import { EmployeeData, Loading } from "./../EmployeeDashboard";

const LatestActivities = () => {
  const employee = useContext(EmployeeData);
  const projects = employee.projects;
  const announcements = employee.announcements;
  const loading = useContext(Loading);

  const card =
    "bg-white dark:bg-[#191c23] border border-gray-200 dark:border-gray-800 rounded-2xl p-1";

  const skeleton = "bg-gray-200 dark:bg-gray-700/70 rounded animate-pulse";

  return (
    <div className="m-2 mx-8">
      {loading ? (
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Projects */}
          <div className={`basis-2/3 ${card}`}>
            <div className={`${skeleton} h-6 w-36 mb-8`} />

            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-2 space-y-1">
                <div className={`${skeleton} h-6 w-52`} />
                <div className={`${skeleton} h-4 w-full rounded-full`} />
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div className={`${card} basis-1/3 px-6`}>
            <div className={`${skeleton} h-6 w-48 mb-2`} />

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`${skeleton} h-6 w-full mb-3 rounded-xl`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* My Projects */}
          <div className="bg-white p-2 px-8 border border-gray-100 rounded-2xl shadow-sm basis-2/3 dark:bg-[#171A20] dark:border-[#292E3A]">
            <span className="font-bold text-lg dark:text-[#E4E7EB]">
              My Projects
            </span>

            <div>
              {projects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="flex flex-col justify-between text-sm m-2 items-start gap-2"
                  >
                    <div className="flex justify-between w-full">
                      <span className="font-medium dark:text-[#E4E7EB]">
                        {project.name}
                      </span>
                      <span className="font-medium dark:text-[#E4E7EB]">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-[#292E3A] h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`${project.progress >= 75 ? "bg-emerald-500 " : " bg-blue-600 dark:bg-[#34089d] "}h-full rounded-full `}
                        style={{ width: `${project.progress}%` }} //competed tasks / total tasks
                      />
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
    </div>
  );
};

export default LatestActivities;
