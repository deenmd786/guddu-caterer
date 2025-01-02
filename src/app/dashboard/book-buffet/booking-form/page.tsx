"use client"

import Button from "../../../../components/reuseable/Button";
import EnquiryForm from "../../../../components/reuseable/CateringForm";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import WhatsAppPage from "../../_components/WhatsAppMessage";

const BookingForm = () => {
    const route = useRouter();
    return(
        <div className="p-3  md:p-6">
        <ProgressSteps currentStep={3} />
        <div className="mb-3
         flex my-4 justify-center items-center">

            <EnquiryForm />
        </div>
        <div className="flex justify-between">
        <Button label="Back" onClick={()=> route.back()} className="catr-btn" />
        <WhatsAppPage/>
        </div>
        </div>
    )
}
export default BookingForm;