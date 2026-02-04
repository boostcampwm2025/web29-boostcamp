import {
  CoreFeaturesSection,
  HeroSection,
  ValuePropositionSection,
} from './components/sections'

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col">
      <HeroSection />
      <CoreFeaturesSection />
      <ValuePropositionSection />
    </main>
  )
}
