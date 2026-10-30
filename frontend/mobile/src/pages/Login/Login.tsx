import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    console.log({
      document,
      password,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.brandContainer}>
            <MaterialCommunityIcons
                name="package-variant-closed"
                size={70}
                color="#1476f8"
            />

            <View style={styles.brandName}>
                <Text style={styles.brandDark}>
                    Send
                </Text>

                <Text style={styles.brandBlue}>
                    Box
                </Text>
            </View>

            <Text style={styles.tagline}>
                Gestión de domicilios,
            </Text>

            <Text style={styles.tagline}>
                mas cerca de tus clientes
            </Text>
        </View>

        {/* Formulario */}
        <View style={styles.loginCard}>
            <Text style={styles.title}>
                Iniciar sesión
            </Text>

            <Text style={styles.subtitle}>
                Ingresa tus datos para continuar
            </Text>

            {/* Documento */}
            <View style={styles.field}>
                <Text style={styles.label}>
                    Documento
                </Text>

                <View style={styles.inputContainer}>
                    <Feather
                        name="user"
                        size={22}
                        color="#7587a1"
                    />

                    <TextInput
                        style={styles.input}
                        value={document}
                        onChangeText={setDocument}
                        placeholder="Número de documento"
                        placeholderTextColor="#8b9ab0"
                        keyboardType="numeric"
                    />
                </View>
            </View>
            
            {/* Contraseña */}
            <View style={styles.field}>
                <Text style={styles.label}>
                    Contraseña
                </Text>

                <View style={styles.inputContainer}>
                    <Feather
                        name="lock"
                        size={22}
                        color="#7587a1"
                    />

                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        placeholderTextColor="#8b9ab0"
                        secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity
                        onPress={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        <Feather
                            name={showPassword ? "eye" : "eye-off"}
                            size={22}
                            color="#7587a1"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Boton */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>
                    Iniciar sesión
                </Text>
                
                <Feather
                    name="arrow-right"
                    size={21}
                    color="#ffffff"
                />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: "#f4f9ff",
    },

    container: {
        flexGrow: 1,
        justifyContent: "center",

        paddingHorizontal: 22,
        paddingVertical: 40,

        backgroundColor: "#f4f9ff",
    },

    brandContainer: {
        alignItems: "center",
        marginBottom: 35,
    },

    brandName: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 8,
    },

    brandDark: {
        fontSize: 44,
        fontWeight: "800",
        color: "#102846",
    },

    brandBlue: {
        fontSize: 44,
        fontWeight: "800",
        color: "#1476f8"
    },

    tagline: {
        color: "#536783",
        fontSize: 16,
        lineHeight: 22,
        textAlign: "center",
    },

    loginCard: {
        width: "100%",

        padding: 22,

        borderRadius: 20,

        backgroundColor: "#ffffff",

        shadowColor: "#17385f",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.08,
        shadowRadius: 15,

        elevation: 5,
    },

    title: {
        marginBottom: 5,

        color: "#102846",

        fontSize: 29,
        fontWeight: "800",
    },

    subtitle: {
        marginBottom: 24,

        color: "#7487a3",

        fontSize: 16,
    },

    field: {
        marginBottom: 20,
    },

    label: {
        marginBottom: 8,

        color: "#102846",

        fontSize: 15,
        fontWeight: "700",
    },

    inputContainer: {
        height: 55,

        flexDirection: "row",
        alignItems: "center",

        gap: 11,

        paddingHorizontal: 15,

        borderWidth: 1,
        borderColor: "#cfdae8",
        borderRadius: 10,

        backgroundColor: "#ffffff",
    },

    input: {
        flex: 1,
        height: "100%",

        color: "#172b45",

        fontSize: 16,
    },

    loginButton: {
        height: 56,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 12,

        marginTop: 3,

        borderRadius: 10,

        backgroundColor: "#1476f8",
    },

    loginButtonText: {
        color: "#ffffff",

        fontSize: 17,
        fontWeight: "700",
    },
});
