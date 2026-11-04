import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import SideMenu from "../../components/SideMenu/SideMenu";

type Shipment = {
  id: number;
  client: string;
  pickup: string;
  delivery: string;
  icon: "company" | "person" | "store";

  // Solo para simular el comportamiento ya que no hay backend aún
  canAssign: boolean;
};

type AssignmentResult = 
  | "success"
  | "unavailable"
  | null;

const initialShipments: Shipment[] = [
  {
    id: 1,
    client: "Empresa ABC",
    pickup: "Cabecera",
    delivery: "Cañaveral",
    icon: "company",
    canAssign: true,
  },
  {
    id: 2,
    client: "Juan Pérez",
    pickup: "Centro",
    delivery: "Provenza",
    icon: "person",
    // Simula que ya no está disponible
    canAssign: false,
  },
  {
    id: 3,
    client: "Droguería San Luis",
    pickup: "San Alonso",
    delivery: "Real de Minas",
    icon: "store",
    canAssign: true,
  },
];

export default function AvailableShipments() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shipments, setShipments] = useState(initialShipments);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [assignmentResult, setAssignmentResult] = useState<AssignmentResult>(null);

  function getClientIcon(icon: Shipment["icon"]) {
    if (icon === "person") {
      return (
        <Feather
          name="user"
          size={32}
          color="#0e4f8f"
        />
      );
    }

    if (icon === "store") {
      return (
        <MaterialCommunityIcons
          name="storefront-outline"
          size={32}
          color="#0e4f8f"
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name="office-building-outline"
        size={32}
        color="#0e4f8f"
      />
    );
  }

  function handleTakeShipment(
    shipment: Shipment
  ) {
    setSelectedShipment(shipment);
    // Aquí irá la respuesta del backend

    if (shipment.canAssign) {
      setAssignmentResult("success");

      // lo quitamos de disponibles porque ya fue tomado

      setShipments((current) => 
        current.filter(
          (item) => item.id !== shipment.id
        )
      );
    } else {
      setAssignmentResult("unavailable");
    }
  }

  function closeModal() {
    setAssignmentResult(null);
    setSelectedShipment(null);
  }

  function goToMyShipments() {
    closeModal();

    router.push("/mis-domicilios");
  }

  function continueViewing() {
    closeModal();
  }

  function refreshList() {
    if (selectedShipment) {
      // aquí se simula que al actualizar desaparece el domicilio que tomó otro mensajero
      setShipments((current) =>
        current.filter(
          (item) =>
            item.id !== selectedShipment.id
        )
      );
    }

    closeModal();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* =========================
          HEADER
          ========================= */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(true)}
          activeOpacity={0.7}
        >
          <Feather
            name="menu"
            size={30}
            color="#1f344e"
          />
        </TouchableOpacity>

        <View style={styles.brand}>
          <Text style={styles.brandDark}>
            Send
          </Text>

          <Text style={styles.brandBlue}>
            Box
          </Text>
        </View>

        {/* Espacio para mantener el logo centrado */}
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
        {/* Encabezado */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.title}>
              Domicilios disponibles
            </Text>

            <Text style={styles.subtitle}>
              Servicios que puedes tomar ahora
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {shipments.length}
            </Text>
          </View>
        </View>

        {/* Lista */}
        <View style={styles.shipmentsList}>
          {shipments.map((shipment) => (
            <View
              key={shipment.id}
              style={styles.card}
            >
              {/* Cliente */}
              <View style={styles.cardHeader}>
                <View style={styles.client}>
                  <View style={styles.clientIcon}>
                    {getClientIcon(shipment.icon)}
                  </View>

                  <Text style={styles.clientName}>
                    {shipment.client}
                  </Text>
                </View>

                <View style={styles.availableBadge}>
                  <View style={styles.availableDot} />

                  <Text style={styles.availableText}>
                    Disponible
                  </Text>
                </View>
              </View>

              {/* Línea */}
              <View style={styles.divider} />

              {/* Recogida */}
              <View style={styles.locationRow}>
                <View style={styles.locationIcon}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={35}
                    color="#1685f8"
                  />
                </View>

                <View style={styles.locationInformation}>
                  <Text style={styles.locationLabel}>
                    Recogida
                  </Text>

                  <Text style={styles.locationValue}>
                    {shipment.pickup}
                  </Text>
                </View>
              </View>

              {/* Línea */}
              <View style={styles.locationDivider} />

              {/* Entrega */}
              <View style={styles.locationRow}>
                <View style={styles.locationIcon}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={35}
                    color="#f13e4c"
                  />
                </View>

                <View style={styles.locationInformation}>
                  <Text style={styles.locationLabel}>
                    Entrega
                  </Text>

                  <Text style={styles.locationValue}>
                    {shipment.delivery}
                  </Text>
                </View>
              </View>

              {/* Botón */}
              <TouchableOpacity
                style={styles.takeButton}
                onPress={() =>
                  handleTakeShipment(shipment)
                }
                activeOpacity={0.85}
              >
                <Text style={styles.takeButtonText}>
                  Tomar domicilio
                </Text>

                <Feather
                  name="arrow-right"
                  size={25}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          ))}

          {shipments.length === 0 && (
            <View style={styles.emptyCard}>
              <MaterialCommunityIcons
                name="package-variant"
                size={45}
                color="#91a4ba"
              />

              <Text style={styles.emptyTitle}>
                No hay domicilios disponibles
              </Text>

              <Text style={styles.emptyText}>
                Cuando hayan nuevos servicios apareceran en esta sección
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* =========================
          MENÚ LATERAL
          ========================= */}

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activePage="disponibles"
      />

      {/* Modal Resultado */}
      <Modal 
        visible={assignmentResult !== null}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {assignmentResult === "success" && (
              <>
                <View 
                  style={[
                    styles.resultIcon, 
                    styles.successIcon,
                  ]}
                >
                  <Feather
                    name="check"
                    size={32}
                    color="#08af74"
                  />
                </View>

                <Text style={styles.modalTitle}>
                  Domicilio asignado
                </Text>

                <Text style={styles.modalDescription}>
                  El domicilio fue asignado correctamente
                  Ya puedes consultarlo en Mis domicilios
                </Text>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={goToMyShipments}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>
                    Ir a Mis domicilios
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={continueViewing}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>
                    Seguir viendo disponibles
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {assignmentResult === "unavailable" && (
              <>
                <View 
                  style={[
                    styles.resultIcon, 
                    styles.errorIcon,
                  ]}
                >
                  <Feather
                    name="alert-circle"
                    size={31}
                    color="#ef4050"
                  />
                </View>

                <Text style={styles.modalTitle}>
                  Domicilio no disponible
                </Text>

                <Text style={styles.modalDescription}>
                  Este domicilio acaba de ser tomado
                  por otro mensajero. Actualiza la
                  lista para consultar los servicios
                  que siguen disponibles.
                </Text>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={refreshList}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>
                    Actualizar lista
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={closeModal}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>
                    Volver
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f9ff",
  },

  /* =========================
     HEADER
     ========================= */

  header: {
    height: 72,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,

    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderBottomColor: "#e5ebf2",
  },

  menuButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",
  },

  headerSpace: {
    width: 42,
  },

  brand: {
    flexDirection: "row",
  },

  brandDark: {
    color: "#102846",

    fontSize: 27,
    fontWeight: "800",
  },

  brandBlue: {
    color: "#1476f8",

    fontSize: 27,
    fontWeight: "800",
  },

  /* =========================
     SCROLL
     ========================= */

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 30,
  },

  /* =========================
     TÍTULO
     ========================= */

  pageHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginBottom: 22,
  },

  title: {
    marginBottom: 5,

    color: "#102846",

    fontSize: 29,
    fontWeight: "800",
  },

  subtitle: {
    color: "#6f819b",

    fontSize: 17,
  },

  countBadge: {
    minWidth: 36,
    height: 36,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,

    backgroundColor: "#e8f4ff"
  },

  countText: {
    color: "#1476f8",
    fontWeight: "800",
  },

  /* =========================
     LISTA
     ========================= */

  shipmentsList: {
    gap: 18,
  },

  /* =========================
     CARD
     ========================= */

  card: {
    padding: 16,

    borderRadius: 18,

    backgroundColor: "#ffffff",

    shadowColor: "#17385f",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },

  /* =========================
     CLIENTE
     ========================= */

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 10,
  },

  client: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    gap: 14,
  },

  clientIcon: {
    width: 50,
    height: 50,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 13,

    backgroundColor: "#e8f4ff",
  },

  clientName: {
    flex: 1,

    color: "#102846",

    fontSize: 19,
    fontWeight: "800",
  },

  /* =========================
     DISPONIBLE
     ========================= */

  availableBadge: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    paddingHorizontal: 13,
    paddingVertical: 9,

    borderRadius: 20,

    backgroundColor: "#e6f8f0",
  },

  availableDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#0ba45c",
  },

  availableText: {
    color: "#0b9955",

    fontSize: 14,
    fontWeight: "700",
  },

  /* =========================
     LÍNEAS
     ========================= */

  divider: {
    height: 1,

    marginTop: 14,
    marginBottom: 10,
    marginLeft: 64,

    backgroundColor: "#e2e9f1",
  },

  locationDivider: {
    height: 1,

    marginVertical: 8,
    marginLeft: 64,

    backgroundColor: "#e2e9f1",
  },

  /* =========================
     UBICACIONES
     ========================= */

  locationRow: {
    minHeight: 60,

    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 55,

    alignItems: "center",
  },

  locationInformation: {
    flex: 1,
  },

  locationLabel: {
    marginBottom: 2,

    color: "#7889a1",

    fontSize: 14,
  },

  locationValue: {
    color: "#102846",

    fontSize: 18,
    fontWeight: "700",
  },

  /* =========================
     BOTÓN
     ========================= */

  takeButton: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    marginTop: 12,

    borderRadius: 11,

    backgroundColor: "#1685f8",
  },

  takeButtonText: {
    color: "#ffffff",

    fontSize: 17,
    fontWeight: "800",
  },

  // vacio
  emptyCard: {
    alignItems: "center",

    padding: 35,

    borderRadius: 18,

    backgroundColor: "#ffffff",
  },

  emptyTitle: {
    marginTop: 12,
    marginBottom: 5,

    color: "#102846",

    fontSize: 18,
    fontWeight: "700",
  },

  emptyText: {
    color: "#7889a1",

    textAlign: "center",
    lineHeight: 20,
  },

  modalOverlay: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 28,

    backgroundColor: "rgba(15, 35, 55, 0.58)",
  },

  modalCard: {
    width: "100%",

    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,

    borderRadius: 22,

    backgroundColor: "#ffffff",

    elevation: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },

  // ICONO RESULTADO
  resultIcon: {
    width: 62,
    height: 62,

    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 18,

    borderRadius: 31,
  },

  successIcon: {
    backgroundColor: "#e3f8f0"
  },

  errorIcon: {
    backgroundColor: "#fff0f1",
  },

  modalTitle: {
    marginBottom: 8,

    color: "#102846",

    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
  },

  modalDescription: {
    marginBottom: 22,

    color: "#71829b",

    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  // boton principal
  primaryButton: {
    height: 52,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,

    borderRadius: 11,

    backgroundColor: "#1685f8"
  },

  primaryButtonText: {
    color: "#ffffff",

    fontSize: 15,
    fontWeight: "800",
  },

  // boton secundario
  secondaryButton: {
    height: 50,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#bfd5ea",
    borderRadius: 11,

    backgroundColor: "#ffffff"
  },

  secondaryButtonText: {
    color: "#0872df",

    fontSize: 15,
    fontWeight: "700",
  },
});