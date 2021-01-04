import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends React.Component {
    constructor(){
      super();
      this.state={
        emailId   : '',
        firstName : '',
        lastName  : '',
        address   : '',
        contact   : '',
        docId     : ''
      }
    }

    getData = () => {
      var email = firebase.auth().currentUser.email;
      db.collection('Users').where('Email_ID','==',email).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
        var data = doc.data()
          this.setState({
            emailId   : data.email_id,
            firstName : data.first_name,
            lastName  : data.last_name,
            address   : data.address,
            contact   : data.contact,
            docId     : doc.id
          })
        });
      })
    }

    updateData = () => {
      db.collection('Users').doc(this.state.docId)
      .update({
        "first_name": this.state.firstName,
        "last_name" : this.state.lastName,
        "address"   : this.state.address,
        "contact"   : this.state.contact,
      })
      Alert.alert("Profile Updated Successfully")
    }

    componentDidMount(){
      this.getData();
    }

    render() {
        return (
            <View style={styles.container} >
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.formTextInput}
                  maxLength ={10}
                  placeholder = "First Name"
                  onChangeText={(text)=>{
                   this.setState({
                    firstName: text
                   })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  maxLength ={15}
                  placeholder = "Last Name"
                  onChangeText={(text)=>{
                   this.setState({
                    lastName: text
                   })
                  }}
                  value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  maxLength ={10}
                  placeholder = "Contact"
                  keyboardType = 'numeric'
                  onChangeText={(text)=>{
                   this.setState({
                    contact: text
                   })
                  }}
                  value ={this.state.contact}
                />
                <TextInput
                  style={styles.addressTextInput}
                  placeholder = "Address"
                  multiline = {true}
                  onChangeText={(text)=>{
                   this.setState({
                    address: text
                   })
                  }}
                  value ={this.state.address}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{
                   this.updateData()
                }}>
                  <Text style={styles.buttonText}>
                    Save
                  </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex: 1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      marginTop:20,
      padding:10,
      width:"75%",
      height:35,
      alignSelf:'center',
      textAlign: 'center',
      borderColor:'rgb(255, 159, 58)',
      borderRadius:10,
      borderWidth:1,
    },
    addressTextInput:{
        marginTop:20,
        padding:10,
        width:"75%",
        height:100,
        alignSelf:'center',
        textAlign: 'center',
        borderColor:'rgb(255, 159, 58)',
        borderRadius:10,
        borderWidth:1,
      },
    button:{
      backgroundColor:"rgb(255, 159, 58)",
      justifyContent:'center',
      alignItems:'center',
      width:"75%",
      height:50,
      marginTop:20,
      borderColor: 'rgb(255, 159, 58)',
      borderRadius: 10,
      shadowColor: "rgb(0, 0, 0)",
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.34,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      fontSize: 20,
      color: 'rbg(355, 355, 355)',
      fontWeight:"bold",
    }
})