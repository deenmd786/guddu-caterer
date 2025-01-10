"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "@/styles/slider.css";
import TestimonialCard from "../reuseable/TestimonialCard";

type Testimonial = {
  name: string;
  title: string;
  image: string;
  description: string;
};

const testimonials: Testimonial[] = [
  {
    "name": "Lakhan Kumar",
    "title": "Sales Manager",
    "image": "/assets/images/people/1.jpg",
    "description":
      "The team at this company provided exceptional service. Their attention to detail and commitment to customer satisfaction truly stand out. They helped streamline our sales operations effectively."
  },
  {
    "name": "Priti Sharma",
    "title": "Operations Manager",
    "image": "/assets/images/people/2.jpg",
    "description":
      "Working with this team has been a game-changer for our operations. Their innovative approach and dedication ensured our business processes became more efficient and scalable."
  },
  {
    "name": "Priya Iyer",
    "title": "Marketing Specialist",
    "image": "/assets/images/people/3.jpg",
    "description":
      "The solutions offered were tailor-made to meet our needs. Their expertise in understanding market dynamics and crafting effective strategies helped us achieve significant growth."
  },
  {
    "name": "Sristi Gupta",
    "title": "Regional Manager",
    "image": "/assets/images/people/4.jpg",
    "description":
      "I was impressed with their professionalism and attention to detail. They went above and beyond to ensure that our regional operations ran smoothly, exceeding our expectations."
  }


];

const TestimonialSlider: React.FC = () => {
return (
  <div className="max-w-5xl mx-auto">
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      speed={1800}
      spaceBetween={30}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
      }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="pb-4 lg:py-10">
          <TestimonialCard
            name={testimonial.name}
            title={testimonial.title}
            image={testimonial.image}
            description={testimonial.description}
          />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
};

export default TestimonialSlider;
