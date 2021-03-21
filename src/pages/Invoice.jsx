import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QR from "../images/test-qr.png";
import monerojs from "../libs/monero";
import {
  Spin,
  Modal,
  List,
  Typography,
  Divider,
  Tooltip,
  Row,
  Col,
  Button,
  Switch,
} from "antd";
import { WalletOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Info = () => {
  const data = [
    <Text type="secondary">
      The Basic model will enable you to recieve XMR in livestreams. Great to
      get started.
    </Text>,
    <Text type="secondary">
      The Premium model allows full customization of your donations. Perfect for
      pros.
    </Text>,
  ];
  return (
    <div>
      <List
        size="small"
        header={<Title level={4}>Basic or Premium?</Title>}
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

const Payment = () => {
  const [yearly, setYearly] = useState(true);
  const [isPremium, setIsPremium] = useState(true);
  const [amount, setAmount] = useState(0);
  const [qrCode, setQrCode] = useState("");
  const [paymentUri, setPaymentUri] = useState(null);

  const handleInterval = () => {
    setYearly(!yearly);
  };
  const handleTier = () => {
    setIsPremium(!isPremium);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const [subaddress, setSubaddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  ); // will be props passed down

  // useEffect(() => {
  //   if (subaddress === null) {
  //     getSubaddress();
  //   }
  // }, [getSubaddress, subaddress]);

  const createPaymentUri = () => {
    let uri;
    if (amount > 0) {
      uri = "monero:" + subaddress + "?tx_amount=" + amount;
    } else {
      uri = "monero:" + subaddress;
    }
    setPaymentUri(uri);
    return uri;
  };

  // generete QR Code on subaddress change
  useEffect(() => {
    const paymentUri = createPaymentUri();
    const generateQrCode = async () => {
      if (subaddress !== null) {
        const qrcode = await monerojs.generateQrCode(paymentUri);
        setQrCode(qrcode);
      }
    };
    generateQrCode();
  }, [subaddress, createPaymentUri]);

  useEffect(() => {
    const basePrice = isPremium ? 0.09 : 0.009;
    const factor = yearly ? 11 : 1;
    setAmount(basePrice * factor);
  }, [yearly, isPremium]);

  return (
    <div>
      <Row justify="center" gutter={[0, 24]}>
        <Col span={24}>
          Configure your membership for TipXMR{" "}
          <Tooltip title={Info} placement="right">
            <InfoCircleOutlined />
          </Tooltip>
        </Col>
        <Col span={8}>
          <Text>One Month</Text>
        </Col>
        <Col span={6}>
          <Switch defaultChecked onChange={handleInterval} />
        </Col>
        <Col span={8}>
          <Text>One year</Text>
        </Col>
        <Col span={8}>
          <Text>Basic</Text>
        </Col>
        <Col span={6}>
          <Switch defaultChecked onChange={handleTier} />
        </Col>
        <Col span={8}>
          <Text>Premium</Text>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" align="middle">
        <Col span={24}>
          <img
            src={qrCode}
            alt="qr code"
            preview={false}
            style={{ margin: "0 auto" }}
          />
        </Col>
        <Col>
          <a href={paymentUri} onClick={handleClick}>
            <WalletOutlined /> Pay from desktop wallet
          </a>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" style={{ textAlign: "center" }}>
        <Col span={24}>
          <Title level={3}>Total: {amount} XMR</Title>
        </Col>
      </Row>
    </div>
  );
};

const InvoiceModal = () => {
  Modal.info({
    title: <Title level={2}>Invoice</Title>,
    content: <Payment />,
    okButtonProps: {
      disabled: true,
      icon: <Spin size="small" />,
      size: "large",
    },
    okText: "Awaiting Payment",
  });
};

const SuccessModal = () => {
  Modal.success({
    title: <Title level={2}>Thank you for using TipXMR</Title>,
    content: (
      <Row justify="center">
        <Col span={24}></Col>
      </Row>
    ),
  });
};

const Invoice = () => {
  const [isPayed, setIsPayed] = useState(false);
  return (
    <div className="flex flex-grow self-center justify-center">
      <Button onClick={InvoiceModal}>InvoiceModal</Button>
      <Button onClick={SuccessModal}>SuccessModal</Button>

      {/* <div className="bg-gray-200 text-xmrgray-darker rounded"> */}
      {/*   <div className="rounded border-4 border-dashed border-xmrorange p-10 m-6"> */}
      {/*     {isPayed ? <Success /> : <Payment />} */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

export default Invoice;

// TODO let the user choose between basic and premium
// TODO integrate the subaddress from a different wallet
// TODO confirmation on payment
// TODO continue button one payment is confirmed
// TODO integrate with backend (generate subaddress, confirm payment, confirm amount)
// TODO update the db to the new date
// TODO backend function to check if invoice is due on user login
// TODO create sockets for subaddress getting
const PaymentOld = () => {
  // TODO props needed: subaddress, getSubaddress
  const [yearly, setYearly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [isPremium, setIsPremium] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const basePrice = isPremium ? 0.09 : 0.009;
    const factor = yearly ? 11 : 1;
    setAmount(basePrice * factor);
  }, [monthly, yearly, isPremium]);

  const activateLeft = () => {
    setYearly(true);
    setMonthly(false);
  };

  const activateRight = () => {
    setYearly(false);
    setMonthly(true);
  };

  const handleToggle = () => {
    setIsPremium(!isPremium);
  };

  // payment handeling, work in progress
  // Hard Coded for testing
  const [subaddress, setSubaddress] = useState(
    "45ZoRheLkX2H3UjYSFs2wP9yo739nQ7irZA2pX6MQr5FeebkC2n8hABYGQRCcrzJ2AaGbNUyR4EfvanP1G2H5DSrMWi97Sk"
  ); // will be props passed down
  const [qrCode, setQrCode] = useState(QR);
  // const [paymentUri, setPaymentUri] = useState(null);

  // useEffect(() => {
  //   if (subaddress === null) {
  //     getSubaddress();
  //   }
  // }, [getSubaddress, subaddress]);

  // // generete QR Code on subaddress change
  // useEffect(() => {
  //   const paymentUri = createPaymentUri();
  //   async function generateQrCode() {
  //     if (subaddress !== null) {
  //       const qrcode = await monerojs.generateQrCode(paymentUri);
  //       setQrcode(qrcode);
  //     }
  //   }
  //   generateQrCode();
  // }, [subaddress, createPaymentUri]);

  // function handleClick(e) {
  //   e.stopPropagation();
  //   e.nativeEvent.stopImmediatePropagation();
  // }

  // function createPaymentUri() {
  //   let uri;
  //   if (total > 0) {
  //     uri = "monero:" + subaddress + "?tx_amount=" + total;
  //   } else {
  //     uri = "monero:" + subaddress;
  //   }
  //   setPaymentUri(uri);
  //   return uri;
  // }

  return (
    <div className="text-center">
      <h1 className="mt-6 text-4xl text-center">tipxmr invoice is due</h1>
      <p>
        To keep using tipxmr for 1 {yearly ? "year" : "month"}, send{" "}
        {amount.toFixed(4)} XMR to
      </p>
      <div className="flex justify-center mt-4">
        <Button active={yearly} onClick={activateLeft}>
          1 year
        </Button>
        <Button active={monthly} onClick={activateRight}>
          1 month
        </Button>
      </div>
      <div className="flex justify-center items-cente mt-3">
        <Toggle isChecked={isPremium} onClick={handleToggle} />
        <span className="mx-4 text-xmrgray-darker">Get Premium</span>
      </div>
      {/* <p className="tracking-tight text-sm"> */}
      {/*   One year will get you one month for free */}
      {/* </p> */}
      <div>
        <div className="flex justify-center my-6">
          <img src={qrCode} alt="QR Code" />
        </div>
        <p className="text-xs">{subaddress}</p>
      </div>
      <div className="mt-4 border-t-2 border-dotted border-xmrgray-darker">
        <p className="mt-2">
          If you have the funds, you can pay directly with your tipxmr wallet
        </p>
        <div className="mt-2 flex justify-center">
          <Button>Pay with tipxmr wallet</Button>
        </div>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div className="text-center text-xmrgray-darker">
      <h1 className="text-4xl">We got your payment!</h1>
      <h2 className="text-4xl">🤙✅🙏</h2>
      <h2 className="mt-4 text-2xl">Thank you for using our service!</h2>
      <div className="flex justify-center mt-6 pt-6 border-t-2 border-dashed border-xmrgray-darker">
        <Button>Continue to dashboard</Button>
      </div>
    </div>
  );
};
