import { useState } from 'react';
import{ Text, View,Image, StyleSheet, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListItems  = ({item})=>{
    const [loading, setLoading] = useState(true)
    const image = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`;
    return(
        <TouchableOpacity>
            <View style={Styles.card}>
                {loading && <ActivityIndicator animating={loading} hidesWhenStopped={true} size={'large'} />}
                <Image style={Styles.imag} source={{uri: image }} onLoad={()=>(setLoading(false))} onError={()=>(setLoading(false))} />
                <View style={Styles.info}>
                    <Text style={Styles.name}>{item.title}</Text>
                    <Text style={Styles.details}> {item.release_date} - langue : {item.original_language}</Text>
                </View>
                <View style={Styles.ratingContainer}>
                    {Array.from({length: 5}).map((_, index)=>(
                        <Text Key={index} style={Styles.star}>
                            {index < Math.floor(item.rating) ? "★" : "☆"}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListItems ;

const Styles= StyleSheet.create({
    card:{
        flexDirection: 'row',
        // backgroundColor: 'fbfbfb',
        borderWidth: 1,
        borderColor: 'dcdcdc',
        padding:10,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation:1,
        width: 380,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    imag:{
        width: 80,
        height:80,
        borderRadius:40
    },
    info:{
        marginLeft: 10,
        flex: 1
        
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,color: 'white'
        
    },
    details:{
        fontSize: 14,
        color: '#1259',
        marginVertical: 5,
    },
    star: {
        fontSize: 16,
        color: '#ffd700'
    },
    ratingContainer: {
        flexDirection: "row",
    },
})