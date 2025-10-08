import { View, Text, Button } from 'react-native';

export default function Home({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 20 }}>Welcome to Prayer Ironing</Text>
            <Button title="Start Prayer Session" onPress={() => navigation.navigate('Session')} />
            <Button title="Partner Feed" onPress={() => navigation.navigate('Partners')} />
        </View>
    );
}
