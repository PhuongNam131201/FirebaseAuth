import { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { signInWithEmailLink } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Đảm bảo đã import auth từ firebaseConfig

const FinishSignUp = ({ route }) => {
  const { email } = route.params;

  const confirmEmail = async () => {
    try {
      // Lấy link từ URL của trang web
      const link = window.location.href;
      await signInWithEmailLink(auth, email, link);
      Alert.alert('Xác nhận', 'Email đã được xác nhận thành công!');

      // Chuyển hướng đến trang chính
      // router.push('home'); // Uncomment và nhập router nếu cần
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <View>
      <Text>Đang xác nhận email...</Text>
    </View>
  );
};

export default FinishSignUp;
