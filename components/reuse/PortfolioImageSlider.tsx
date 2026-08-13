'use client'

import Image from 'next/image'
import { PortfolioProject } from '../portfolio/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css/navigation'

interface PortfolioImageSliderProps {
  project: PortfolioProject
}

export default function PortfolioImageSlider({ project }: PortfolioImageSliderProps) {
  const prevEl = `swiper-button-prev-${project.id}`
  const nextEl = `swiper-button-next-${project.id}`

  return (
    <>
      <div className="portfolioSlider group relative h-[288px] overflow-hidden">
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: `.${prevEl}`,
            nextEl: `.${nextEl}`,
          }}
          loop={true}
          modules={[Pagination, Navigation]}
          className="h-full w-full"
        >
          {project.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full">
                {/* The photograph is the product, so it is what responds to a
                    hover — a slow 4% push in, clipped by the slider's
                    overflow. 700ms is deliberately slower than the card's own
                    300ms border and shadow, so the frame reacts first and the
                    image follows it. */}
                <Image
                  src={image?.src}
                  alt={image?.alt || 'Portfolio Image'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${prevEl} absolute top-1/2 left-0 z-10 ml-2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[7px] border-[1.25px] border-[rgba(124,104,88,0.4)] bg-white transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-50 md:left-[19px] md:ml-0 md:opacity-0`}
          aria-label="Scroll left"
        >
          <Image src="/swiper/left-arrow.svg" className="" alt="Previous" width={8} height={8} />
        </button>

        <button
          className={`${nextEl} absolute top-1/2 right-0 z-10 mr-2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[7px] border-[1.25px] border-[rgba(124,104,88,0.4)] bg-white transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-50 md:right-[19px] md:mr-0 md:opacity-0`}
          aria-label="Scroll right"
        >
          <Image src="/swiper/right-arrow.svg" className="" alt="Next" width={8} height={8} />
        </button>
      </div>
    </>
  )
}
