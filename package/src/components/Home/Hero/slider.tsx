import { pricedata } from "@/app/api/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const CardSlider = () => {
  return (
    <div className="pt-14 flex flex-col gap-10">
      <div className="flex flex-col gap-3 items-center justify-center text-center">
        <p className="text-white font-medium">
          Illustrative <span className="text-primary">market snapshot</span>
        </p>
        <h2 className="sm:text-5xl text-3xl text-white font-medium">
          A cleaner read on tracked assets
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {pricedata.map((item, index) => (
          <div key={index}>
            <Card className="bg-white/5 border-none shadow-none rounded-xl p-0">
              <CardContent className="px-5 py-6">
                <div className="flex flex-col items-center gap-5">
                  <div
                    className={`${item.background} ${item.padding} rounded-full`}
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.title} icon`}
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                  <p className="text-white text-xs font-normal ">
                    <span className="text-16 font-bold mr-2">{item.title}</span>
                    {item.short}
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <div>
                    <p className="text-xl font-bold text-white mb-0 leading-none">
                      {item.price}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
