import React from 'react';
import {Text, View,TextInput,TouchableOpacity,Image,KeyboardAvoidingView,ToastAndroid,Alert } from 'react-native';
import firebase from 'firebase';
export default class LoginScreen extends React.Component{
constructor(){
    super();
    this.state = {
        emailID:'',passworD:''
    }
}
loggedIN = async(email,password)=>{
    if(email && password){
    try{
        const permission = await firebase.auth().signInWithEmailAndPassword(email,password)
        if(permission){
            this.props.navigation.navigate('Write')
        }
    }
    catch(error){
      switch(error.code){
          case 'auth/user-not-found':
              ToastAndroid("User doesn't exist",ToastAndroid.SHORT)
              break;
              case 'auth/invaild-email':
              ToastAndroid("Invaild Email or password",ToastAndroid.SHORT)
              break;
      }
    }
 }
 else{
     Alert.alert("ENter Email & password")
 }
}
render(){
    return(
     <KeyboardAvoidingView style={{marginTop:20,alignItems:'center'}}>
     <View>
      <Image
      source={require('../assets/s.jpg')}
      style={{width:200,height:200,justifyContent:'center'}}
      />
      <Text style={{textAlign:'center',color:'red',fontSize:27}}>welcome to storyHub</Text>   
     </View>
     <View>
      <TextInput
       style={{margin:10,borderColor:'red',borderWidth:3,width:200,height:50,justifyContent:'center',backgroundColor:'yellow'}}
       placeholder="enter email address"
       onChangeText={text=>{this.setState({emailID :text})}}

    />  
      <TextInput
        style={{margin:10,borderColor:'red', borderWidth:3,width:200,height:50,justifyContent:'center',backgroundColor:'yellow'}}
        secureTextEntry={true}
        placeholder="enter Password"
        onChangeText={text=>{this.setState({passworD :text})}}
      /> 
     </View>
      <View>
          <TouchableOpacity style={{width:80,borderRadius:30,justifyContent:'center',backgroundColor:'blue',borderColor:'yellow'}}
          onPress={()=>{
              this.loggedIN(this.state.emailID,this.state.passworD)
          }}
          >
              <Text style={{textAlign:'center',color:'#ffffff'}}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{color:'red'}}>if you want to register a ID in StoryHUb kindly call us at +919522223643 and +916264066172</Text>
      </View>

</KeyboardAvoidingView>
    )
}

}