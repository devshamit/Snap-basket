import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import { CartContext } from '../../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { dispatch } = useContext(CartContext);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const fetchRelated = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
      const data = await res.json();
      const filtered = data.filter(p => p.id !== product.id);
      setRelatedProducts(filtered.slice(0, 5));
    } catch (err) {
      console.error('Failed to load recommendations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelated();
  }, []);

  const renderRecommendation = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.push('ProductDetail', { product: item })}
      style={styles.recommendCard}
    >
      <Image source={{ uri: item.image }} style={styles.recommendImage} />
      <Text numberOfLines={1} style={styles.recommendTitle}>{item.title}</Text>
      <Text style={styles.recommendPrice}>₹{(item.price * 83).toFixed(0)}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#E6E6FA', '#D8BFD8', '#E0BBE4']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {message !== '' && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{message}</Text>
          </View>
        )}

        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Price: ₹{(product.price * 83).toFixed(0)}</Text>
        <Text style={styles.rating}>
          Rating: ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </Text>

        <View style={styles.buttonWrapper}>
          <Button
            title="Add to Cart"
            color="#8A2BE2"
            onPress={() => {
              dispatch({ type: 'ADD_TO_CART', payload: product });
              showMessage('Added to cart');
            }}
          />
        </View>

        <Text style={styles.recommendHeading}>You may also like</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#8A2BE2" />
        ) : (
          <FlatList
            data={relatedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecommendation}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  image: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 6,
  },
  category: {
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 6,
    color: '#6A5ACD',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4B0082',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
    color: '#6A5ACD',
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  recommendHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B0082',
  },
  recommendCard: {
    width: 140,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#f5e6ff',
    padding: 10,
    alignItems: 'center',
  },
  recommendImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  recommendTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#4B0082',
  },
  recommendPrice: {
    fontSize: 14,
    color: '#8A2BE2',
    marginTop: 3,
  },
  toast: {
    backgroundColor: '#9370DB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetail;
