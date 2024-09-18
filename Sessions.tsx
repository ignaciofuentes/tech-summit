import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "./amplify/data/resource";
import { SessionItem } from "./components/SessionItemComponent";

const client = generateClient<Schema>();

const SessionList = () => {
  const [sessions, setSessions] = useState<Schema["Session"]["type"][]>([]);

  const createSession = async () => {
    try {
      await client.models.Session.create(
        new Date().getMilliseconds() % 2 == 0 ? sampleSession : sampleSession2
      );
    } catch (error: unknown) {
      alert("fail to create");
    }
  };

  useEffect(() => {
    const sub = client.models.Session.observeQuery().subscribe({
      next: (thing) => {
        var myItems = thing.items;
        setSessions([...myItems]);
      },
      error: (e) => {
        console.log(e);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Schema["Session"]["type"] }) => {
    return <SessionItem {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No sessions available.</Text>
        )}
        style={styles.listContainer}
      />
      <TouchableOpacity style={styles.createButton} onPress={createSession}>
        <Text style={styles.createButtonText}>+ Create New Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const sampleSession = {
  ratings: [],
  image:
    "https://media.licdn.com/dms/image/v2/C4E03AQHHcqvlwtquAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1532482695425?e=1732147200&v=beta&t=9hr3TFUPuiSyKqEIcPsf4NgZjg57PVOQwDr1iceh4LA",
  content: `In this session we will cover how you can create mobile apps with Amplify Gen 2`,
  title: "Accelerate Web And Mobile App Dev with Amplify Gen 2",
};

const sampleSession2 = {
  ratings: [],
  image:
    "https://media.licdn.com/dms/image/v2/C5603AQFnwRTNy-wrPA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1649728308197?e=1732147200&v=beta&t=Fd1Fbohi_WVzyu_fa-MwclEnvjbqCW4E5EHuZP13fKA",
  content: `Welcome to the AWS NAMER Tech kickoff session! Join our AGS leaders as they dive into AWS's global and regional priorities, understanding how they align with our business objectives and your pivotal role in our strategic plan. Our focus is to ignite your enthusiasm and empower you to innovate, ensuring we deliver exceptional solutions for our customers. This session is designed to set the foundation for a transformative week of learning, equipping you to address challenges, seize opportunities, and drive outstanding results. Let’s embark on this exciting path together, making a significant impact both locally and globally.`,
  title: "NAMER Wide Keynote with the AGS Leadership Team",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listItemSeparator: {
    height: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999",
  },
  createButton: {
    backgroundColor: "#28a745",
    padding: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SessionList;
