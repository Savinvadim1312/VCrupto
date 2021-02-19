import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    height: 175,
    resizeMode: "contain",
  },

  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
    width: '100%',
  },
  userImage: {
    height: 100,
    width: 100,
    marginRight: 10,
    borderRadius: 50,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  symbol: {
    color: '#6b6b6b',
  },
});

export default styles;
