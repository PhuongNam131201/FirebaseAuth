import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import Common, { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';

const ios = Platform.OS === 'ios';

export default function HomeHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();

    const handleProfile = () => {
        // Handle profile action
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
            <View>
                <Text style={styles.greetingText}>
                    KAMI SPA
                </Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={styles.profileImage}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={1000}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={styles.menuOptions}>
                        <MenuItem
                            text="Thông tin"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#ff69b4" />}
                        />
                        <Divider />
                        <MenuItem
                            text="Đăng xuất"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color="#ff69b4" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
}

const Divider = () => {
    return (
        <View style={styles.divider} />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        backgroundColor: '#ff7fae', // Màu nền
        paddingBottom: 6,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    greetingText: {
        fontSize: hp(3),
        marginBottom: 10,
        fontWeight: '500',
        color: 'white',
    },
    profileImage: {
        height: hp(4.3),
        aspectRatio: 1,
        borderRadius: 100,
    },
    menuOptions: {
        optionsContainer: {
            borderRadius: 10,
            marginTop: 40,
            marginLeft: -30,
            backgroundColor: '#ffc6bf',
            shadowOpacity: 0.2,
            shadowOffset: { width: 10, height: 0 },
            width: 160,
        },
    },
    divider: {
        padding: 1,
        width: '100%',
        backgroundColor: '#E5E7EB', // Màu cho divider
    },
});
