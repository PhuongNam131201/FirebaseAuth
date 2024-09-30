import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Đăng nhập', "Xin hãy nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log('Quá trình đăng nhập: ', response);
    if (!response.success) {
      Alert.alert('Đăng nhập', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/images/logout.png')} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Đăng Nhập</Text>
          <View style={styles.inputWrapper}>
            <Octicons name='mail' size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value => emailRef.current = value}
              style={styles.inputText}
              placeholder='Địa chỉ Email'
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Octicons name='lock' size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value => passwordRef.current = value}
              style={styles.inputText}
              placeholder='Mật khẩu'
              secureTextEntry
              placeholderTextColor={'gray'}
            />
          </View>
          <Text onPress={() => router.push('ForgotPassword')} style={styles.forgotPassword}>Quên mật khẩu?</Text>
          {/* Nút xác nhận */}
          <View>
            {
              loading ? (
                <View style={styles.loadingContainer}>
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handleLogin}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
              )
            }
          </View>
          {/* Đăng ký */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Bạn không có tài khoản?</Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={styles.registerLink}>Đăng ký</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    flex: 1,
    gap: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: hp(50),
    width: hp(50),
  },
  title: {
    fontSize: hp(4),
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#1F2937',
  },
  inputContainer: {
    gap: 10,
  },
  inputWrapper: {
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  inputText: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: hp(1.8),
    textAlign: 'right',
    color: '#4F46E5',
    fontWeight:'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#6B7280',
  },
  registerLink: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#4F46E5',
  },
});
