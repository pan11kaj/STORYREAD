import React from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,TouchableOpacity } from 'react-native';

import db from '../config';
import firebase from 'firebase';
export default class ReadScreen extends React.Component{
constructor(props){
    super(props);
    this.state={
     allsearch:[],search:''
    }
}
componentDidMount = async()=>{
const query = await db.collection("Writers").get()
query.docs.map((doc)=>{
    this.setState({allsearch:[...this.state.allsearch,doc.data()]})
})
    
}
 render(){
     return(
        <ScrollView>
         <TextInput
         placeholder="Enetr Story title"
         style={{width:300,borderColor:'white',backgroundColor:'yellow',height:50}}
         onChangeText={text=>{this.setState({search:text})}}
         />
       
    
         {
            this.state.allsearch.map((writer,index)=>{
                if(this.state.search ===''){
                    return(
                    <View key={index} style={{borderBottomWidth:2}}>
                 
                    <Text style={styles.outputs}>{"Title:"+  writer.StoryTitle}</Text>
                    <Text style={styles.outputs}>{"Author:"+  writer.Author}</Text>
                </View>
                )
                }else if(this.state.search === writer.StoryTitle){
                    return(
                        <View key={index} style={{borderBottomWidth:2}}>
                     
                        <Text style={styles.outputs}>{"Title:"+  this.state.search}</Text>
                        <Text style={styles.outputs}>{"Author:"+  writer.Author}</Text>
                    <Text style={styles.outputs}>{"STORY:--  " + writer.Story}</Text>
                    </View>
                    )
                }
            })
        }
    
    
     </ScrollView>)
 }   
}
const styles = StyleSheet.create({
outputs:{
    fontSize:25,
    color:'red',borderColor:'blue'
}
})