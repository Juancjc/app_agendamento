import {NativeTabs} from 'expo-router/native-tabs';
import {useColorScheme} from 'react-native';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';

import {Colors} from '@/constants/theme';

export default function AppTabs() {
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    return (
        <NativeTabs
            backgroundColor={colors.background}
            indicatorColor={colors.backgroundElement}
            labelStyle={{selected: {color: colors.text}}}>

            <NativeTabs.Trigger name="home">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    src={{
                        default: <NativeTabs.Trigger.VectorIcon family={MaterialDesignIcons} name="home-outline" />, // aba inativa
                        selected: <NativeTabs.Trigger.VectorIcon family={MaterialDesignIcons} name="home" />, // aba ativa
                    }}
                    renderingMode="template"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="explore">
                <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    src={{
                        default: <NativeTabs.Trigger.VectorIcon family={MaterialDesignIcons} name="compass-outline" />, // aba inativa
                        selected: <NativeTabs.Trigger.VectorIcon family={MaterialDesignIcons} name="compass" />, // aba ativa
                    }}
                    renderingMode="template"
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
