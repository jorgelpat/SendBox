import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

type ShipmentStatus =
  | "ASIGNADO"
  | "RECOGIDO"
  | "ENTREGADO";

type ShipmentDetailProps = {
  shipmentId: number;
  statusOverride?: ShipmentStatus;
};

type Shipment = {
  id: number;
  code: string;
  client: string;
  status: ShipmentStatus;

  pickupName: string;
  pickupAddress: string;

  deliveryName: string;
  deliveryAddress: string;

  contactName: string;
  contactPhone: string;

  description: string;
};

const shipments: Shipment[] = [
  {
    id: 1,
    code: "SB-1044",
    client: "Empresa ABC",
    status: "ASIGNADO",

    pickupName: "Cabecera",
    pickupAddress: "Carrera 27 # 18-12",

    deliveryName: "Cañaveral",
    deliveryAddress: "Calle 52 # 34-10",

    contactName: "Carlos Rojas",
    contactPhone: "+57 300 556 1098",

    description: "Entregar en portería.",
  },

  {
    id: 2,
    code: "SB-1045",
    client: "Juan Pérez",
    status: "RECOGIDO",

    pickupName: "Centro",
    pickupAddress: "Carrera 15 # 35-20",

    deliveryName: "Provenza",
    deliveryAddress: "Calle 105 # 21-40",

    contactName: "Laura Gómez",
    contactPhone: "+57 315 456 8890",

    description: "Llamar antes de realizar la entrega.",
  },

  {
    id: 3,
    code: "SB-1046",
    client: "Droguería San Luis",
    status: "ASIGNADO",

    pickupName: "San Alonso",
    pickupAddress: "Calle 19 # 31-15",

    deliveryName: "Real de Minas",
    deliveryAddress: "Carrera 10 # 55-18",

    contactName: "Andrés López",
    contactPhone: "+57 312 667 4411",

    description: "Entregar directamente al destinatario.",
  },
];

