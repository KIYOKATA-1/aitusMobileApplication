import { SafeAreaView, Text, View } from 'react-native';
import { headerStyle } from '../styles/header';
import { Avatar } from 'react-native-elements';
import IMAGES from '../assets/img';

export default function Header({ userData }) {
  return (
    <View style={headerStyle.header}>
      <View style={headerStyle.about}>
        <Avatar source={IMAGES.AVATAR} style={headerStyle.circle} />
        <Text style={headerStyle.headerText}>
          {userData.name} {'\n'} 
          <Text style={headerStyle.barcode}>{userData.barcode}</Text>
        </Text>
      </View>
    </View>
  );
}
