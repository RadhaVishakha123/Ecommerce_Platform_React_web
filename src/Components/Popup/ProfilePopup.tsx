import useAuth from "../Context/AuthContext";
import UserPersonlDetails from "../UserDataForm/UserPersonlDetails";

export default function ProfilePopup() {
  const { IsProfileopen, closeProfile } = useAuth();

  if (!IsProfileopen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-2xl relative w-[90%] max-w-lg">
        {/* Close Button */}
        <button
          onClick={closeProfile}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        {/* Form Component */}
        <UserPersonlDetails />
      </div>
    </div>
  );
}
