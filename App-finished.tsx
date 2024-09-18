import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { SignOutButton } from "./components/SignOutButton";
import { useColorScheme } from "react-native";
import { Authenticator } from "@aws-amplify/ui-react-native";
import {
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react-native";

import SessionList from "./Sessions";
import outputs from "./amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

const App = () => {
  const colorMode = useColorScheme();
  console.log(colorMode);
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

export default App;
