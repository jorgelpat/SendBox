import { useEffect, useRef } from "react";

import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activePage: "disponibles" | "mis-domicilios";
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const MENU_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

export default function SideMenu({
  isOpen,
  onClose,
  activePage,
}: SideMenuProps) {
  const router = useRouter();

  const translateX = useRef(
    new Animated.Value(-MENU_WIDTH)
  ).current;

  const overlayOpacity = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -MENU_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),

      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, translateX, overlayOpacity]);

  function goToAvailable() {
    onClose();
    router.push("/disponibles");
  }

  function goToMyShipments() {
    onClose();
    router.push("/mis-domicilios");
  }

  function handleLogout() {
    onClose();

    /*
      Más adelante aquí también podemos
      eliminar token/sesión.
    */

    router.replace("/");
  }

  return (
    <View
      style={styles.container}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      {/* Fondo oscuro */}

      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      >
        <Pressable
          style={styles.overlayPressable}
          onPress={onClose}
        />
      </Animated.View>

      {/* Menú lateral */}

      <Animated.View
        style={[
          styles.menu,
          {
            width: MENU_WIDTH,
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      >
        {/* Encabezado */}

        <View style={styles.header}>
          <View style={styles.brand}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={38}
              color="#1476f8"
            />

            <View style={styles.brandTextContainer}>
              <Text style={styles.brandDark}>
                Send
              </Text>

              <Text style={styles.brandBlue}>
                Box
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Feather
              name="x"
              size={26}
              color="#16304f"
            />
          </TouchableOpacity>
        </View>

        {/* Navegación */}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              activePage === "disponibles" &&
                styles.menuItemActive,
            ]}
            onPress={goToAvailable}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={25}
              color={
                activePage === "disponibles"
                  ? "#1476f8"
                  : "#536783"
              }
            />

            <Text
              style={[
                styles.menuItemText,
                activePage === "disponibles" &&
                  styles.menuItemTextActive,
              ]}
            >
              Disponibles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              activePage === "mis-domicilios" &&
                styles.menuItemActive,
            ]}
            onPress={goToMyShipments}
            activeOpacity={0.8}
          >
            <Feather
              name="clipboard"
              size={25}
              color={
                activePage === "mis-domicilios"
                  ? "#1476f8"
                  : "#536783"
              }
            />

            <Text
              style={[
                styles.menuItemText,
                activePage === "mis-domicilios" &&
                  styles.menuItemTextActive,
              ]}
            >
              Mis domicilios
            </Text>
          </TouchableOpacity>
        </View>

        {/* Parte inferior */}

        <View style={styles.bottom}>
          <View style={styles.divider} />

          <View style={styles.user}>
            <View style={styles.avatar}>
              <Feather
                name="user"
                size={24}
                color="#1476f8"
              />
            </View>

            <View>
              <Text style={styles.userName}>
                Juan Pérez
              </Text>

              <Text style={styles.userRole}>
                Mensajero
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.logout}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Feather
              name="log-out"
              size={24}
              color="#ef4444"
            />

            <Text style={styles.logoutText}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
},

  /* =========================
     FONDO OSCURO
     ========================= */

  overlay: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backgroundColor: "rgba(7, 19, 35, 0.55)",
},

  overlayPressable: {
    flex: 1,
  },

  /* =========================
     MENÚ
     ========================= */

  menu: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,

    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: 25,

    backgroundColor: "#ffffff",

    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 15,
  },

  /* =========================
     HEADER
     ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 38,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  brandTextContainer: {
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

  closeButton: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,

    backgroundColor: "#edf5ff",
  },

  /* =========================
     NAVEGACIÓN
     ========================= */

  navigation: {
    gap: 8,
  },

  menuItem: {
    height: 58,

    flexDirection: "row",
    alignItems: "center",

    gap: 16,

    paddingHorizontal: 16,

    borderRadius: 12,
  },

  menuItemActive: {
    backgroundColor: "#eaf4ff",
  },

  menuItemText: {
    color: "#243b5a",

    fontSize: 17,
    fontWeight: "600",
  },

  menuItemTextActive: {
    color: "#1476f8",
  },

  /* =========================
     PARTE INFERIOR
     ========================= */

  bottom: {
    marginTop: "auto",
  },

  divider: {
    height: 1,

    marginVertical: 15,

    backgroundColor: "#e1e8f0",
  },

  user: {
    flexDirection: "row",
    alignItems: "center",

    gap: 13,

    paddingHorizontal: 5,
  },

  avatar: {
    width: 46,
    height: 46,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 23,

    backgroundColor: "#eaf4ff",
  },

  userName: {
    marginBottom: 3,

    color: "#102846",

    fontSize: 16,
    fontWeight: "700",
  },

  userRole: {
    color: "#6f819b",

    fontSize: 14,
  },

  /* =========================
     LOGOUT
     ========================= */

  logout: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    gap: 14,

    paddingHorizontal: 10,

    borderRadius: 10,
  },

  logoutText: {
    color: "#ef4444",

    fontSize: 16,
    fontWeight: "600",
  },
});