export default function ShipmentDetail({
  shipmentId,
  statusOverride,
}: ShipmentDetailProps) {
  const router = useRouter();

  const shipment = shipments.find(
    (item) => item.id === shipmentId
  );

  if (!shipment) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundTitle}>
          Domicilio no encontrado
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Volver
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentStatus = statusOverride ?? shipment.status;

  function handleMainAction() {
    if (currentStatus === "ASIGNADO") {
    router.push({
      pathname: "/domicilios/[id]/recogida",
      params: {
        id: shipmentId.toString(),
      },
    });

    return;
  }

    if (currentStatus === "RECOGIDO") {
      router.push({
        pathname: "/domicilios/[id]/entrega",
        params: {
          id: shipmentId.toString(),
        },
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* =========================
          HEADER
          ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Feather
            name="chevron-left"
            size={28}
            color="#102846"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Detalle del domicilio
        </Text>

        <View style={styles.headerSpace} />
      </View>

      {/* =========================
          CONTENIDO
          ========================= */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* CLIENTE */}

        <View style={styles.clientSection}>
          <View style={styles.clientIcon}>
            <MaterialCommunityIcons
              name="office-building-outline"
              size={28}
              color="#0e4f8f"
            />
          </View>

          <View style={styles.clientInformation}>
            <Text style={styles.serviceCode}>
              Servicio #{shipment.code}
            </Text>

            <Text style={styles.clientName}>
              {shipment.client}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,

              shipment.status === "ASIGNADO" &&
                styles.statusAssigned,

              shipment.status === "RECOGIDO" &&
                styles.statusPickedUp,

              shipment.status === "ENTREGADO" &&
                styles.statusDelivered,
            ]}
          >
            <View
              style={[
                styles.statusDot,

                shipment.status === "ASIGNADO" &&
                  styles.dotAssigned,

                shipment.status === "RECOGIDO" &&
                  styles.dotPickedUp,

                shipment.status === "ENTREGADO" &&
                  styles.dotDelivered,
              ]}
            />

            <Text
              style={[
                styles.statusBadgeText,

                shipment.status === "ASIGNADO" &&
                  styles.textAssigned,

                shipment.status === "RECOGIDO" &&
                  styles.textPickedUp,

                shipment.status === "ENTREGADO" &&
                  styles.textDelivered,
              ]}
            >
              {shipment.status === "ASIGNADO"
                ? "Asignado"
                : shipment.status === "RECOGIDO"
                  ? "Recogido"
                  : "Entregado"}
            </Text>
          </View>
        </View>

        {/* =========================
            PROGRESO
            ========================= */}

        <View style={styles.progressCard}>
          <ProgressStep
            number={1}
            label="Asignado"
            completed={
              shipment.status === "RECOGIDO" ||
              shipment.status === "ENTREGADO"
            }
            active={
              shipment.status === "ASIGNADO"
            }
          />

          <View
            style={[
              styles.progressLine,

              shipment.status !== "ASIGNADO" &&
                styles.progressLineActive,
            ]}
          />

          <ProgressStep
            number={2}
            label="Recogido"
            completed={
              shipment.status === "ENTREGADO"
            }
            active={
              shipment.status === "RECOGIDO"
            }
          />

          <View
            style={[
              styles.progressLine,

              shipment.status === "ENTREGADO" &&
                styles.progressLineActive,
            ]}
          />

          <ProgressStep
            number={3}
            label="Entregado"
            completed={
              shipment.status === "ENTREGADO"
            }
            active={
              shipment.status === "ENTREGADO"
            }
          />
        </View>

        {/* =========================
            DIRECCIONES
            ========================= */}

        <View style={styles.card}>
          {/* Recogida */}

          <View style={styles.locationRow}>
            <View style={styles.locationMarker}>
              <MaterialCommunityIcons
                name="map-marker"
                size={25}
                color="#1685f8"
              />
            </View>

            <View style={styles.locationInformation}>
              <Text style={styles.locationLabel}>
                Recoger en
              </Text>

              <Text style={styles.locationName}>
                {shipment.pickupName}
              </Text>

              <Text style={styles.locationAddress}>
                {shipment.pickupAddress}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.routeButton}
            >
              <MaterialCommunityIcons
                name="directions"
                size={23}
                color="#1685f8"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.routeConnection}>
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
            <View style={styles.routeDot} />
          </View>

          {/* Entrega */}

          <View style={styles.locationRow}>
            <View style={styles.locationMarker}>
              <MaterialCommunityIcons
                name="map-marker"
                size={25}
                color="#f13e4c"
              />
            </View>

            <View style={styles.locationInformation}>
              <Text style={styles.locationLabel}>
                Entregar en
              </Text>

              <Text style={styles.locationName}>
                {shipment.deliveryName}
              </Text>

              <Text style={styles.locationAddress}>
                {shipment.deliveryAddress}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.routeButton}
            >
              <MaterialCommunityIcons
                name="directions"
                size={23}
                color="#1685f8"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================
            CONTACTO
            ========================= */}

        <View style={styles.card}>
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Feather
                name="user"
                size={24}
                color="#0e4f8f"
              />
            </View>

            <View style={styles.contactInformation}>
              <Text style={styles.contactLabel}>
                Contacto
              </Text>

              <Text style={styles.contactName}>
                {shipment.contactName}
              </Text>

              <Text style={styles.contactPhone}>
                {shipment.contactPhone}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.phoneButton}
            >
              <Feather
                name="phone"
                size={22}
                color="#1685f8"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================
            DESCRIPCIÓN
            ========================= */}

        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>
            Descripción
          </Text>

          <Text style={styles.descriptionText}>
            {shipment.description}
          </Text>
        </View>

        {/* =========================
            ACCIÓN
            ========================= */}

        {shipment.status !== "ENTREGADO" && (
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleMainAction}
            activeOpacity={0.85}
          >
            <Text style={styles.mainButtonText}>
              {shipment.status === "ASIGNADO"
                ? "Registrar recogida"
                : "Registrar entrega"}
            </Text>

            <Feather
              name={
                shipment.status === "ASIGNADO"
                  ? "camera"
                  : "check-circle"
              }
              size={22}
              color="#ffffff"
            />
          </TouchableOpacity>
        )}

        {shipment.status === "ENTREGADO" && (
          <View style={styles.completedMessage}>
            <Feather
              name="check-circle"
              size={24}
              color="#0ba45c"
            />

            <Text style={styles.completedText}>
              Domicilio entregado
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   COMPONENTE DE PROGRESO
   ========================= */

type ProgressStepProps = {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
};

function ProgressStep({
  number,
  label,
  active,
  completed,
}: ProgressStepProps) {
  const highlighted = active || completed;

  return (
    <View style={styles.progressStep}>
      <View
        style={[
          styles.progressCircle,

          highlighted &&
            styles.progressCircleActive,
        ]}
      >
        {completed ? (
          <Feather
            name="check"
            size={15}
            color="#ffffff"
          />
        ) : (
          <Text
            style={[
              styles.progressNumber,

              highlighted &&
                styles.progressNumberActive,
            ]}
          >
            {number}
          </Text>
        )}
      </View>

      <Text
        style={[
          styles.progressLabel,

          highlighted &&
            styles.progressLabelActive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f3f8fd",
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    height: 62,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 14,

    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderBottomColor: "#e3ebf3",
  },

  headerButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#102846",

    fontSize: 17,
    fontWeight: "700",
  },

  headerSpace: {
    width: 42,
  },

  /* CLIENTE */

  clientSection: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,

    marginBottom: 18,
  },

  clientIcon: {
    width: 52,
    height: 52,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,

    backgroundColor: "#e8f4ff",
  },

  clientInformation: {
    flex: 1,
  },

  serviceCode: {
    marginBottom: 3,

    color: "#71829b",

    fontSize: 12,
  },

  clientName: {
    color: "#102846",

    fontSize: 20,
    fontWeight: "700",
  },

  /* ESTADO */

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 18,
  },

  statusDot: {
    width: 8,
    height: 8,

    borderRadius: 4,
  },

  statusBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },

  statusAssigned: {
    backgroundColor: "#e8f4ff",
  },

  dotAssigned: {
    backgroundColor: "#1685f8",
  },

  textAssigned: {
    color: "#1685f8",
  },

  statusPickedUp: {
    backgroundColor: "#fff0e4",
  },

  dotPickedUp: {
    backgroundColor: "#f36a13",
  },

  textPickedUp: {
    color: "#e45c09",
  },

  statusDelivered: {
    backgroundColor: "#e4f8ee",
  },

  dotDelivered: {
    backgroundColor: "#0ba45c",
  },

  textDelivered: {
    color: "#0b9955",
  },

  /* PROGRESO */

  progressCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    paddingHorizontal: 20,
    paddingVertical: 18,

    marginBottom: 16,

    borderRadius: 16,

    backgroundColor: "#ffffff",

    elevation: 3,

    shadowColor: "#17385f",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  progressStep: {
    width: 64,

    alignItems: "center",
  },

  progressCircle: {
    width: 27,
    height: 27,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor: "#d9e5f0",
    borderRadius: 14,

    backgroundColor: "#ffffff",
  },

  progressCircleActive: {
    borderColor: "#1685f8",
    backgroundColor: "#1685f8",
  },

  progressNumber: {
    color: "#97a7b9",

    fontSize: 12,
    fontWeight: "700",
  },

  progressNumberActive: {
    color: "#ffffff",
  },

  progressLabel: {
    marginTop: 5,

    color: "#93a3b5",

    fontSize: 10,
    fontWeight: "600",
  },

  progressLabelActive: {
    color: "#1685f8",
  },

  progressLine: {
    flex: 1,
    height: 2,

    marginTop: 13,

    backgroundColor: "#dce6ef",
  },

  progressLineActive: {
    backgroundColor: "#1685f8",
  },

  /* CARDS */

  card: {
    padding: 18,

    marginBottom: 14,

    borderRadius: 16,

    backgroundColor: "#ffffff",

    elevation: 3,

    shadowColor: "#17385f",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  /* UBICACIONES */

  locationRow: {
    flexDirection: "row",
    alignItems: "center",

    minHeight: 72,
  },

  locationMarker: {
    width: 42,

    alignItems: "center",
  },

  locationInformation: {
    flex: 1,
  },

  locationLabel: {
    color: "#71829b",

    fontSize: 12,
  },

  locationName: {
    marginVertical: 3,

    color: "#102846",

    fontSize: 17,
    fontWeight: "700",
  },

  locationAddress: {
    color: "#75879f",

    fontSize: 12,
  },

  routeButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    backgroundColor: "#e8f4ff",
  },

  routeConnection: {
    width: 42,

    alignItems: "center",

    gap: 3,

    marginVertical: -5,
  },

  routeDot: {
    width: 3,
    height: 3,

    borderRadius: 2,

    backgroundColor: "#b8c8d8",
  },

  /* CONTACTO */

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  contactIcon: {
    width: 48,
    height: 48,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,

    borderRadius: 13,

    backgroundColor: "#e8f4ff",
  },

  contactInformation: {
    flex: 1,
  },

  contactLabel: {
    color: "#71829b",

    fontSize: 12,
  },

  contactName: {
    marginVertical: 3,

    color: "#102846",

    fontSize: 15,
    fontWeight: "700",
  },

  contactPhone: {
    color: "#75879f",

    fontSize: 12,
  },

  phoneButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    backgroundColor: "#e8f4ff",
  },

  /* DESCRIPCIÓN */

  descriptionCard: {
    padding: 18,

    marginBottom: 20,

    borderLeftWidth: 4,
    borderLeftColor: "#1685f8",

    borderRadius: 13,

    backgroundColor: "#e7f3ff",
  },

  descriptionTitle: {
    marginBottom: 8,

    color: "#102846",

    fontSize: 14,
    fontWeight: "700",
  },

  descriptionText: {
    color: "#536783",

    fontSize: 13,
    lineHeight: 19,
  },

  /* BOTÓN PRINCIPAL */

  mainButton: {
    height: 55,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,

    borderRadius: 12,

    backgroundColor: "#1685f8",
  },

  mainButtonText: {
    color: "#ffffff",

    fontSize: 16,
    fontWeight: "800",
  },

  /* ENTREGADO */

  completedMessage: {
    height: 55,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,

    borderRadius: 12,

    backgroundColor: "#e4f8ee",
  },

  completedText: {
    color: "#0b9955",

    fontSize: 16,
    fontWeight: "700",
  },

  /* NO ENCONTRADO */

  notFound: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    padding: 25,

    backgroundColor: "#f3f8fd",
  },

  notFoundTitle: {
    marginBottom: 20,

    color: "#102846",

    fontSize: 22,
    fontWeight: "700",
  },

  backButton: {
    paddingHorizontal: 25,
    paddingVertical: 13,

    borderRadius: 10,

    backgroundColor: "#1685f8",
  },

  backButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});