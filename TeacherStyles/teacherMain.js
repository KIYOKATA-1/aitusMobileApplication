import { StyleSheet } from "react-native";

export const TMstyle = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: 20,
    flex: 1,
  },
  subjectItem: {
    width: 360,
    backgroundColor: '#FDFDFD',
    height: 80,
    borderColor: '#0F6CBF',
    borderWidth: 1,
    position: 'relative',
    left: 10,
    borderLeftWidth: 5,
    borderRadius: 10,
    paddingLeft: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: 20,
    elevation: 5,
    justifyContent: 'center',
    shadowRadius: 20,
  },
  subject: {
    position: 'relative',
    justifyContent: 'flex-start', // Выравнивание по левому краю
  },
  subjectText:{
    fontSize: 16,
    fontFamily: 'noto-sans'
  }
});
