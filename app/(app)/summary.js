import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://192.168.186.238:3001/attendance-report-all-employees`,
        {
          params: {
            month: moment(currentDate).month() + 1, // Lấy tháng hiện tại
            year: moment(currentDate).year(), // Lấy năm hiện tại
          },
        }
      );

      console.log("Dữ liệu phản hồi:", response.data);
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Lỗi khi lấy thông tin điểm danh:", error.message);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);

  console.log(attendanceData);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign onPress={goToPrevMonth} name="left" size={24} color="white" />
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextMonth} name="right" size={24} color="white" />
      </View>

      <View style={styles.attendanceList}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={styles.attendanceItem}>
            <View style={{flexDirection : 'row',justifyContent:'space-between'}}>
              <View style={styles.employeeInfo}>
                <View style={styles.employeeDetails}>
                    <MaterialCommunityIcons name="spa-outline" size={24} color="#FF7FAE" />
                    <Text style={styles.employeeName}>{item?.name}</Text>
                    <Text style={styles.employeeDesignation}>
                     Mã dịch vụ :{item?.employeeId}
                    </Text>
                </View>
              </View>
              <View style={{paddingTop:25}}>
                <Text style={{fontWeight:'bold'}}> Tổng : {(item?.salary)*(item?.present - item?.halfday)} VNĐ</Text>
              </View>
            </View>
            <View style={styles.dataTableContainer}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.tableTitle}>Số lần đặt</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Số lần huỷ</DataTable.Title>
                  <DataTable.Title style={styles.tableTitle}>Đặt thành công</DataTable.Title> 
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell style={styles.tableTitle}>{item?.present}</DataTable.Cell>
                  <DataTable.Cell style={styles.tableTitle}>{item?.halfday}</DataTable.Cell>
                  <DataTable.Cell style={styles.tableTitle}>{item?.present - item?.halfday}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginBottom:50
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
  dateText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  attendanceList: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  attendanceItem: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    padding: 15,
  },
  employeeInfo: {
    alignItems: "center",
    gap: 10,
    justifyContent:'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDetails: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeeDesignation: {
    marginTop: 5,
    color: "gray",
  },
  dataTableContainer: {
    marginTop: 15,
    padding: 5,
    backgroundColor: "#A1FFCE",
    borderRadius: 5,
  },
  tableTitle: {
    justifyContent: "center",
  },
});
