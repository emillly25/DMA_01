import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import one from '../../assets/1.jpg'
import two from '../../assets/2.jpg'
import three from '../../assets/3.jpg'
import four from '../../assets/4.jpg'
import five from '../../assets/5.jpg'

const settings = {
  dots: true,
  appendDots: (dots) => (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '3%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ul>{dots}</ul>
    </div>
  ),
  dotsClass: 'dots_custom',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  draggable: true,
  pauseOnHover: true,
  fill: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
      },
    },
  ],
}

export const ImgSlider = () => {
  return (
    <div className="container mx-auto md:block ">
      <Slider {...settings}>
        <div className="relative w-full h-screen">
          <Image src={one} layout="fill" alt="photo" />
        </div>
        <div className="relative w-full h-screen ">
          <Image src={two} layout="fill" alt="photo" />
        </div>
        <div className="relative w-full h-screen">
          <Image src={four} layout="fill" alt="photo" />
        </div>
        <div className="relative w-full h-screen">
          <Image src={three} layout="fill" alt="photo" />
        </div>
        <div className="relative w-full h-screen">
          <Image src={five} layout="fill" alt="photo" />
        </div>
      </Slider>
    </div>
  )
}
