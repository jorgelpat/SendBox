import { useLocalSearchParams } from "expo-router";

import ShipmentDetail from "../../pages/ShipmentDetail/ShipmentDetail";

export default function ShipmentDetailRoute() {
  const { id, status } = useLocalSearchParams<{
    id: string;
    status?: string;
  }>();

  return (
    <ShipmentDetail
      shipmentId={Number(id)}
      statusOverride={
        status === "RECOGIDO"
          ? "RECOGIDO"
          : undefined
      }
    />
  );
}