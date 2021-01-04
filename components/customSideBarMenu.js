import * as React from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import db from '../config';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
      return(
        <View>
          <View>
            <DrawerItems {...this.props}/>
          </View>
          <View>
            <TouchableOpacity onPress={()=> {
              this.props.navigation.navigate('welcomeScreen')
              firebase.auth().signOut()
            }}
            style = {styles.logoutButton}
            >
              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 500,
    marginLeft: 17,
    marginRight: 230,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
})