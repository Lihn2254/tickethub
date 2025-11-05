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
      alert('Your account was deleted successfully.');
    } catch (error) {
        alert('An error ocurred. Your account could not be deleted.');
    }
  };

  return (
    <div>
      <h1>Account info</h1>
      <button type="button" className="inputOk" onClick={handleDeleteAccount}>
        Delete account
      </button>
    </div>
  );
}
