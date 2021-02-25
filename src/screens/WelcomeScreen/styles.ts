import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: '40%',
    aspectRatio: 1,
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  header2: {
    fontSize: 20,
    textAlign: 'center',
    color: '#707070',
  },
  buttonContainer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  googleButton: {
    width: '70%',
    height: 70,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default styles;
