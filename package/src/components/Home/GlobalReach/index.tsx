import { GlobalReachData } from "./data";
import { Card, CardContent } from "@/components/ui/card";

const GlobalReach = () => {
  return (
    <section className="pt-20">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-white font-medium">
            Built for <span className="text-primary">real portfolio decisions</span>
          </p>
          <h2 className="mt-4 text-3xl font-medium text-white sm:text-5xl">
            Four layers that keep the review grounded
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
          {GlobalReachData.map((item, index) => {
            return (
              <Card
                key={index}
                className="flex flex-col border border-white/10 gap-4 bg-white/5 py-4 md:py-8 px-5 md:px-6 rounded-md ring-0 shadow-none"
              >
                <CardContent className="p-0 flex flex-col gap-4 text-center">
                  <h3 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/80">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
