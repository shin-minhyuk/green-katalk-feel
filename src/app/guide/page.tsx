import { Footer, Header } from "@/components/common";
import {
  ContextualTipTabs,
  FaqAccordion,
  ToneMisunderstanding,
} from "@/components/guide";

export default function GuidePage() {
  return (
    <>
      <Header />
      <ToneMisunderstanding />
      <ContextualTipTabs />
      <FaqAccordion />
      <Footer />
    </>
  );
}
