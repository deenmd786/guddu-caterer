import SubCategory from "./SubCategory";


interface BuffetSectionProps {
    title: string;
    pricing: string;
  }

const BuffetSection: React.FC<BuffetSectionProps> = ({ title, pricing }) => {
    return (
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h3>
        <p className="text-gray-600 mb-4">
          Pricing: {pricing} (Pricing varies based on quality and rental)
        </p>
        <SubCategory title="Appetizers" />
        <SubCategory title="Main Courses" />
        <SubCategory title="Desserts" />
        <SubCategory title="Beverages" />
      </section>
    );
  };

  export default BuffetSection;
  