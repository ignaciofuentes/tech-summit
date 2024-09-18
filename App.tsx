import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";

import outputs from "./amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react-native";
import { SignOutButton } from "./components/SignOutButton";
import SessionList from "./Sessions";

Amplify.configure(outputs);

export default function App() {
  return (
    <ThemeProvider
      theme={{
        overrides: [defaultDarkModeOverride],
      }}
      colorMode={"dark"}
    >
      <Authenticator.Provider>
        <Authenticator>
          <SafeAreaView style={styles.container}>
            <SignOutButton />
            <SessionList />
          </SafeAreaView>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
