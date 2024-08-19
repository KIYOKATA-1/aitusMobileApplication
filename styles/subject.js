import { StyleSheet } from "react-native";

export const SbStyle = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#f4f4f4',
      },
      detailsContainer: {
        paddingHorizontal: 10,
        marginVertical: 20,
        justifyContent: 'center',
      },
      majorDetailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'noto-sans'
      },
      dateBtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
      },
      dateBtn: {
        padding: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'noto-sans'
      },
      touchableButton: {
        padding: 15,
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        marginVertical: 10,
      },
      pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
      },
      modalItem: {
        paddingVertical: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      modalText: {
        fontSize: 18,
        fontFamily: 'noto-sans',
        textAlign: 'center',
      },
      studentList:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        position: 'relative',
      },
      studentName:{
        flex: 1,
        position: 'relative',
        fontSize: 16,
        fontFamily: 'noto-sans'
      },
      successModalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // затемненный фон
      },
      successModalContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      successModalText: {
        marginTop: 10,
        fontSize: 18,
        color: 'green',
        fontFamily: 'noto-sans',
      },
});
