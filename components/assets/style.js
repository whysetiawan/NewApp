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
  multiFormInput: {
    width: 380,
    height: 190,
    margin: 7,
    color: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
  },
  containerCenter: {
    alignItems:'center',
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
  buttonEnd: {
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
    fontSize: 18,
    fontWeight: '500',
    color: '#222'
  },
  normalText : {
    color: '#000000',
    marginBottom: 10,
    fontSize: 14
  },
  profileDivider: {
    margin: 20,
    marginBottom: 0,
    flexDirection:'row', 
    justifyContent:'space-between'
  }
})

export default styles