import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState} from "react";
import { Text, View, StyleSheet, Pressable, VirtualizedList, FlatList  } from "react-native";
import { Link } from "expo-router";

// import { movies } from "@/scripts/movies";

import SearchBar from "@/components/SearchBar";
import ListEmpty from "@/components/ListComponentEmpty";
import HeaderFooter from "@/components/HeaderFooter";
import { token, url } from "@/scripts/tloos";
import ListItems  from "@/components/ListItems"

  const config ={
    metho: 'POST',
    headers: {
      Accepte: '/application /json',
      'content-Type': '/application /json',
      Authorization: token    },
  };





export default function Index() {

  const [texte, setTexte] = useState('');
  const [loading, setLoading] = useState(true);
  const [moviesList , setMoviesList] = useState([]);
  const [page, setPage] = useState(1);

  
  

  const filterMovie = texte === ''? moviesList: moviesList.filter(item =>(item.title.toLowerCase().includes(texte.toLowerCase())));
  

  const getMovies = async (page)=>{
    try{
      const response = await fetch(url + `&page=${page}`, config);
      return await response.json();
    }catch(error){
      console.log("Erreur lors du recharge voila L'erreur : ", error);
    }
  }
  useEffect(()=>{
    (async ()=>{
      const m = await getMovies(page);
      setMoviesList(m.results);
      setLoading(false);
    })();
  }, []);
  

  // const getItem = (data, index) => data.at(index);
  // const getItemCount = (data)=> data.length;

  const onEndReached = async()=>{
    setLoading(true);
    const m = await getMovies(page+1);

    if (m && m.results) {
      console.log('onEndReached moviesList : ', moviesList);
      setMoviesList((oldMovies) => [...oldMovies, ...m.results]);
      console.log('onEndReached moviesList après : ', moviesList);
      setLoading(false);
      setPage((page)=> page+1);
    } else {
      console.error('Les résultats des films sont indéfinis.');
    }
  }
  const onRefresh = ()=>{};
  


  const onPressButton = ()=>{};

  const itemSeparator = ()=>{
    <View style={{ marginVertical:3}}/>
  }

  const renderItem = ({ item })=>(
    
    <Link href={{ pathname: "/[id]", params: {id: item.id } }} asChild>
      <Pressable>
        <ListItems  item={item}/>
      </Pressable>
      
    </Link>
  )

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchBar onPressButton={onPressButton} texte={texte} setTexte={setTexte}/>

      <FlatList 
        style={ Styles.ResultSearch}
        data={filterMovie} //moviesList
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={HeaderFooter}
        ListHeaderComponent={HeaderFooter}
        ListEmptyComponent={ListEmpty}
        keyExtractor={(item, index) => item.id.toString()}
        refreshing={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        
      />

    </View>
  );
} 

const Styles = StyleSheet.create({

  ResultSearch: {
    flex: 7,
    marginTop: 20
  },
  list:{
    borderBottomWidth: 1,
    justifyContent: 'center',
    height:60,
    width: 400
  }
})




