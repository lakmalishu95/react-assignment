import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const DETAILED_TRANSACTION_API = 'http://3000/api/detailed-transaction';
const TRANSACTION_SUMMARY_API = 'http://3000/api/transaction-summary';

function ReportPage() {
  const [transactionData, setTransactionData] = useState([]);
  const [transactionSummary, setTransactionSummary] = useState(null);

  useEffect(() => {
    fetchTransactionData();
    fetchTransactionSummary();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get(DETAILED_TRANSACTION_API);
      const transactionList = response.data.transaction.transaction_list;
      setTransactionData(transactionList);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  const fetchTransactionSummary = async () => {
    try {
      const response = await axios.get(TRANSACTION_SUMMARY_API);
      const summaryData = response.data.summery;
      setTransactionSummary(summaryData);
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
    }
  };

  return (
    <div>
      <h2>Report Page</h2>
      <Box>
        {transactionSummary && (
          <div>
            <Typography variant="h6">Transaction Summary</Typography>
            <Typography>Total Transaction Count: {transactionSummary.totalTransactionCount}</Typography>
            <Typography>Total Revenue: {transactionSummary.totalRevenue}</Typography>
            <Typography>Total Card Transaction: {transactionSummary.totalCardTransaction}</Typography>
            <Typography>Total Cash Transaction: {transactionSummary.totalCashTransaction}</Typography>
            <Typography>Total QR Transaction: {transactionSummary.totalQrTransaction}</Typography>
          </div>
        )}
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Transaction List</Typography>
        {transactionData.map((transaction) => (
          <div key={transaction.id}>
            <Typography>Payment Mode: {transaction.paymentMode}</Typography>
            <Typography>Invoice No: {transaction.invoiceNo}</Typography>
            <Typography>Amount: {transaction.amount}</Typography>
            <Typography>Currency: {transaction.currency}</Typography>
            {/* Display other transaction details */}
            <hr />
          </div>
        ))}
      </Box>
    </div>
  );
}

export default ReportPage;
