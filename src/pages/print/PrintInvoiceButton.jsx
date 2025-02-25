import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PrintInvoiceButton = ({ order }) => {
    return (
      <BlobProvider document={<MyDocument data={order} responseType="orders" />}>
        {({ url }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="float-right"
          >
            <i className="fa fa-print"></i> In hoá đơn
          </a>
        )}
      </BlobProvider>
    );
  };
  

export default PrintInvoiceButton;
