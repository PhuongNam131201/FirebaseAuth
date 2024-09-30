import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { useRouter,router } from "expo-router"; // Dùng router để điều hướng
import React, { useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usersRef } from "../firebaseConfig";
const SearchResults = ({ data, input, handleDelete }) => {
  const router = useRouter(); // Sử dụng router để điều hướng

  // Hàm hiển thị hộp thoại xác nhận trước khi xóa
  const confirmDelete = (employeeId) => {
    Alert.alert(
      "Xác nhận xóa", // Tiêu đề
      "Bạn có chắc muốn xóa dịch vụ này không?", // Nội dung thông báo
      [
        {
          text: "Hủy", // Nút Hủy
          onPress: () => console.log("Hủy xóa"), // Hành động khi nhấn Hủy
          style: "cancel", // Kiểu nút
        },
        {
          text: "Xóa", // Nút Xóa
          onPress: () => handleDelete(employeeId), // Hành động khi nhấn Xóa
          style: "destructive", // Kiểu nút có tác động mạnh (thường dùng cho xóa)
        },
      ],
      { cancelable: true } // Cho phép hủy bằng cách nhấn ra ngoài hộp thoại
    );
  };

  // Hàm điều hướng đến màn hình chi tiết
  const handleViewDetail = (employeeId) => {
    router.push({
      pathname: '/employeeDetail',
      params: { employeeId }
    });
  };
  
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            const shortenedName =
              item?.employeeName.length > 15
                ? item?.employeeName.slice(0, 15) + "..."
                : item?.employeeName;

            return (
              <View style={styles.itemContainer}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handleViewDetail(item.employeeId)}
                >
                  <View style={styles.itemContent}>
                    <View style={styles.itemInfo}>
                      <MaterialCommunityIcons name="spa-outline" size={24} color="#FF7FAE" />
                      <Text style={styles.itemName}>{shortenedName}</Text>
                    </View>
                    <Text style={styles.itemSalary}>{item?.salary} VNĐ</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => confirmDelete(item.employeeId)}>
              <AntDesign name="delete" size={24} color="red" />
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => router.push(`/updateEmployee?employeeId=${item.employeeId}`)}>
            <MaterialIcons name="system-update-alt" size={24} color="black" />
            </Pressable>

                
              </View>
            );
          }     

          return null;
        }}
        keyExtractor={(item) => item.employeeId.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginVertical: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#FF7FAE',
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    
  },
  itemSalary: {
    color: "#FF7FAE",
    fontWeight:'bold',
  },
  deleteButton: {
    paddingTop: 10,
  },
});

export default SearchResults;
