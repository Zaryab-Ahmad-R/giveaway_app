// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import InstagramEmbed from "./InstagramEmbed";
import { useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";




export default () => {
    return (
        <div className="w-full flex justify-center mt-6">
            <Swiper
                spaceBetween={2}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2, spaceBetween: 20 }, // tablets
                    1024: { slidesPerView: 3, spaceBetween: 30 }, // desktops
                }}
                centeredSlides={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-[95%] md:max-w-[1200px] max-w-[370px] mx-auto flex justify-center"
            >
                {/* Slide 1 */}
                <SwiperSlide className="flex justify-center items-center">
                   <InstagramEmbed url='https://www.instagram.com/p/DDKTKAyRR6h/'/>
                </SwiperSlide>
               
                {/* Slide 2 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/DByjaWdNuhD/" />
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C_dZUzktATT/" />
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-xwtrjNuOm/" />
                </SwiperSlide>

                {/* Slide 5 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-vJs84NNjs/" />
                </SwiperSlide>

                {/* Slide 6 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-shJjstlJy/" />
                </SwiperSlide>

                {/* Slide 7 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-X6mWgtTZi/" />
                </SwiperSlide>
                
                {/* Slide 8 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-VT7iFNuLb/" />
                </SwiperSlide>

                {/* Slide 9 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C-IZfLqtGxk/" />
                </SwiperSlide>

                {/* Slide 10 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C7ozYL8sYuT/" />
                </SwiperSlide>

                {/* Slide 11 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C7CJuaOvd-9/" />
                </SwiperSlide>
                
                {/* Slide 12 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C6yv3TysRYb/" />
                </SwiperSlide>
                
                {/* Slide 13 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C6RauAlMoLG/" />
                </SwiperSlide>

                {/* Slide 14 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C58oPA8MRcT/" />
                </SwiperSlide>
                
                {/* Slide 15 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C5Qqjl2BTST/" />
                </SwiperSlide> 

                {/* Slide 16 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C5QpZctIxkq/" />
                </SwiperSlide>

                {/* Slide 18 */}
                <SwiperSlide className="flex justify-center items-center">
                    <InstagramEmbed url="https://www.instagram.com/p/C5QoihoI38_/" />
                </SwiperSlide>

            </Swiper>
        </div>

    );
};