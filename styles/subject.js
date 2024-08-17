import { StyleSheet } from "react-native";

export const SbStyle = StyleSheet.create({
    container:{
        margin: 0,
        padding: 0,
        paddingTop: 20,
        flex: 1,
    },
    studentData:{
        position:'relative',
        margin: 10,
        paddingHorizontal: 10,
    },
    textGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    group:{
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    subjectN:{
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'italic',
        textAlign: 'center',
        fontFamily: 'noto-sans'
    },
    week:{
        padding: 10,
        height: 100,
        borderTopWidth: 0.5,
    },
    studentRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 0.5,
    },
    studentName: { 
        fontSize: 16 
    },
    presentButton: { 
        backgroundColor: '#00FF0A', 
        padding: 10, 
        borderRadius: 50,
        width: 90,
    },
    absentButton: { 
        backgroundColor: '#FF0000', 
        padding: 10, 
        width: 90,
        borderRadius: 50,
    },
    lateButton: { 
        backgroundColor: '#CCFF00', 
        padding: 10, 
        borderRadius: 50,
        width: 90,
    },
    buttonText: { 
        color: '#000', 
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'noto-sans',
        fontWeight: 'bold'
    },
    dateBtn:{
        position: 'relative',
        borderWidth: 1,
        padding: 5,
        width: 175,
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 15,
    },
    backButton:{
      position: 'relative',
      borderWidth: 1,
      padding: 5,
      marginHorizontal: 10,
      width: 175,
      backgroundColor: '#0F6CBF',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#000',
      borderRadius: 15,
    },
    backBtnText:{
      color: '#fff', 
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'noto-sans',
      fontWeight: 'bold'
    },
    infoBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    infoText: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },
    infoLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    },
    labelText: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    separator: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    main: {
        flex: 2,
        paddingHorizontal: 5,
        position: 'relative',
    },
    studentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingVertical: 10,
        borderBottomWidth: 1,
        paddingRight: 10,
        borderBottomColor: 'lightgray',
        margin: 5,
    },
    studentName: {
        fontSize: 16,
        width: '50%',
        margin: 5,
    },
});
