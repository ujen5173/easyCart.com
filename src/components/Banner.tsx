import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full py-4">
      <div className="container relative mx-auto flex items-center justify-center rounded-md py-12">
        <div className="absolute inset-0 -z-10">
          <Image
            className="h-full w-full rounded-md"
            src="/images/default_banner.jfif"
            alt="Default Banner"
            width={1920}
            height={1080}
            draggable={false}
          />
          {/* <img
            className="h-full w-full rounded-md"
            src="/images/default_banner.jfif"
            alt="Default Banner"
            draggable={false}
          /> */}
        </div>
        <div className="flex w-4/12 flex-col items-center justify-center">
          <h1 className="mb-2 text-center text-5xl font-semibold leading-tight text-white">
            20% off everything. Let&rsquo;s celebrate.
          </h1>
          <p className="mb-4 text-center text-xl font-medium leading-tight text-white">
            Sixteen years of art on anything. Just a few days to save on all of
            it.
          </p>
          <button className="btn-primary-white w-auto px-8">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
