import React, { useEffect, useState } from "react";
import { Modal } from "antd";

import BalanceCard from "../../components/HomeComponents/AccountBalance/BalanceCard";
import GlassCard from "../../components/GlassCard/GlassCard";
import TopSection from "../../components/TopSection/TopSection";
import HomeSlider from "../../components/HomeComponents/HomeSlider/HomeSlider";
import Task from "../../components/HomeComponents/Task/Task";

import { useGetOfferQuery } from "../../redux/services/offer/offerApiServices";

const Home = () => {
  const { data: offer } = useGetOfferQuery();

  const [openOffer, setOpenOffer] = useState(false);
  const [homeOffer, setHomeOffer] = useState(null);

  const offerData = offer?.data || [];

  // ✅ Filter Offer For Home
  useEffect(() => {
    if (!offerData.length) return;

    const filteredOffer = offerData.find((item) => item.showOn === "Home");
   

    if (filteredOffer) {
      setHomeOffer(filteredOffer);
      setOpenOffer(true); // open modal
    }
  }, [offerData]);

  return (
    <div className="px-5">
      {/* TopSection */}
      <TopSection />

      <GlassCard>
        <BalanceCard />
      </GlassCard>

      <HomeSlider />

      <Task />

      {/* ✅ Offer Modal */}
      <Modal
        open={openOffer}
        footer={null}
        centered
         width={300}  
        onCancel={() => setOpenOffer(false)}
      >
        {homeOffer && (
          <div className="text-center ">
            <h2 className="text-xl font-bold mb-2">{homeOffer.title}</h2>

            {homeOffer.image && (
              <img
                src={homeOffer.image}
                alt="offer"
                className="w-full rounded-lg mb-3"
              />
            )}

            <p>{homeOffer.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
