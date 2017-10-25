import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
  textIndex: {
  fontSize: 24,
  color: 'white',
  fontWeight: 'bold',
  alignSelf:'center',
  },
  imgIndex: {
  	width: '100%',
    height: '100%',
    justifyContent:'center'
  },
  formInput: {
  	width: 380,
  	height: 40,
    margin: 7,
    color: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainIndex: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 380,
    height: 60,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#f5fffa',
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5fffa'
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#222'
  },
})

export default styles