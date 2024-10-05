import { View, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native"
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { movies } from "@/scripts/movies";
import { ScrollView } from "react-native-gesture-handler";
import {token} from "@/scripts/tloos";


const config ={
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization :  token
    }
}




export default function Detail(){

    const id = useLocalSearchParams().id;
    console.log("l'id : ", id);
    const navigation = useNavigation();
    const [movie, setMovie] = useState([]);
    const [laoding, setLaoding] = useState(true);
    const [laodingImg, setLaodingImg] = useState(true);

    console.log("Movie detaille avant : ", movie);

    const getMovieDetaille = async ()=>{
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`,
                config
            );
            return await reponse.json();
        }catch(error){console.log("Erreur lors du chargement du detaille : ", error)}
    }

    useEffect(() => {
        
        (async () =>  {
            const Movie = await getMovieDetaille(); 
            console.log("Movie detaille : ", Movie)
            setMovie(Movie);
            setLaoding(false);
            
        })()
        
    }, [id])

    navigation.setOptions({
        headerTitle: movie?.title?? "",
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle:{
            backgroundColor: '#137C8B',
            
        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: -15 }}>
                <Text style={{ color: 'black', fontSize: 22, fontWeight:700 }}>{"< Accueil"}</Text>
            </TouchableOpacity>
        ),
    });

    // console.log(movie.poster_path);

    return (
        <View style={Styles.page}>
            { laoding && <ActivityIndicator animating={laoding} hidesWhenStopped={true} size={'large'}/>}
            {movie != null ? (
                <>
                <View style={Styles.imageBox}>
                { laodingImg && <ActivityIndicator animating={laodingImg} style={{marginTop:50 }} hidesWhenStopped={true} size={'small'}/>}
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} onLoad={()=>(setLaodingImg(false))}  onError={()=>{setLaodingImg(false)}} style={{width: '100%', height: 310 }}></Image>

                <View style={{justifyContent: 'center'}}>

                    <Text style={Styles.title}> {movie?.original_title ?? ""} </Text>
                    <ScrollView style={{height: 130, width: 420}}>
                    <Text style={{textAlign: 'center', marginHorizontal: 10}}>{movie?.overview}</Text>
                    </ScrollView>

                </View>
            </View>
            <ScrollView style={{ backgroundColor: '#0000001b', marginBottom: 50, borderRadius: '25%', height:90}}>
                <View style={Styles.listDetail}>
                    <Text style={{fontSize: 20}}>Langue</Text>
                    <Text style={{fontSize: 20}}> {movie?.original_language}</Text>
                </View>

                <View style={Styles.listDetail}>
                    <Text style={{fontSize: 20}}>Vues</Text>
                    <Text style={{fontSize: 20}}> {movie?.popularity}</Text>
                </View>
                <View style={Styles.listDetail}>
                    <Text style={{fontSize: 20}}>date de sortie</Text>
                    <Text style={{fontSize: 20}}> {movie?.release_date}</Text>
                </View>
                <View style={Styles.listDetail}>
                    <Text style={{fontSize: 20}}>Likes</Text>
                    <Text style={{fontSize: 20}}> {movie?.vote_average}</Text>
                </View>
                <View style={Styles.listDetail}>
                    <Text style={{fontSize: 20}}>Vote</Text>
                    <Text style={{fontSize: 20}}> {movie?.vote_count}</Text>
                </View>
                
            </ScrollView>
                </>
            ) : null}

        </View>
    )
}



const Styles = StyleSheet.create({
    page :{
        flex: 1,
        backgroundColor:'#137C8B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBox:{
        flex: 3,
        height: 100,
        width: 430,
    },
    title:{
        fontSize:30, 
        color: 'white',
        marginHorizontal: 2,
        textAlign: 'center'
    },
    
    listDetail:{
        height:30,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 1,
        width: 409,
        paddingHorizontal: 20,
        borderColor: 'white',
        marginBottom: 10,
    }
})