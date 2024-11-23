import { View, Text, StyleSheet } from "react-native";

export default function User({ user }: { user: { name: string; id: number } }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.letter}>{user.name[0]}</Text>
      </View>
      <Text style={styles.text}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    width: 150,
  },
  text: {
    color: "#f0f0f0",
    textAlign: "center",
    padding: 15,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    color: "#262626",
    fontSize: 50,
  },
});
