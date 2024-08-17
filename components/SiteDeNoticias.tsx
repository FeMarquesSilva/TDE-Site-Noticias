import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TextInput, View } from "react-native";
import axios from "axios";

type Article = {
    title: string;
    description: string;
    urlToImage: string;
    publishedAt: string;
};

const SiteDeNoticias = () => {
  const [noticias, setNoticias] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState<string>("");

  const buscarNoticias = useCallback(async (termo: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${termo}&apiKey=9c958bb211ba40f488bdce4d33957603`
      );
      setNoticias(response.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Buscar notícias por tema..."
        value={termoBusca}
        onChangeText={setTermoBusca}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 }}
      />
      <Button title="Buscar" onPress={() => buscarNoticias(termoBusca)} />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={noticias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 }}>
              <Image
                source={{ uri: item.urlToImage }}
                style={{ height: 200, marginBottom: 10, borderRadius: 5 }}
                resizeMode="cover"
              />
              <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>{item.title}</Text>
              <Text style={{ color: "#555", marginBottom: 10 }}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SiteDeNoticias;