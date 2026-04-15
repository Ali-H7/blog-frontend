import { useAuth } from '../../context/AuthContext';
import GuestMessage from './GuestMessage';
import MemberMessage from './MemberMessage';
import AdminMessage from './AdminMessage';

function Banner() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <div className='bg-papaya_whip-400 p-1'>
      {user && !isAdmin ? (
        <MemberMessage user={user} />
      ) : user && isAdmin ? (
        <AdminMessage user={user} />
      ) : (
        <GuestMessage />
      )}
    </div>
  );
}
export default Banner;
