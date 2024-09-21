import { FeaturesSectionDemo } from "@/components/App/Features";
import VortexBackground from "@/components/App/Vortex";
import { FloatingNav } from "@/components/ui/floating-navbar";
export default function Home() {
  return (
   <div className=" w-screen">
      <FloatingNav navItems={[{name: 'Home', link: '/'}, {name: 'About', link: '/about'}, {name: 'Contact', link: '/contact'}]} />
      <VortexBackground />
      <FeaturesSectionDemo/>
   </div>
  );
}
