import React from "react";
import { StyleSheet } from "react-native";
import {
  Text,
} from "native-base";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text bold italic color="danger.400" style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default ErrorMessage;
