import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { deleteAccount } from "@/app/services/auth";

export default function AccountInfo() {
  const { user } = useAuth();
  const { logoutUser } = useAuth();
  const router = useRouter();

  const handleDeleteAccount = () => {
    try {
      deleteAccount(user!);
      logoutUser();
      alert("Your account was deleted successfully.");
    } catch (error) {
      alert("An error ocurred. Your account could not be deleted.");
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <span>{user?.accountType == 'client' ? `Name: ${user?.name} ${user?.lastname}` : null}</span>
        <span>User ID: {user?.id}</span>
        <span>Username: {user?.username}</span>
        <span>Email: {user?.email}</span>
      </div>
      <button
        type="button"
        className="inputOk bg-red-600 border-red-600"
        onClick={handleDeleteAccount}
      >
        Delete account
      </button>
    </div>
  );
}
