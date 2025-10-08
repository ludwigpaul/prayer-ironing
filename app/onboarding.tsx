import { View, Text, Button } from 'react-native';

export default function Onboarding({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Onboarding</Text>
            <Button title="Continue to Home" onPress={() => navigation.replace('Home')} />
        </View>
    );
}
