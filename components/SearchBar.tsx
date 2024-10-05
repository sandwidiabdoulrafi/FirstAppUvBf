import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";



export default function SearchBar({onPressButton, texte, setTexte}){

    return(
        <View style={Styles.SearchSection}>
            <TextInput
                autoFocus={true} 
                placeholder="Recherche..."
                onChangeText={setTexte}
                style={Styles.inputEarch}
                value= {texte}
            />
            <TouchableOpacity  style={{marginTop:7}}>
                <Ionicons name="search-sharp" size={32} color={'black'} onPress={onPressButton}/>
            </TouchableOpacity>
        </View>
    )
}

const Styles= StyleSheet.create({
    SearchSection:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent: 'center',
        borderWidth: 1,
        padding: 5,
        width: 400,
        height: 60,
        borderRadius: 10
      },
      inputEarch: {
        height: 40,
        width: 310,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 2,
        padding: 5,
        fontSize: 24,
        color: 'white',
        marginHorizontal: 8,
        marginTop:5,
        backgroundColor: '#0000001b'
        
      },
})