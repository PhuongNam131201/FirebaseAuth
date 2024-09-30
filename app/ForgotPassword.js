import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,Image } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Loading from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgotPassword = () => {
  const emailRef = useRef('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!emailRef.current) {
      Alert.alert('Lỗi', 'Xin vui lòng nhập địa chỉ email.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailRef.current);
      Alert.alert('Thành công', 'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/images/pass.png')} />
        </View>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <TextInput
        onChangeText={value => emailRef.current = value}
        style={styles.input}
        placeholder='Địa chỉ Email'
        placeholderTextColor={'gray'}
      />
      <View style={{paddingTop: 20}}>
            {
              loading ? (
                <View style={styles.loadingContainer}>
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handleResetPassword}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
              )
            }
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 10,
   
  },
  button: {
    height: hp(6.5),
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: hp(2.7),
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: hp(50),
    width: hp(50),
  },
});

export default ForgotPassword;
