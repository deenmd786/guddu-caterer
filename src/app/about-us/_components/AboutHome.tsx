import Logo from "../../../components/reuseable/Logo";
import Image from "next/image";

const AboutHome = () => {
  return (
    <>
      {" "}
      <div
        className="flex relative items-center justify-center min-h-screen"
        style={{
          fontFamily: "'Roboto', sans-serif",
          // background: "linear-gradient(135deg, #FFECE7, #ffaf9b)",
        }}
      >
        {" "}
        
        <div className=" container pt-24 z-10 flex flex-col md:flex-row  items-center p-7 md:p-28">
          <div className="md:w-2/3 max-w-lg">
          <span className=" top-10 absolute "><Logo/></span>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">ABOUT US</h1>
            <hr className="border-t-2 border-[var(--border)] w-16 mb-4" />
            <p className="text-[var(--text-primary)] mb-6">
            At Guddu Catering Service, we are passionate about bringing people together through delicious vegetarian and vegan cuisine. As a dedicated food and beverage provider, we take pride in offering customized catering services tailored to your needs. Whether it’s a grand celebration or an intimate gathering, our team ensures every meal is a memorable experience.

With a focus on quality, freshness, and impeccable service, we are committed to creating culinary delights that reflect your tastes and preferences. We don&apos;t just serve food; we create an experience that leaves a lasting impression.
            </p>
          </div>
          <div className="md:w-[45%] ml-auto">
            <Image
              alt="Illustration of a chef team"
              src="/assets/images/banners/about-us (2).png"
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Background Circles */}
        <div className="hidden md:block">
        <span className="bg-red-300 w-20 h-20 rounded-full absolute bottom-32 left-1/2 md:left-1/3  transform -translate-x-1/2 blur-md opacity-50 z-0"></span>
        <span className="bg-red-300 w-20 h-20 rounded-full absolute bottom-32 left-1/2 md:left-1/3 transform -translate-x-1/2 backdrop-blur-md opacity-50 z-0"></span>
        <span className="bg-red-300 w-40 h-40 rounded-full absolute top-28 left-1/2 md:left-72 transform -translate-x-1/2 blur-md opacity-50 z-0"></span>
        <span className="bg-red-300 w-40 h-40 rounded-full absolute top-28 left-1/2 md:left-72 transform -translate-x-1/2 backdrop-blur-md opacity-50 z-0"></span>
        </div>
        {/* Foreground Circles */}
        
      </div>
    </>
  );
};

export default AboutHome;
