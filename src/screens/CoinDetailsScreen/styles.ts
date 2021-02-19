import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
    width: '100%',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symbol: {
    color: '#6b6b6b',
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  valueContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  label: {
    color: '#545454',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
  },

  button: {
    flex: 1,
    margin: 5,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default styles;
