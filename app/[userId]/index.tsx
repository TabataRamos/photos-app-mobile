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
  const { userId: id, userName } = useLocalSearchParams();
  const [albuns, setAlbuns] = useState<AlbumType[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then((response) => response.json())
      .then((data) => setAlbuns(data))
      .catch((error) => console.error("Erro ao buscar álbuns:", error));
  }, [id]);

  return (
    <View>
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
            push
            key={item.id}
            href={{
              pathname: "/[userId]/[albumId]",
              params: {
                albumId: item.id,
                userName: userName,
                userId: id as string,
              },
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
