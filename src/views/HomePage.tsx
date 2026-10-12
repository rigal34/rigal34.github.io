import React from "react";
import HackerHero from "@components/Home/HackerHero";
import RecentWorkNew from "@components/Home/RecentWorkNew";
import RecentProjectsNew from "@components/Home/RecentProjectsNew";
import TechArsenal from "@components/Home/TechArsenal";
import PackageRegistry from "@components/Home/PackageRegistry";
import SecurityClearance from "@components/Home/SecurityClearance";
import ConnectSection from "@components/Home/ConnectSection";
import OriginStory from "@components/Home/OriginStory";
import AcademicLog from "@components/Home/AcademicLog";
import { AnimatedBackground } from "@components/ui/AnimatedBackground";
import type { GitHubData } from "@lib/github";

type Props = {
  github: GitHubData;
};

export default function HomePage({ github }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-bg text-white selection:bg-neon-cyan selection:text-black">
      <AnimatedBackground />

      <main className="relative z-10 flex flex-col gap-8 md:gap-12 pb-16 px-0 md:px-8">
        <HackerHero github={github} />
        <OriginStory />
        <RecentProjectsNew />
        <TechArsenal />
        <RecentWorkNew />
        <AcademicLog />
        <SecurityClearance />
        <PackageRegistry />
        <ConnectSection />
      </main>
    </div>
  );
}
