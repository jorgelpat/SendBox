import { useLocalSearchParams } from "expo-router";

import PickupEvidence from "../../../pages/PickupEvidence/PickupEvidence";

export default function PickupEvidenceRoute() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <PickupEvidence
      shipmentId={Number(id)}
    />
  );
}