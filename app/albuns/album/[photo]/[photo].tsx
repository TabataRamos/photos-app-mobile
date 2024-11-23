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

export default function Photo() {
  const [photo, setPhoto] = useState<PhotosType>();
  const { photo: photoId, userName } = useLocalSearchParams();

  console.log(photo, userName);

  useEffect(() => {
    if (!photoId) return;
    fetch(`https://jsonplaceholder.typicode.com/photos?id=${photoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data))
      .catch((error) => console.error("Erro ao buscar foto:", error));
  }, [photoId]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.header}>{photo?.title}</Text>
        <Text style={styles.header}>{userName}</Text>
      </View>
      <Image source={{ uri: photo?.url }} />
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
    // paddingVertical: 10,
  },
  // squares: {
  //   position: "relative",
  //   height: 160,
  // },
  square: {
    width: 150,
    height: 150,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    // borderColor: "black",
    // borderWidth: 2,
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
