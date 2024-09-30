  import {
      StyleSheet,
      Text,
      View,
      ScrollView,
      TextInput,
      Pressable,
      Alert,
    } from "react-native";
    import React, { useState } from "react";
    import axios from "axios";
    
    const adddetails = () => {
      const [name, setName] = useState("");
      const [employeeId, setEmployeeId] = useState("");
      const [dob, setDob] = useState("");
      const [salary, setSalary] = useState("");
      const [designation, setDesignation] = useState("");
      const handleRegister = () => {
        const employeeData = {
          employeeName: name,
          employeeId: employeeId,
          designation: designation,
          dateOfBirth: dob,
          salary: salary,
        };
    
        axios
          .post("http://192.168.186.238:3001/addEmployee", employeeData)
          .then((response) => {
            Alert.alert(
              "Xác nhận thành công",
              "Bạn đã thêm thành công dịch vụ mới"
            );
            setName("");
            setEmployeeId("");
            setDob("");
            setSalary("");
            setDesignation("");
          })
          .catch((error) => {
            Alert.alert(
              "Không thành công",
              "Đã xả ra lỗi trong quá trình thực hiện"
            );
            console.log("register failed", error);
          });
      };
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ padding: 10 }}>
            
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Tên dịch vụ
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="nhập dịch vụ"
                placeholderTextColor={"black"}
              />
            </View>
    
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Mã dịch vụ</Text>
              <TextInput
                value={employeeId}
                onChangeText={(text) => setEmployeeId(text)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Nhập mã dịch vụ:(chữ hoặc số)"
                placeholderTextColor={"black"}
              />
            </View>
    
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Người thêm</Text>
              <TextInput
                value={designation}
                onChangeText={(text) => setDesignation(text)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Nhập người thêm"
                placeholderTextColor={"black"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Thời gian
              </Text>
              <TextInput
                value={dob}
                onChangeText={(text) => setDob(text)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Nhập thời gian làm dịch vụ (phút)"
                placeholderTextColor={"black"}
              />
            </View>      
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Giá tiền</Text>
              <TextInput
                value={salary}
                onChangeText={(text) => setSalary(text)}
                style={{
                  padding: 10,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Nhập mức giá (VND)"
                placeholderTextColor={"black"}
              />
            </View>
            <Pressable
              onPress={handleRegister}
              style={{
                backgroundColor: "#ABCABA",
                padding: 10,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Thêm dịch vụ
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    };
    
    export default adddetails;
    
    const styles = StyleSheet.create({});