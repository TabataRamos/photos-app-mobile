import Album from "@/components/album";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

interface AlbumType {
  id: number;
  title: string;
  userId: number;
}

export default function Albuns() {
  const { userId: id } = useLocalSearchParams();
  const [albuns, setAlbuns] = useState<AlbumType[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then((response) => response.json())
      .then((data) => setAlbuns(data))
      .catch((error) => console.error("Erro ao buscar álbuns:", error));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUserName(data[0].name);
        }
      })
      .catch((error) => console.error("Erro ao buscar usuário:", error));
  }, [id]);

  console.log("TESTE:", id, userName);
  console.log(albuns);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.header}>galeria de albuns</Text>
        <Text style={styles.header}>{userName}</Text>
      </View>
      <FlatList
        data={albuns}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Link
            key={item.id}
            href={{
              pathname: "/albuns/album/[albumId]",
              params: { albumId: item.id, userName: userName },
            }}
          >
            <Album albumId={item.id} text={item.title} />
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
    // flex: 1,
  },
  flex: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  header: {
    color: "#F0F0F0",
    fontSize: 16,
    flexShrink: 1,
  },
  title: {
    color: "#F0F0F0",
    fontSize: 14,
    paddingVertical: 10,
  },
  squares: {
    position: "relative",
    height: 160,
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    position: "absolute",
    top: 0,
  },
  second: {
    right: -8,
    top: 8,
    zIndex: -1,
  },
  third: {
    right: -16,
    top: 16,
    zIndex: -2,
  },
  album: {
    width: 150,
  },
  list: {
    paddingBottom: 50,
    paddingRight: 15,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
