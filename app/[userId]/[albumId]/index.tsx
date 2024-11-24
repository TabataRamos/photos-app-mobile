import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";

interface PhotosType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function Album() {
  const [photos, setPhotos] = useState<PhotosType[]>([]);
  const { albumId, userName, userId } = useLocalSearchParams();

  useEffect(() => {
    if (!albumId) return;
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Erro ao buscar álbuns:", error));
  }, [albumId]);

  return (
    <View>
      <View style={styles.flex}>
        <Text style={styles.header}>galeria de fotos</Text>
        <Text style={styles.header}>{userName}</Text>
      </View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Link
            push
            key={item.id}
            href={{
              pathname: "/[userId]/[albumId]/[photo]",
              params: {
                userId: userId as string,
                userName: userName,
                albumId: item.albumId,
                photo: item.id,
              },
            }}
          >
            <View style={styles.album}>
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.square}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
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
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
  },
  album: {
    width: 150,
  },
  list: {
    paddingBottom: 50,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
