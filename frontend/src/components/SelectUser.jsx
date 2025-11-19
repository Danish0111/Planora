import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useEffect, useState } from "react";
import { User, Users } from "lucide-react";
import Modal from "./Modal";
import AvatarGroup from "./AvatarGroup";

const SelectUser = ({ selectedUser, setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUser, setTempSelectedUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUser((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }

  const handleAssign = () => {
    setSelectedUser(tempSelectedUser);
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setTempSelectedUser(selectedUser);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setTempSelectedUser(selectedUser);
    setIsModalOpen(false);
  }

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUser.includes(user._id))
    .map((user) => user.profileImageUrl || "none");

  useEffect(() => {
    getAllUsers();
  }, [])

  useEffect(() => {
    if (selectedUser.length === 0) {
      setTempSelectedUser([]);
    }

    return () => {};
  }, [selectedUser])


  return (
    <div>
      {selectedUserAvatars.length === 0 && (
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:ring-1 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" onClick={handleOpenModal}>
          <Users className="size-5" />
          Add Members
        </button>
      )}
      {selectedUserAvatars.length > 0 && (
        <div className="" onClick={handleOpenModal}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"Select Users"}>
        {allUsers.map((user) => (
          <div key={user._id} className="flex items-center justify-between gap-4 mb-4 border-b border-gray-200 p-4">
            <div className="flex items-center gap-4">
              {user.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="" />
              ) : (
                <Users className="size-12 rounded-full bg-gray-300 p-2" />
              )}
              <div className="">
                <div className="font-semibold">{user.fullName}</div>
                <div className="text-sm ">{user.email}</div>
              </div>
            </div>
            <input type="checkbox" checked={tempSelectedUser.includes(user._id)} onChange={() => toggleUserSelection(user._id)} />
          </div>
        ))}
        <div className="flex justify-end items-center gap-4 m-4 mt-10">
          <button type="button" className="bg-gray-200/70 hover:bg-gray-200 transition hover:cursor-pointer px-4 p-2 rounded text-sm font-semibold" onClick={handleCloseModal}>CANCEL</button>
          <button type="" className="bg-blue-600 hover:bg-blue-700 transition hover:cursor-pointer px-4 p-2 rounded text-sm font-semibold text-white" onClick={handleAssign}>DONE</button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUser
