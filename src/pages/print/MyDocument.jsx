// MyDocument.jsx
import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../../assets/images/logo.png';

Font.register({
    family: 'Roboto',
    src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf',
    fontStyle: 'normal',
    fontWeight: 'normal',
});

const MyDocument = ({ data }) => {
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Roboto',
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 1.5,
            flexDirection: 'column',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        logo: {
            width: 100,
        },
        section: {
            marginBottom: 10,
        },
        tableHeader: {
            flexDirection: 'row',
            marginTop: 10,
            backgroundColor: '#DEDEDE',
            padding: 4,
        },
        tableHeaderItem: {
            flex: 1,
            fontSize: 10,
            fontWeight: 'bold',
        },
        tableRow: {
            flexDirection: 'row',
            padding: 4,
            borderBottomWidth: 1,
            borderColor: 'whitesmoke',
        },
        tableCell: {
            flex: 1,
            fontSize: 9,
        },
    });

    const { orderId, email, orderItems, orderDate, totalAmount, orderStatus } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
     
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hoá đơn đặt hàng</Text>
                </View>

  
                <View style={styles.section}>
                    <Text>Email: {email}</Text>
                    <Text>Mã đơn hàng: {orderId}</Text>
                    <Text>Ngày đặt hàng: {orderDate}</Text>
                    <Text>Trạng thái: {orderStatus}</Text>
                    <Text>Tổng tiền: {totalAmount.toLocaleString("vi-VN")}</Text>
                </View>


                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderItem}>Sản phẩm</Text>
                    <Text style={styles.tableHeaderItem}>Giá</Text>
                    <Text style={styles.tableHeaderItem}>Số lượng</Text>
                    <Text style={styles.tableHeaderItem}>Thành tiền</Text>
                </View>
                {orderItems.map((item) => (
                    <View style={styles.tableRow} key={item.orderItemId}>
                        <Text style={styles.tableCell}>{item.product.productName}</Text>
                        <Text style={styles.tableCell}>{item.orderedProductPrice.toLocaleString("vi-VN")}</Text>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>{(item.orderedProductPrice * item.quantity).toLocaleString("vi-VN")}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default MyDocument;
