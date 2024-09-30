import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !username || !profile) {
      Alert.alert('Đăng ký', "Xin hãy nhập đầy đủ thông tin");
      return;
    }
    
    setLoading(true);
    let response = await register(email, password, username, profile);
    setLoading(false);
    
    console.log('Kết quả: ', response);
    if (!response.success) {
      Alert.alert('Đăng ký', response.msg);
    } else {
      // Xử lý khi đăng ký thành công (ví dụ: chuyển hướng đến màn hình khác)
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/images/a.png')} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Đăng Ký</Text>
          {/* Các trường đầu vào */}
          <View style={styles.inputContainer}>
            <InputField 
              icon={<Feather name='user' size={hp(2.7)} color="gray" />}
              placeholder='Họ và tên'
              value={username}
              onChangeText={setUsername}
            />
            <InputField 
              icon={<Octicons name='mail' size={hp(2.7)} color="gray" />}
              placeholder='Địa chỉ Email'
              value={email}
              onChangeText={setEmail}
            />
            <InputField 
              icon={<Octicons name='lock' size={hp(2.7)} color="gray" />}
              placeholder='Mật khẩu'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <InputField 
              icon={<Feather name='image' size={hp(2.7)} color="gray" />}
              placeholder='Đường dẫn hình ảnh'
              value={profile}
              onChangeText={setProfile}
            />
          </View>

          {/* Nút xác nhận */}
          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size={hp(10)} />
              </View>
            ) : (
              <TouchableOpacity 
                onPress={handleRegister}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}> 
                  Đăng ký
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Chuyển đến đăng nhập */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Bạn đã có tài khoản?</Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={styles.loginLink}> Đăng nhập </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const InputField = ({ icon, placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.inputField}>
      {icon}
      <TextInput
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'gray'}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    flex: 1,
    gap: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: hp(30),
    width: hp(50),
  },
  formContainer: {
    gap: 10,
  },
  title: {
    fontSize: hp(4),
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#1F2937',
  },
  inputContainer: {
    gap: 4,
  },
  inputField: {
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    height: hp(6.5),
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    fontSize: hp(2.7),
    color: 'white',
    fontWeight: 'bold',
    trackingWider: true,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#6B7280',
  },
  loginLink: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#4F46E5',
  },
});
