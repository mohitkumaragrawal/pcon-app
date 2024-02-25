import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
import RecentActions from "@/components/home/recent-actions";
import UpcomingEvents from "@/components/home/upcoming-events";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RecentActions />
      <UpcomingEvents />
    </>
  );
}
