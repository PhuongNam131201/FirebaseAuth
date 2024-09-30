import { StyleSheet, Text, View, ScrollView,Pressable } from "react-native";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Octicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import MarkAttendance from './markattendance';
import Summary from './summary';
import Employees from './employees';
import index from './index'
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  const fetchData = async () => {
    console.log("Fetching data...");
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return null; // Không cần trả về gì ở đây
};

const AppTabs = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#fff',
          borderTopColor: '#eaeaea',
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen 
        name="Danh sách dịch vụ" 
        component={Employees} 
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="spa" size={24} color={"#ff7fae"} />,
          tabBarButton: (props) => (
            <Pressable {...props} onPress={() => router.push("/(app)/employees")}>
              <FontAwesome5 name="spa" size={24} color={"#ff7fae"} />
              <Text>Danh sách dịch vụ</Text>
            </Pressable>
          ),
        }} 
      />
      <Tab.Screen 
        name="Lựa chọn dịch vụ" 
        component={MarkAttendance} 
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="checkmark" size={24} color={"#ff7fae"} />,
          tabBarButton: (props) => (
            <Pressable {...props} onPress={() => router.push("/(app)/markattendance")}>
              <Ionicons name="checkmark" size={24} color={"#ff7fae"} />
              <Text>Lựa chọn dịch vụ</Text>
            </Pressable>
          ),
        }} 
      />
      <Tab.Screen 
        name="Thống kê" 
        component={Summary} 
        options={{
          tabBarIcon: ({ color }) => <Octicons name="repo-pull" size={24} color={"#ff7fae"} />,
          tabBarButton: (props) => (
            <Pressable {...props} onPress={() => router.push("/(app)/summary")}>
              <Octicons name="repo-pull" size={24} color={"#ff7fae"} />
              <Text>Thống kê dịch vụ</Text>
            </Pressable>
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default function Home() {
  return <AppTabs />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
