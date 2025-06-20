import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Button,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert('Refresh failed');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    const isFav = wishlist.some(p => p.id === item.id);

    return (
      <View style={styles.card}>
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.heart}
            onPress={() => wishlistDispatch({ type: 'TOGGLE_WISHLIST', payload: item })}
          >
            <AntDesign name={isFav ? 'heart' : 'hearto'} size={22} color="#8A2BE2" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{Math.round(item.price * 83)}</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="View Details"
              color="#9370DB"
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Add to Cart"
              color="#8A2BE2"
              onPress={() => {
                cartDispatch({ type: 'ADD_TO_CART', payload: item });
                showMessage('Added to cart');
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} color="#9370DB" />;
  }

  return (
    <LinearGradient colors={['#E6E6FA', '#D8BFD8', '#E0BBE4']} style={{ flex: 1 }}>
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#9370DB" />
        }
        contentContainerStyle={{ padding: 10 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    height: 160,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082', // Indigo
    marginBottom: 4,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8A2BE2', // BlueViolet
    marginBottom: 8,
  },
  toast: {
    position: 'absolute',
    top: 10,
    left: '10%',
    right: '10%',
    backgroundColor: '#9370DB', // Medium Purple
    padding: 12,
    borderRadius: 10,
    zIndex: 999,
    alignItems: 'center',
    elevation: 6,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  buttonWrapper: {
    flex: 1,
    marginRight: 8,
  },
});

export default HomeScreen;
