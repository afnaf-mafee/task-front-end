import React from "react";
import BalanceCard from "../../components/HomeComponents/AccountBalance/BalanceCard";
import GlassCard from "../../components/GlassCard/GlassCard";
import TopSection from "../../components/TopSection/TopSection";
import HomeSlider from "../../components/HomeComponents/HomeSlider/HomeSlider";
import Task from "../../components/HomeComponents/Task/Task";

const Home = () => {
  return (
    <div className="px-5 ">
       {/* TopSection */}
       <TopSection/>
      <GlassCard >
        <BalanceCard />
      </GlassCard>
      {/* slider */}
      <HomeSlider/>
      {/* task */}
      <Task/>
    </div>
  );
};

export default Home;
