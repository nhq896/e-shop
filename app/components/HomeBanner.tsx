import { Carousel } from "flowbite-react/components/Carousel";

const HomeBanner = () => {
  const bannerImgs = [
    "mi1.jpg",
    "apple1.jpg",
    "mi2.jpg",
    "apple2.jpg",
    "mi3.jpg",
    "apple3.jpg",
    "mi4.jpg",
  ];

  return (
    // <div className="h-56 mb-8 sm:h-64 xl:h-80 2xl:h-96">
    // <div className="w-full aspect-video mb-8">
    <Carousel className="mb-8 h-[50vh] lg:h-[60vh] border-2 border-slate-200 rounded-xl">
      {bannerImgs.map((bannerImg, index) => {
        return (
          <img
            loading="lazy"
            key={`bannerImg${index}`}
            src={`/images/${bannerImg}`}
            alt="Banner Image"
            className="object-cover h-full"
          />
        );
      })}
    </Carousel>
    // </div>
    // <div className="relative mb-8">asdasd</div>
    // <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
    //   <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
    //     <div className="mb-8 md:mb-0 text-center">
    //       <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
    //         Summer Sale!
    //       </h1>
    //       <p className="text-lg md:text-xl text-white mb-2">
    //         Enjoy discounts on selected items
    //       </p>
    //       <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
    //         GET 50% OFF
    //       </p>
    //     </div>
    //     <div className="w-1/3 relative aspect-video">
    //       <Image
    //         src={"/banner-image.png"}
    //         fill
    //         alt="Banner Image"
    //         className="object-contain"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default HomeBanner;
