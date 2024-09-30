import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { useLocalSearchParams } from "expo-router";
  import moment from "moment";
  import { AntDesign } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import axios from "axios";
  import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
  const User = () => {
    const params = useLocalSearchParams();
    const [attendanceStatus, setAttendanceStatus] = useState("present");
    const [currentDate, setCurrentDate] = useState(moment());
  
    const goToNextDay = () => {
      const nextDate = moment(currentDate).add(1, "days");
      setCurrentDate(nextDate);
    };
  
    const goToPrevDay = () => {
      const prevDate = moment(currentDate).subtract(1, "days");
      setCurrentDate(prevDate);
    };
  
    const formatDate = (date) => {
      return date.format("MMMM D, YYYY");
    };
  
    const submitAttendance = async () => {
      try {
        const attendanceData = {
          employeeId: params?.id,
          employeeName: params?.name,
          date: currentDate.format("MMMM D, YYYY"),
          status: attendanceStatus,
        };
        const response = await axios.post(
          "http://192.168.186.238:3001/attendance",
          attendanceData
        );
  
        if (response.status === 200) {
          Alert.alert(`Xác nhận thành công cho ${params?.name}`);
        }
      } catch (error) {
        console.log("Lỗi xác nhận", error);
        Alert.alert("Có lỗi xảy ra khi xác nhận.");
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <AntDesign onPress={goToPrevDay} name="left" size={24} color="white" />
            <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
            <AntDesign onPress={goToNextDay} name="right" size={24} color="white" />
        </View>
  
        <Pressable style={styles.employeeInfo}>         
          <View>
          

            <Text style={styles.employeeName}>
              <MaterialCommunityIcons name="spa-outline" size={24} color="#FF7FAE" />
              {params?.name || 'Tên dịch vụ'}</Text>
            <Text style={styles.employeeDetails}>
              {params?.designation ? ` Mã dịch vụ: ${params.id}` : 'Thông tin không có'}
            </Text>
          </View>
        </Pressable>
        <View style={{justifyContent:'space-between',alignItems:'center'}}>
          <Text style={styles.salaryTexta}>GIÁ TIỀN: 
          <Text style={[styles.salaryText, {color: 'red'}]}>{params?.salary || 'Chưa có'} VNĐ</Text>
          </Text>
          
        </View>
  
        <View style={styles.attendanceSection}>
          <Text style={styles.attendanceHeader}>Trạng thái</Text>
          <View style={styles.attendanceButtons}>
            <Pressable
              onPress={() => setAttendanceStatus("present")}
              style={[styles.attendanceButton, attendanceStatus === "present" && styles.selectedButton]}
            >
              {attendanceStatus === "present" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Đặt dịch vụ</Text>
            </Pressable>
          </View>
          <View style={styles.attendanceButtons}>
            <Pressable
              onPress={() => setAttendanceStatus("halfday")}
              style={[styles.attendanceButton, attendanceStatus === "halfday" && styles.selectedButton]}
            >
              {attendanceStatus === "halfday" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Huỷ đặt dịch vụ</Text>
            </Pressable>           
          </View>
          <View>
            <Text>Ghi chú : </Text>
          </View>
          <View style={styles.reasonInputContainer}>
            <TextInput
              style={styles.reasonInput}
              placeholderTextColor="black"
              placeholder="Ghi thêm yêu cầu"
            />
          </View>
  
          <Pressable onPress={submitAttendance} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Xác nhận</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default User;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0",
    },
    dateNavigator: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginLeft: "auto",
      marginRight: "auto",
      marginVertical: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffc6bf",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      borderRadius:20,
      margin:20
    },
    employeeInfo: {
      marginVertical: 10,
      marginHorizontal: 12,
      flexDirection: "row",
      gap: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#4b6cb7",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: "white",
      fontSize: 16,
    },
    employeeName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    employeeDetails: {
      marginTop: 5,
      color: "gray",
    },
    salaryTexta: {
      fontSize: 16,
      fontWeight: "500",
      marginHorizontal: 12,
      
    },
    salaryText: {
      fontSize: 16,
      fontWeight: "500",
      marginHorizontal: 12,
      paddingRight:50
    },
    attendanceSection: {
      marginHorizontal: 12,
    },
    attendanceHeader: {
      fontSize: 16,
      fontWeight: "500",
      marginTop: 7,
    },
    attendanceButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginVertical: 10,
    },
    attendanceButton: {
      backgroundColor: "#C4E0E5",
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
    },
    selectedButton: {
      backgroundColor: "#FF7FAE", // Highlight color for selected buttons
    },
    reasonInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dateText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
    reasonInput: {
      borderRadius: 20,
      marginTop: 10,
      borderWidth: 2,
      borderColor: "#FF7FAE",
      padding: 10,
      flex: 1,
      backgroundColor:'#fff',
      
    },
    submitButton: {
      backgroundColor: "#FF7FAE",
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  