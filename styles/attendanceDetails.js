import { StyleSheet } from "react-native";
export const ATStyle = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: 20,
    flex: 1,
  },
  subjectData:{
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 20,
    margin: 10,
  },
  name:{
    fontSize: 18,
    fontFamily: 'noto-sans',
    marginRight: 10, 
    flex: 1,
  },
  teacher:{
    fontSize: 16,
    fontFamily: 'noto-sans',
  },
  main:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 10
  },
  mainText:{
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'noto-sans',
    flex: 1, 
    textAlign: 'center'
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  },
  attendanceData: {
    fontSize: 16,
    fontFamily: 'noto-sans',
    flex: 1, 
    textAlign: 'center'
  },
  maxAttendance:{ 
    position: 'relative',
    marginTop: 20, 
    padding: 10 
},
maxAttendanceText:{
    fontSize: 16, 
    fontWeight: 'bold'
 },
 backBtn:{
    marginVertical: 20,
    alignItems: 'center',
    width: 350,
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#D9534F',
    borderRadius: 10,
    justifyContent: 'center',
 },
 backBtnText:{
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
 }
});
