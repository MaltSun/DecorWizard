import React, { useEffect, useState } from 'react';
import { ContainerBox } from '../Slider/style';
import ReviewCard from '../ReviewCard/ReviewCard';
import { ReviewCardProps } from '../ReviewCard/type';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewSlider = () => {
    const [content, setContent] = useState<ReviewCardProps[]>([]);
    const [actualSlide, setActualSlide] = useState(0);

    const fetchingReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews/all');
            const data = await response.json();
            if (Array.isArray(data)) {
                const formattedData = data.map((item: any) => ({
                    userName: item.customerName,
                    reviewText: item.text,
                    rating: item.mark,
                    id: item.id
                }));
                setContent(formattedData);
            }
        } catch (err) {
            console.error("Ошибка при загрузке отзывов", err);
        }
    }

    useEffect(() => {
        fetchingReviews();
    }, []);

    return (
        <ContainerBox>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}

                spaceBetween={20}
                slidesPerView={3}

                navigation 
               // autoplay={{
                //     delay: 3000, 
                //     disableOnInteraction: false, // Не останавливать, если юзер сам потрогал слайдер
                // }}

                onSlideChange={(swiper) => setActualSlide(swiper.activeIndex)}
                style={{
                    padding: '0 40px'
                }}
            >
                {content?.map(item => (
                    <SwiperSlide key={item.id}>
                        <ReviewCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </ContainerBox>
    );
};

export default ReviewSlider;