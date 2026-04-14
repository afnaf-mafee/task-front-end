import React from "react";
import { Skeleton } from "antd";
import { useGetOfferQuery } from "../../redux/services/offer/offerApiServices";
import OfferCard from "../../components/OfferCard/OfferCard";

const OfferPage = () => {
  const { data: offerData, isLoading } = useGetOfferQuery();

  return (
    <div className="px-5 py-4 font-urbanist">
      <h4 className="text-2xl font-semibold text-white/70 mb-6">All Offers</h4>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="">
          {[...Array(1)].map((_, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                p-4
              "
            >
              <Skeleton.Image active className="!w-full !h-52 !rounded-2xl" />

              <div className="mt-4">
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          {offerData?.data?.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferPage;
