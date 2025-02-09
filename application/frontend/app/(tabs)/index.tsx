import { Text, View, Image, Dimensions } from "react-native";
import { StyleSheet } from "react-native";


const { width, height } = Dimensions.get('window');

export default function Index() {
  return (
    <View>
      <View style={styles.header} >
        <Image
          source={require('../images/user-friends.svg')}
          style={styles.friends}></Image>
        <Text style={styles.title}>
          DrawIt.
        </Text>
        <Image
          source={require('../images/user.png')}
          style={styles.user}></Image>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  friends: {
    width: width * 0.08,
    height: width * 0.08
  },
  user: {
    height: width * 0.06,
    width: width * 0.06,
    borderRadius: 15,
    filter: 'invert(1)'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  }
});
