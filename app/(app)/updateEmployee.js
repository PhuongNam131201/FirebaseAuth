import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const UpdateEmployee = () => {
  const { employeeId } = useLocalSearchParams();
  const [employee, setEmployee] = useState({ employeeName: '', designation: '', salary: '',dateOfBirth:'' });
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Khởi tạo router

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
        try {
          const response = await axios.get(`http://192.168.186.238:3001/employees/${employeeId}`);
          if (response.status === 200) {
            setEmployee(response.data);
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin nhân viên:", error);
        } finally {
          setLoading(false);
        }
      };
      

    fetchEmployeeDetails();
  }, [employeeId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.186.238:3001/employees/${employeeId}`, employee);
      Alert.alert("Cập nhật thành công!");
      router.back(); // Sử dụng router để quay lại
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin dịch vụ:", error);
      Alert.alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin dịch vụ</Text>
      <Text style={styles.text}>Dịch vụ:</Text>
      <TextInput
        style={styles.input}
        placeholder="Dịch vụ"
        value={employee.employeeName}
        onChangeText={(text) => setEmployee({ ...employee, employeeName: text })}
      />
      <Text style={styles.text}>Người tạo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Người tạo"
        value={employee.designation}
        onChangeText={(text) => setEmployee({ ...employee, designation: text })}
      />
      <Text style={styles.text}>Giá dịch vụ:</Text>
      <TextInput
        style={styles.input}
        placeholder="Giá tiền"
        keyboardType="numeric"
        value={employee.salary.toString()}
        onChangeText={(text) => setEmployee({ ...employee, salary: parseFloat(text) })} // Chuyển đổi giá trị sang số
      />
      <Text style={styles.text}>Thời gian thực hiện:(đơn vị phút)</Text>
      <TextInput
        style={styles.input}
        placeholder="Thời gian thực hiện"
        value={employee.dateOfBirth.toString()}
        onChangeText={(text) => setEmployee({ ...employee, dateOfBirth: text })}
      />
      
      <Button  title="Cập nhật" onPress={handleUpdate} color='#ff7fae'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  text:{
    fontSize:20,
    fontStyle:'normal',
    fontWeight:'bold',
    
  },
});

export default UpdateEmployee;
