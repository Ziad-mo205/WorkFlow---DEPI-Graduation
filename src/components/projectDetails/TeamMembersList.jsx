import Avatar from '../tasks/Avatar'

const TeamMembersList = ({ members }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-lg font-bold text-slate-900">Team members</h3>

      {members.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No members yet.</p>
      ) : (
        <ul className="mt-4">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0"
            >
              <Avatar name={member.name} />

              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{member.name}</p>
                <p className="truncate text-sm text-slate-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TeamMembersList