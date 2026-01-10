import LoadingPage from "@/app/components/LoadingPage";
import { Suspense } from "react";
import PurchaseContent from "./PurchaseContent";

export default function Purchase() {
  return (
    <Suspense fallback={<LoadingPage text="Loading purchase details..." />}>
      <PurchaseContent />
    </Suspense>
  );
}