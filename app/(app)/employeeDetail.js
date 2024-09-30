import { useLocalSearchParams} from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,Button } from 'react-native';
import axios from 'axios';
const EmployeeDetail = () => {
  const { employeeId } = useLocalSearchParams(); // Lấy employeeId từ params

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.186.238:3001/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin nhân viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!employee) {
    return <Text>Không tìm thấy thông tin nhân viên.</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin Dịch Vụ</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Dịch vụ:</Text>
        <Text style={styles.value}>{employee.employeeName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mã dịch vụ:</Text>
        <Text style={styles.value}>{employee.employeeId}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Giá tiền:</Text>
        <Text style={styles.value}>{employee.salary} VNĐ</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Thời gian thực hiện:</Text>
        <Text style={styles.value}>{employee.dateOfBirth} phút</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Người tạo:</Text>
        <Text style={styles.value}>{employee.designation}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ngày tạo:</Text>
        <Text style={styles.value}>{employee.createdAt}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff7fae',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
});

export default EmployeeDetail;
