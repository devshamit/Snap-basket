import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../../context/CartContext';
import { AntDesign } from '@expo/vector-icons';

const CartScreen = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    showMessage('Removed from cart');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity * 83, 0)
      .toFixed(0); // INR conversion
  };

  return (
    <View style={styles.container}>
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.price}>
                      ₹ {(item.price * 83).toFixed(0)} x {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemove(item.id)}
                      style={styles.removeBtn}
                    >
                      <AntDesign name="delete" size={18} color="#fff" />
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <Text style={styles.total}>Total: ₹ {getTotalPrice()}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // lavender background
  },
  toast: {
    position: 'absolute',
    top: 10,
    left: '10%',
    right: '10%',
    backgroundColor: '#BA55D3', // medium orchid
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
  emptyText: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#6A5ACD', // slate blue
  },
  card: {
    backgroundColor: '#D8BFD8', // thistle
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#f3f3f3',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082', // indigo
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    color: '#8A2BE2', // blue violet
    marginBottom: 10,
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DA70D6', // orchid
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  removeBtnText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'right',
    color: '#4B0082',
    backgroundColor: '#EEE6FF', // soft lavender
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default CartScreen;
