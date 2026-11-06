import { useLocalSearchParams } from "expo-router";

import DeliveryEvidence from "@/pages/DeliveryEvidence/DeliveryEvidence";

export default function DeliveryEvidenceRoute() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return <DeliveryEvidence shipmentId={Number(id)} />;
}
