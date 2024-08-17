import { faBorderTopLeft } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";
export const headerStyle = StyleSheet.create({
container:{
    margin: 0,
    padding: 0,
    paddingTop: 10,
    flex: 1,
    fontFamily: 'oswald',

},
header:{
    position: 'fixed',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 5,
    left: 0,
    display: 'flex',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: '#0F6CBF',
    alignItems: 'baseline',
    width: '100%',
},
circle: {
    width: 35,
    height: 35,
    left: 20,
    position: 'relative',
    borderRadius: 40, 
    alignSelf: 'center',
    display: 'flex',
    overflow: 'hidden',
  },
  headerText:{
    fontWeight: '700',
    marginLeft: 10,
    display: 'flex',
    fontSize: 13,
    color: 'black',
    alignSelf: 'center',
    left: 20,
    fontFamily: 'noto-sans',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  about:{
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  barcode:{
    display: 'flex',
  },

});
