import {View,StyleSheet,Dimensions} from 'react-native';

import Colors from '../../constants/Colors';

function Card({children}){
    return <View style={styles.card}>
        {children}
    </View>
}

export default Card;
const dimentionWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: dimentionWidth < 380 ? 18 : 36,
        backgroundColor: Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0,height:2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    }
});