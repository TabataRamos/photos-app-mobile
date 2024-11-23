import User from "@/components/user";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

interface UserType {
  id: number;
  name: string;
}

export default function Index() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Galeria</Text>
      <Text style={styles.title}>usuários</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="quem procura?"
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Link
            key={item.id}
            href={{
              pathname: "/albuns/[userId]",
              params: { userId: item.id },
            }}
          >
            <User user={item} />
          </Link>
        )}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    color: "#F0F0F0",
    fontSize: 24,
    fontWeight: "100",
    fontStyle: "italic",
    letterSpacing: 3,
    textAlign: "right",
    textTransform: "uppercase",
  },
  title: {
    color: "#F0F0F0",
    fontSize: 16,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 30,
    height: 40,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
