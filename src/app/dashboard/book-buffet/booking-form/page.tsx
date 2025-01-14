"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Button from "@/components/reuseable/Button";
import ProgressSteps from "../../_components/ProgressSteps";

const CateringForm = dynamic(() => import("@/components/reuseable/CateringForm"), { ssr: false });
const WhatsAppPage = dynamic(() => import("../../_components/WhatsAppMessage"), { ssr: false });

const BookingForm = () => {
    const route = useRouter();

    return (
        <div className="p-3 md:p-6">
            <ProgressSteps currentStep={3} />
            <div className="mb-3 flex my-4 justify-center items-center">
                <CateringForm />
            </div>
            <div className="flex justify-between">
                <Button label="Back" onClick={() => route.back()} className="catr-btn" />
                <WhatsAppPage />
            </div>
        </div>
    );
};

export default BookingForm;
