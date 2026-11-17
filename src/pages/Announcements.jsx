import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementDetails from '../components/announcements/AnnouncementDetails';
import CreateAnnouncementModal from '../components/announcements/CreateAnnouncementModal';

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Office closed for National Day',
    category: 'HR',
    author: 'Nour Hassan',
    avatar: { initials: 'NH', bgColor: 'bg-indigo-600' },
    date: 'Nov 8',
    fullDate: 'Nov 8, 2026',
    isImportant: true,
    excerpt:
      'The office will be closed on Dec 6 and reopen the following day. Remote work is optional.',
    content:
      'Dear team, the office will be closed on Sunday, Dec 6 for National Day and reopen on Monday.\nPlease make sure deadlines falling on that date are reassigned.',
  },
  {
    id: 2,
    title: 'Q4 planning kickoff meeting',
    category: 'Management',
    author: 'Omar Khaled',
    avatar: { initials: 'AY', bgColor: 'bg-emerald-500' },
    date: 'Nov 6',
    fullDate: 'Nov 6, 2026',
    isImportant: false,
    excerpt:
      'Join us Sunday at 10:00 to review quarterly goals and project priorities.',
    content:
      'Join us Sunday at 10:00 in the main meeting room (or via Google Meet) to review quarterly goals, sprint velocity, and upcoming project priorities for Q4.',
  },
  {
    id: 3,
    title: 'New leave request process',
    category: 'HR',
    author: 'Nour Hassan',
    avatar: { initials: 'MA', bgColor: 'bg-pink-500' },
    date: 'Oct 20',
    fullDate: 'Oct 20, 2026',
    isImportant: false,
    excerpt:
      'Leave requests are now submitted directly through WorkFlow and approved by your manager.',
    content:
      'Leave requests are now submitted directly through WorkFlow and approved by your manager. You can track your annual, sick, and emergency balances from the My Leave Requests tab.',
  },
];

const Announcements = ({
  currentUser = {
    name: 'Nour Hassan',
    role: 'Admin',
    avatar: { initials: 'NH', bgColor: 'bg-indigo-600' },
  },
}) => {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [selectedId, setSelectedId] = useState(INITIAL_ANNOUNCEMENTS[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [mobileShowDetails, setMobileShowDetails] = useState(false);

  const canCreate = currentUser.role === 'Admin' || currentUser.role === 'Manager';
  const selectedAnnouncement =
    announcements.find((item) => item.id === selectedId) || null;

  const handleSelect = (item) => {
    setSelectedId(item.id);
    setMobileShowDetails(true);
  };

  const handleSaveAnnouncement = (savedItem) => {
    setAnnouncements((prev) => {
      const exists = prev.some((item) => item.id === savedItem.id);
      const updated = exists
        ? prev.map((item) => (item.id === savedItem.id ? savedItem : item))
        : [savedItem, ...prev];

      return [...updated].sort(
        (a, b) => Number(b.isImportant) - Number(a.isImportant)
      );
    });
    setSelectedId(savedItem.id);
    setEditingItem(null);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (selectedId === id) {
        setSelectedId(filtered[0]?.id || null);
        setMobileShowDetails(false);
      }
      return filtered;
    });
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Announcements
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Company news and updates
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-700"
          >
            <FiPlus className="h-4 w-4" />
            Create Announcement
          </button>
        )}
      </div>

      {/* Master-Detail Split Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left List */}
        <div
          className={`space-y-3 lg:col-span-5 ${
            mobileShowDetails ? 'hidden lg:block' : 'block'
          }`}
        >
          {announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              isSelected={item.id === selectedId}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Right Detail Panel */}
        <div
          className={`lg:col-span-7 ${
            mobileShowDetails ? 'block' : 'hidden lg:block'
          }`}
        >
          <AnnouncementDetails
            announcement={selectedAnnouncement}
            userRole={currentUser.role}
            onBack={() => setMobileShowDetails(false)}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteAnnouncement}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CreateAnnouncementModal
        key={editingItem ? `edit-${editingItem.id}` : `create-${isModalOpen}`}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveAnnouncement}
        initialData={editingItem}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Announcements;