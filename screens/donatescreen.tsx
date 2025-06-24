import { Box, Text } from "@/components/Restyle";
import theme from "@/constants/colors";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
} from "react-native";

const DonateScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState<any>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);

    if (!amount || amount <= 0) {
      Alert.alert("Error", "Please select or enter a valid donation amount");
      return;
    }

    if (!donorName.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    Alert.alert(
      "Thank You!",
      `Your donation of $${amount} has been processed. A receipt will be sent to ${email}.`
    );
  };

  const AmountButton = ({ amount, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, marginHorizontal: 4 }}
    >
      <Box
        backgroundColor={isSelected ? "success" : "lightGrey"}
        borderRadius={6}
        padding="sm"
        alignItems="center"
        borderWidth={isSelected ? 0 : 1}
        borderColor="lightGrey"
      >
        <Text
          variant="medium14"
          color={isSelected ? "white" : "textTint"}
          fontWeight="600"
        >
          ${amount}
        </Text>
      </Box>
    </TouchableOpacity>
  );

  const PaymentMethod = ({ method, icon, label, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderRadius={6}
        padding="sm"
        marginBottom="sm"
        flexDirection="row"
        alignItems="center"
        borderWidth={isSelected ? 1 : 0}
        borderColor={isSelected ? "primary" : "lightGrey"}
      >
        <Box
          width={24}
          height={24}
          backgroundColor="textTint"
          borderRadius={4}
          marginRight="md"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize={12} fontWeight="bold">
            {icon}
          </Text>
        </Box>
        <Text variant="medium14" color={isSelected ? "primary" : "textTint"}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box
      paddingTop="xl"
      flex={1}
      backgroundColor="white"
      paddingHorizontal="sm"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignItems="center" marginBottom="xl">
          <Text variant="medium20" color="textTint" marginBottom="sm">
            Make a Donation
          </Text>
          <Text variant="medium14" color="textTint" textAlign="center">
            Your contribution helps us make a difference in the community
          </Text>
        </Box>
        <Box marginBottom="xl">
          <Text variant="medium14" color="textTint" marginBottom="md">
            Select Amount
          </Text>

          <Box flexDirection="row" marginBottom="md">
            {predefinedAmounts.map((amount) => (
              <AmountButton
                key={amount}
                amount={amount}
                isSelected={selectedAmount === amount}
                onPress={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
              />
            ))}
          </Box>
          <Box backgroundColor="white">
            <TextInput
              placeholder="Enter custom amount"
              value={customAmount}
              onChangeText={(text) => {
                setCustomAmount(text);
                setSelectedAmount(null);
              }}
              keyboardType="numeric"
              style={{
                ...(theme.textVariants.medium14 as TextStyle),
                fontSize: 16,
                color: "#000",
                borderWidth: 1,
                padding: 16,
                borderRadius: 6,
                borderColor: theme.colors.textTint,
              }}
              placeholderTextColor="#666"
            />
          </Box>
        </Box>
        <Box marginBottom="xl">
          <Text variant="medium14" color="textTint" marginBottom="md">
            Donor Information
          </Text>

          <Box backgroundColor="white" marginBottom="sm">
            <TextInput
              placeholder="Full Name"
              value={donorName}
              onChangeText={setDonorName}
              style={{
                ...(theme.textVariants.medium14 as TextStyle),
                fontSize: 16,
                color: "#000",
                borderWidth: 1,
                padding: 16,
                borderRadius: 6,
                borderColor: theme.colors.textTint,
              }}
              placeholderTextColor="#666"
            />
          </Box>

          <Box
            backgroundColor="white"
            borderRadius={6}
            borderWidth={1}
            borderColor="lightGrey"
            marginBottom="xs"
          >
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                ...(theme.textVariants.medium14 as TextStyle),
                fontSize: 16,
                color: "#000",
                borderWidth: 1,
                padding: 16,
                borderRadius: 6,
                borderColor: theme.colors.textTint,
              }}
              placeholderTextColor="#666"
            />
          </Box>
        </Box>
        <Box marginBottom="xs">
          <Text variant="medium14" color="textTint" marginBottom="md">
            Payment Method
          </Text>

          <PaymentMethod
            method="card"
            icon="💳"
            label="Credit/Debit Card"
            isSelected={selectedPayment === "card"}
            onPress={() => setSelectedPayment("card")}
          />

          <PaymentMethod
            method="paypal"
            icon="P"
            label="PayPal"
            isSelected={selectedPayment === "paypal"}
            onPress={() => setSelectedPayment("paypal")}
          />

          <PaymentMethod
            method="apple"
            icon="🍎"
            label="Apple Pay"
            isSelected={selectedPayment === "apple"}
            onPress={() => setSelectedPayment("apple")}
          />
        </Box>
        <Box
          backgroundColor="blockBg"
          borderRadius={6}
          padding="md"
          marginBottom="xl"
        >
          <Text variant="regular12" color="primary" textAlign="center">
            💡 Your donation is tax-deductible. You'll receive a receipt via
            email.
          </Text>
        </Box>
        <TouchableOpacity onPress={handleDonate}>
          <Box
            backgroundColor="primary"
            borderRadius={6}
            padding="md"
            alignItems="center"
            marginBottom="md"
          >
            <Text variant="medium14" color="white">
              Donate{" "}
              {selectedAmount || customAmount
                ? `$${selectedAmount || customAmount}`
                : ""}
            </Text>
          </Box>
        </TouchableOpacity>
        <Box alignItems="center" marginBottom="lg">
          <Text variant="regular12" color="textTint" textAlign="center">
            🔒 Your payment information is secure and encrypted
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DonateScreen;
