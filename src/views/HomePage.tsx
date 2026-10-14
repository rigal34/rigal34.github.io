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
import { LightningBackground } from "@components/ui/LightningBackground";
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
        {/* Parcours + Formations : éclairs en arrière-plan, mêmes espacements qu'avant.
            Aucun éclair autour de la roue ni de la carte EPSI : la zone commence en dessous
            et s'arrête sous le titre « Protocole académique ». */}
        <div className="relative flex flex-col gap-8 md:gap-12">
          <LightningBackground
            startBelow={['#parcours [class~="lg:sticky"]', '#parcours [class~="space-y-8"] > :first-child']}
            endAt='#formations > [class~="mb-12"]'
          />
          <RecentWorkNew />
          <AcademicLog />
        </div>
        <SecurityClearance />
        <PackageRegistry />
        <ConnectSection />
      </main>
    </div>
  );
}
