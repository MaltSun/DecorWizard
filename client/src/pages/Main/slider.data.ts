import { ContentItem } from '../../components/Slider/type';
import { useTranslation } from 'react-i18next';

export const useSlidesData = (): ContentItem[] => {
  const { t } = useTranslation('slider');

  return [
    {
      title: t('slide1.title'),
      description: t('slide1.description'),
      img: '/images/slide1.jpg'
    },
    {
      title: t('slide2.title'),
      description: t('slide2.description'),
      img: '/images/slide2.jpg'
    },
    {
      title: t('slide3.title'),
      description: t('slide3.description'),
      img: '/images/slide1.jpg'
    },
    {
      title: t('slide4.title'),
      description: t('slide4.description'),
      img: '/images/slide2.jpg'
    }

  ];
};