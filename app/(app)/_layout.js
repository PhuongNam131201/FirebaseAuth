import { Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import EmployeeDetail from './employeeDetail'
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
          headerStyle: {
            backgroundColor: '#ff69b4', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
          headerTitleStyle: {
            fontWeight: 'bold', // Tùy chọn cho kiểu chữ tiêu đề
          },
        }}
      />
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen
        name="employees"
        options={{
          title: 'Danh sách dịch vụ',
          headerStyle: {
            backgroundColor: '#ff7fae', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
        }}
      />
      <Stack.Screen
        name="adddetails"
        options={{
          title: 'Thêm dịch vụ',
          headerStyle: {
            backgroundColor: '#ff7fae', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
        }}
      />
      <Stack.Screen
        name="markattendance"
        options={{
          title: 'Danh sách dịch vụ khả dụng',
          headerStyle: {
            backgroundColor: '#ff7fae', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: 'Lựa chọn dịch vụ',
          headerStyle: {
            backgroundColor: '#ff7fae', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
        }}
      />
      <Stack.Screen
        name="summary"
        options={{
          title: 'Thống kê',
          headerStyle: {
            backgroundColor: '#ff7fae', // Màu nền của thanh Stack (pink)
          },
          headerTintColor: '#fff', // Màu của văn bản trên thanh Stack (white)
        }}
      />
      <Stack.Screen
        name="employeeDetail"
        options={{
          title: 'Chi tiết dịch vụ',
          headerStyle: {
            backgroundColor: '#ff7fae',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="updateEmployee"
        options={{
          title: 'Cập nhật nhân viên',
          headerStyle: {
            backgroundColor: '#ff7fae',
          },
          headerTintColor: '#fff',
        }}
      />
      
    </Stack>
  );
}
