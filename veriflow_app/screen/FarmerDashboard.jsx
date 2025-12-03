import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function FarmerDashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Farmer Dashboard</Text>
      <Text style={styles.subHeader}>Blue Carbon MRV • Field Operator</Text>

      {/* SECTION: Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AddPlot")}
        >
          <Text style={styles.cardTitle}> Add New Plot</Text>
          <Text style={styles.cardDesc}>Create a new mangrove plot entry.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("RecordData")}
        >
          <Text style={styles.cardTitle}>Record Field Data</Text>
          <Text style={styles.cardDesc}>
            Add tree measurements, biomass, soil samples etc.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("UploadGeoTag")}
        >
          <Text style={styles.cardTitle}>Upload Geo-Tagged Photos</Text>
          <Text style={styles.cardDesc}>
            Capture images with GPS for verification.
          </Text>
        </TouchableOpacity>
      </View>

      {/* SECTION: Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports & History</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MyPlots")}
        >
          <Text style={styles.cardTitle}>My Plots</Text>
          <Text style={styles.cardDesc}>View all registered plots.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Activity")}
        >
          <Text style={styles.cardTitle}>Activity History</Text>
          <Text style={styles.cardDesc}>
            All submissions, updates, and verifications.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f8fafc",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1e3a8a",
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 15,
    color: "#475569",
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e40af",
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 4,
    color: "#475569",
  },
});

