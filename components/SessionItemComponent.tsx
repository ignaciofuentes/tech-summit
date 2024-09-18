import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons

import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
import type { Schema } from "../amplify/data/resource";

export const SessionItem = (session: Schema["Session"]["type"]) => {
  var calculatedAverage: string | number = "No ratings yet";
  if (session.ratings!.length > 0) {
    calculatedAverage =
      session.ratings!.reduce((a, b) => a! + b!)! / session.ratings!.length;
  }
  const averageRating = calculatedAverage;

  return (
    <View style={styles.sessionCard}>
      {/* Session Image */}
      <Image
        source={{ uri: session.image! }}
        style={styles.sessionImage}
        resizeMode="cover"
      />

      {/* Session Details */}
      <View style={styles.sessionDetails}>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        <Text style={styles.sessionContent}>{session.content}</Text>

        {/* Display the Average Rating */}
        <Text style={styles.ratingText}>Average Rating: {averageRating}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={() => {
              Alert.prompt(
                "Rating",
                "Enter your new rating for this session",
                [
                  { text: "Cancel", style: "destructive", onPress: () => {} },
                  {
                    text: "Submit",
                    onPress: (rating) => {
                      session.ratings!.push(parseFloat(rating!));
                      console.log(session.ratings);
                      console.log(session.ratings);
                      client.models.Session.update({
                        id: session.id,
                        ratings: session.ratings,
                      });
                    },
                  },
                ],
                "plain-text"
              );
            }}
          >
            <Text style={styles.actionButtonText}>Rate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={async () => {
          await client.models.Session.delete(session);
        }}
      >
        <Icon name="delete" size={24} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionCard: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    //backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
  },
  sessionImage: {
    flex: 3,
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sessionDetails: {
    flex: 6,
    marginHorizontal: 16,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  sessionContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButton: {
    flex: 1,
  },
});
