"use client"
import UpdateUser from "../../../components/admin-com/UpdateUser";
import Button from "../../../components/reuseable/Button";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";


const ProfileSettings = () => {
    const user = useSelector((state: RootState) => state.user.user);
  
    if (!user) {
      return <div>No user data available.</div>;
    }
  
    return (
        <>
        <div className="flex justify-center items-center h-[70vh] md:h-[90vh]"><UpdateUser user={user} />
        
        </div>
        <div className="mx-8">
          <Button label="Back to home" href="/" className="catr-btn" />
        </div>
        </>
    );
  };
  
  export default ProfileSettings;