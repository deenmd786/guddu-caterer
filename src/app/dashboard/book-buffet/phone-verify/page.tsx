"use client";
import Button from "../../../../components/reuseable/Button";
import OtpVerify from "../../../../components/ui/OtpVerify";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";

const PhoneVerify: React.FC = () => {
  const route = useRouter();
  return (
    <div className="w-full p-8">
        <ProgressSteps currentStep={2} />

      <div className="py-12"> 
      <OtpVerify />
      </div>
      <div className="flex justify-between pt-8">
        <Button
          label="Back"
          onClick={() => route.back()}
          className="catr-btn"
        />
        <Button label="Next" href="/dashboard/book-buffet/booking-form" />
      </div>
    </div>
  );
};

export default PhoneVerify;
