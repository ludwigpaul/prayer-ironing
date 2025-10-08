import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './auth';
import Onboarding from './onboarding';
import Home from './index';
import Session from './session';
import Reflection from './reflection';
import Partners from './partners';

const Stack = createNativeStackNavigator();

export default function Layout() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Auth"        // 🔴 Force app to start at Auth
                screenOptions={{ headerShown: true }}
            >
                <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Session" component={Session} />
                <Stack.Screen name="Reflection" component={Reflection} />
                <Stack.Screen name="Partners" component={Partners} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
