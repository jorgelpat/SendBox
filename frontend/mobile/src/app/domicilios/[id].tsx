import { useLocalSearchParams } from "expo-router";

import ShipmentDetail from "../../pages/ShipmentDetail/ShipmentDetail";

export default function ShipmentDetailRoute() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <ShipmentDetail
      shipmentId={Number(id)}
    />
  );
}