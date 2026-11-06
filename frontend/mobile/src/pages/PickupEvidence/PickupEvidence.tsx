import { useRef, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { CameraView, useCameraPermissions } from "expo-camera";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type PickUpEvidenceProps = {
  shipmentId: number;
};

export default function PickUpEvidence({ shipmentId }: PickUpEvidenceProps) {
  const router = useRouter();

  const cameraRef = useRef<CameraView | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [cameraReady, setCameraReady] = useState(false);

  const [takingPicture, setTakingPicture] = useState(false);

  async function takePhoto() {
    if (!cameraRef.current || !cameraReady || takingPicture) {
      return;
    }

    try {
      setTakingPicture(true);

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

      if (photo?.uri) {
        setPhotoUri(photo.uri);
      }
    } catch (error) {
      console.error("Error al tomar la fotografía:", error);
    } finally {
      setTakingPicture(false);
    }
  }

  function retakePhoto() {
    setPhotoUri(null);
  }

  function confirmPickup() {
    if (!photoUri) {
      return;
    }

    /*
      Más adelante aquí enviaremos:
      - shipmentId
      - foto
      - tipo: RECOGIDA

      al backend FastAPI.

      Por ahora simulamos que el estado
      cambia a RECOGIDO.
    */

    console.log({
      shipmentId,
      evidenceType: "RECOGIDA",
      photoUri,
    });

    router.replace({
      pathname: "/domicilios/[id]",
      params: {
        id: shipmentId.toString(),
        status: "RECOGIDO",
      },
    });
  }

  //   Mientras expo verifica el permiso

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.loadingText}>
          Verificando permisos de cámara...
        </Text>
      </SafeAreaView>
    );
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.loadingText}>
          Verificando permisos de cámara...
        </Text>
      </SafeAreaView>
    );
  }

  /*
    Si todavía no tenemos permiso
  */

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIcon}>
            <Feather name="camera" size={38} color="#1685f8" />
          </View>

          <Text style={styles.permissionTitle}>Permiso de cámara</Text>

          <Text style={styles.permissionDescription}>
            SendBox necesita acceso a la cámara para registrar la evidencia de
            recogida.
          </Text>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Permitir cámara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelPermissionButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelPermissionButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={28} color="#102846" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Registrar recogida</Text>

        <View style={styles.headerSpace} />
      </View>

      {/* =============================
          SI TODAVÍA NO HAY FOTO
          ============================= */}

      {!photoUri ? (
        <View style={styles.content}>
          <View style={styles.information}>
            <Text style={styles.title}>Evidencia de recogida</Text>

            <Text style={styles.description}>
              Toma una fotografía que evidencie la recogida del domicilio.
            </Text>
          </View>

          {/* CÁMARA */}

          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              mode="picture"
              onCameraReady={() => setCameraReady(true)}
            />

            {/* Guía visual */}

            <View style={styles.cameraGuide}>
              <View style={styles.guideCornerTopLeft} />
              <View style={styles.guideCornerTopRight} />
              <View style={styles.guideCornerBottomLeft} />
              <View style={styles.guideCornerBottomRight} />
            </View>
          </View>

          <Text style={styles.cameraHelp}>
            Procura que la evidencia sea clara y visible.
          </Text>

          {/* BOTÓN DE CÁMARA */}

          <TouchableOpacity
            style={[
              styles.captureButton,
              (!cameraReady || takingPicture) && styles.buttonDisabled,
            ]}
            onPress={takePhoto}
            disabled={!cameraReady || takingPicture}
            activeOpacity={0.85}
          >
            <Feather name="camera" size={23} color="#ffffff" />

            <Text style={styles.captureButtonText}>
              {takingPicture ? "Tomando foto..." : "Tomar fotografía"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* =============================
           PREVISUALIZACIÓN
           ============================= */

        <View style={styles.content}>
          <View style={styles.information}>
            <Text style={styles.title}>Revisar evidencia</Text>

            <Text style={styles.description}>
              Verifica que la fotografía sea clara antes de confirmar la
              recogida.
            </Text>
          </View>

          <View style={styles.previewContainer}>
            <Image
              source={{ uri: photoUri }}
              style={styles.preview}
              resizeMode="cover"
            />

            <View style={styles.previewBadge}>
              <Feather name="check" size={17} color="#0b9955" />

              <Text style={styles.previewBadgeText}>Fotografía tomada</Text>
            </View>
          </View>

          {/* REPETIR */}

          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <Feather name="refresh-cw" size={20} color="#1685f8" />

            <Text style={styles.retakeButtonText}>Repetir fotografía</Text>
          </TouchableOpacity>

          {/* CONFIRMAR */}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmPickup}
            activeOpacity={0.85}
          >
            <Feather name="check-circle" size={22} color="#ffffff" />

            <Text style={styles.confirmButtonText}>Confirmar recogida</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fd",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f3f8fd",
  },

  loadingText: {
    color: "#71829b",
    fontSize: 15,
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

  backButton: {
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

  /* CONTENIDO */

  content: {
    flex: 1,

    padding: 18,
  },

  information: {
    marginBottom: 20,
  },

  title: {
    marginBottom: 6,

    color: "#102846",

    fontSize: 25,
    fontWeight: "800",
  },

  description: {
    color: "#71829b",

    fontSize: 14,
    lineHeight: 21,
  },

  /* CÁMARA */

  cameraContainer: {
    flex: 1,

    position: "relative",

    minHeight: 350,

    overflow: "hidden",

    borderRadius: 20,

    backgroundColor: "#0c1725",
  },

  camera: {
    flex: 1,
  },

  cameraGuide: {
    position: "absolute",

    top: 28,
    right: 28,
    bottom: 28,
    left: 28,
  },

  guideCornerTopLeft: {
    position: "absolute",

    top: 0,
    left: 0,

    width: 35,
    height: 35,

    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#ffffff",
  },

  guideCornerTopRight: {
    position: "absolute",

    top: 0,
    right: 0,

    width: 35,
    height: 35,

    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#ffffff",
  },

  guideCornerBottomLeft: {
    position: "absolute",

    bottom: 0,
    left: 0,

    width: 35,
    height: 35,

    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#ffffff",
  },

  guideCornerBottomRight: {
    position: "absolute",

    right: 0,
    bottom: 0,

    width: 35,
    height: 35,

    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#ffffff",
  },

  cameraHelp: {
    marginVertical: 14,

    color: "#71829b",

    fontSize: 13,
    textAlign: "center",
  },

  /* TOMAR FOTO */

  captureButton: {
    height: 55,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,

    borderRadius: 12,

    backgroundColor: "#1685f8",
  },

  captureButtonText: {
    color: "#ffffff",

    fontSize: 16,
    fontWeight: "800",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  /* PREVIEW */

  previewContainer: {
    flex: 1,

    position: "relative",

    minHeight: 350,

    overflow: "hidden",

    borderRadius: 20,

    backgroundColor: "#dce7f2",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  previewBadge: {
    position: "absolute",

    top: 14,
    right: 14,

    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 11,
    paddingVertical: 8,

    borderRadius: 20,

    backgroundColor: "#e4f8ee",
  },

  previewBadgeText: {
    color: "#0b9955",

    fontSize: 12,
    fontWeight: "700",
  },

  /* REPETIR */

  retakeButton: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,

    marginTop: 15,

    borderWidth: 1,
    borderColor: "#bcd6ee",
    borderRadius: 12,

    backgroundColor: "#ffffff",
  },

  retakeButtonText: {
    color: "#1685f8",

    fontSize: 15,
    fontWeight: "700",
  },

  /* CONFIRMAR */

  confirmButton: {
    height: 55,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,

    marginTop: 10,

    borderRadius: 12,

    backgroundColor: "#1685f8",
  },

  confirmButtonText: {
    color: "#ffffff",

    fontSize: 16,
    fontWeight: "800",
  },

  /* PERMISOS */

  permissionContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    padding: 24,

    backgroundColor: "#f3f8fd",
  },

  permissionCard: {
    width: "100%",

    alignItems: "center",

    padding: 26,

    borderRadius: 20,

    backgroundColor: "#ffffff",

    elevation: 4,
  },

  permissionIcon: {
    width: 70,
    height: 70,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 18,

    borderRadius: 35,

    backgroundColor: "#e8f4ff",
  },

  permissionTitle: {
    marginBottom: 8,

    color: "#102846",

    fontSize: 22,
    fontWeight: "800",
  },

  permissionDescription: {
    marginBottom: 22,

    color: "#71829b",

    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  permissionButton: {
    width: "100%",
    height: 52,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 11,

    backgroundColor: "#1685f8",
  },

  permissionButtonText: {
    color: "#ffffff",

    fontSize: 15,
    fontWeight: "800",
  },

  cancelPermissionButton: {
    width: "100%",
    height: 48,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 8,
  },

  cancelPermissionButtonText: {
    color: "#71829b",

    fontSize: 14,
    fontWeight: "600",
  },
});
