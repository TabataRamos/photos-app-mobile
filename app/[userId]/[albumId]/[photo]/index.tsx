import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface PhotosType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function Photo() {
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState<PhotosType | null>(null);
  const { photo: photoId, userName } = useLocalSearchParams();

  useEffect(() => {
    if (!photoId) return;

    setPhoto(null);

    fetch(`https://jsonplaceholder.typicode.com/photos?id=${photoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data[0]))
      .catch((error) => console.error("Erro ao buscar foto:", error));
  }, [photoId]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={[styles.header, styles.title]}>{photo?.title}</Text>
        <Text style={styles.header}>{userName}</Text>
      </View>

      <Image
        source={{ uri: photo?.url }}
        onLoad={() => setIsLoading(false)}
        style={{ height: 600, resizeMode: "cover", borderRadius: 15 }}
      />
      {isLoading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 300,
            backgroundColor: "#ededed",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Carregando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  header: {
    color: "#F0F0F0",
    fontSize: 16,
  },
  title: {
    maxWidth: "60%",
  },

  loading: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});
