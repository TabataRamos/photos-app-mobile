import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface PhotosType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function Album({
  albumId,
  text,
}: {
  albumId: number;
  text: string;
}) {
  const [photos, setPhotos] = useState<PhotosType[]>([]);

  useEffect(() => {
    if (!albumId) return;
    fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=3`
    )
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Erro ao buscar fotos:", error));
  }, [albumId]);

  return (
    <View style={styles.album}>
      <View style={styles.squares}>
        <Image
          source={{ uri: photos[0]?.thumbnailUrl }}
          style={[styles.square]}
        />
        <Image
          source={{ uri: photos[1]?.thumbnailUrl }}
          style={[styles.square, styles.second]}
        />
        <Image
          source={{ uri: photos[2]?.thumbnailUrl }}
          style={[styles.square, styles.third]}
        />
      </View>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
