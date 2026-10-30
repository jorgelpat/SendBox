import { useState } from "react";

import {
  SafeAreaView,
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
};

const availableShipments: Shipment[] = [
  {
    id: 1,
    client: "Empresa ABC",
    pickup: "Cabecera",
    delivery: "Cañaveral",
    icon: "company",
  },
  {
    id: 2,
    client: "Juan Pérez",
    pickup: "Centro",
    delivery: "Provenza",
    icon: "person",
  },
  {
    id: 3,
    client: "Droguería San Luis",
    pickup: "San Alonso",
    delivery: "Real de Minas",
    icon: "store",
  },
];

export default function AvailableShipments() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  function handleViewDetail(shipmentId: number) {
    console.log("Ver domicilio:", shipmentId);

    /*
      Más adelante aquí navegaremos a:

      /domicilios/[id]

      Por ahora solo estamos maquetando.
    */
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
          <Text style={styles.title}>
            Domicilios disponibles
          </Text>

          <Text style={styles.subtitle}>
            Servicios que puedes tomar ahora
          </Text>
        </View>

        {/* Lista */}

        <View style={styles.shipmentsList}>
          {availableShipments.map((shipment) => (
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
                style={styles.detailButton}
                onPress={() =>
                  handleViewDetail(shipment.id)
                }
                activeOpacity={0.85}
              >
                <Text style={styles.detailButtonText}>
                  Ver detalle
                </Text>

                <Feather
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          ))}
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

  detailButton: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    marginTop: 12,

    borderRadius: 11,

    backgroundColor: "#1685f8",
  },

  detailButtonText: {
    color: "#ffffff",

    fontSize: 17,
    fontWeight: "800",
  },
});