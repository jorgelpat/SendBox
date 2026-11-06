import { useRef, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { CameraView, useCameraPermissions } from "expo-camera";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type DeliveryEvidenceProps = {
  shipmentId: number;
};

export default function DeliveryEvidence({
  shipmentId,
}: DeliveryEvidenceProps) {
  const router = useRouter();

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [observation, setObservation] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [takingPicture, setTakingPicture] = useState(false);

  async function takePhoto() {
    if (!cameraRef.current || !cameraReady || takingPicture) {
      return;
    }
    try {
      setTakingPicture(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

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

  function confirmDelivery() {
    if (!photoUri) {
      return;
    }

    /*
      Más adelante aquí enviaremos
      al backend:

      shipmentId
      tipo: ENTREGA
      foto
      observación opcional

      Y el backend cambiará el estado
      del domicilio a ENTREGADO.
    */

    console.log({
      shipmentId,
      evidenceType: "ENTREGA",
      photoUri,
      observation: observation.trim() || null,
    });

    router.replace({
      pathname: "/domicilios/[id]",
      params: {
        id: shipmentId.toString(),
        status: "ENTREGADO",
      },
    });
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
            entrega.
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

        <Text style={styles.headerTitle}>Registrar entrega</Text>

        <View style={styles.headerSpace} />
      </View>

      {!photoUri ? (
        /*
          ==========================
          CÁMARA
          ==========================
        */

        <View style={styles.content}>
          <View style={styles.information}>
            <Text style={styles.title}>Evidencia de entrega</Text>

            <Text style={styles.description}>
              Toma una fotografía que evidencie la entrega del domicilio.
            </Text>
          </View>

          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              mode="picture"
              onCameraReady={() => setCameraReady(true)}
            />

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
        /*
          ==========================
          PREVISUALIZACIÓN
          ==========================
        */

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.previewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.information}>
            <Text style={styles.title}>Revisar evidencia</Text>

            <Text style={styles.description}>
              Verifica la fotografía y agrega una observación si lo consideras
              necesario.
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

          {/* OBSERVACIÓN */}

          <View style={styles.observationSection}>
            <View style={styles.observationHeader}>
              <Text style={styles.observationLabel}>Observación</Text>

              <Text style={styles.optionalText}>Opcional</Text>
            </View>

            <TextInput
              style={styles.observationInput}
              value={observation}
              onChangeText={setObservation}
              placeholder="Ej. Entregado en portería..."
              placeholderTextColor="#91a0b3"
              multiline
              maxLength={300}
              textAlignVertical="top"
            />

            <Text style={styles.characterCount}>
              {observation.length} / 300
            </Text>
          </View>

          {/* REPETIR */}

          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <Feather name="refresh-cw" size={20} color="#1685f8" />

            <Text style={styles.retakeButtonText}>Repetir fotografía</Text>
          </TouchableOpacity>

          {/* CONFIRMAR */}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmDelivery}
            activeOpacity={0.85}
          >
            <Feather name="check-circle" size={22} color="#ffffff" />

            <Text style={styles.confirmButtonText}>Confirmar entrega</Text>
          </TouchableOpacity>
        </ScrollView>
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

  scroll: {
    flex: 1,
  },

  previewContent: {
    padding: 18,
    paddingBottom: 30,
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
    height: 350,

    position: "relative",

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

  /* OBSERVACIÓN */

  observationSection: {
    marginTop: 20,
  },

  observationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 8,
  },

  observationLabel: {
    color: "#102846",

    fontSize: 15,
    fontWeight: "700",
  },

  optionalText: {
    color: "#8292a7",

    fontSize: 12,
  },

  observationInput: {
    minHeight: 100,

    padding: 14,

    borderWidth: 1,
    borderColor: "#ccd9e7",
    borderRadius: 12,

    backgroundColor: "#ffffff",
    color: "#102846",

    fontSize: 14,
    lineHeight: 20,
  },

  characterCount: {
    marginTop: 5,

    color: "#91a0b3",

    fontSize: 11,
    textAlign: "right",
  },

  /* BOTONES */

  retakeButton: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,

    marginTop: 18,

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
