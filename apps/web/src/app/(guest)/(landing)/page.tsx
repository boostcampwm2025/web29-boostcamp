import {
  CoreFeaturesSection,
  HeroSection,
  ValuePropositionSection,
} from './components/sections'

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col gap-24">
      <HeroSection />
      <CoreFeaturesSection />
      <ValuePropositionSection />
    </main>
  )
}
