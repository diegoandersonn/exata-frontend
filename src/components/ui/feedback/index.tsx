import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import FeedbackCard from "./card";
import { AvaliationType } from "@/types/avaliation-type";

export default function Feedbacks({ feedbackList }: { feedbackList: AvaliationType[] }) {
  if (!Array.isArray(feedbackList)) {
    return <div>Erro: feedbackList deve ser um array.</div>;
  }
  
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6">Feedbacks</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full max-w-4xl"
        >
        {feedbackList.map((feedback, index) => (
          <SwiperSlide key={index}>
            <FeedbackCard feedback={feedback.comentario} rating={feedback.avaliacao} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
