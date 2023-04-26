import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        appBarText: 'white',
        primary: '#0366d6',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        })
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    paddingValues: {
        no: 0,
        little: 5,
        normal: 10,
        extra: 15,
    },
    imageSizes: {
        normalWidth: 50,
        normalHeight: 50,
    },
    flexValues: {
        displayFlex: 'flex',
        dontGrowFlex: 0,
        growFlex: 1,
        flexRow: 'row',
        column: 'column',
    },
};

export default theme