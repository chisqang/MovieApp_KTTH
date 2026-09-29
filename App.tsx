import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  FlatList,
  RefreshControl,
  Alert,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MovieCard from './components/MovieCard';

const API_URL = 'https://6abb6dbab2118ed7abb895f5.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isTitle, setIsTitle] = useState(false);

  const fetchMovies = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleSelect = (id: any) => {
    const movie = movies.find((m) => m.id === id);
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Dạng lưới</Text>
            <Switch value={isTitle} onValueChange={setIsTitle} />
          </View>
        </View>

        <View key={isTitle ? '2' : '1'}>
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: any) => (
              <View style={isTitle ? { flex: 1, margin: 5 } : {}}>
                <MovieCard
                  movie={item}
                  layout={isTitle ? 'tile' : 'row'}
                  onSelect={handleSelect}
                />
              </View>
            )}
            numColumns={isTitle ? 2 : 1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ padding: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
