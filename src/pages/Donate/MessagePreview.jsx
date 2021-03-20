import { Col, Card, Typography, Divider } from "antd";

const { Title } = Typography;

const MessagePreview = ({ message, donor, total }) => {
  return (
    <Col span={24} className="text-left gutter-row">
      <Divider />
      <Title level={2} className="text-center">
        Preview:{" "}
      </Title>
      <Card
        title={
          <span>
            <Title level={4} style={{ display: "inline" }}>
              {donor}
            </Title>{" "}
            tipped
          </span>
        }
        extra={<Title level={4}>{total} XMR</Title>}
      >
        <Title level={5} className="text-center">
          {message}
        </Title>
      </Card>
    </Col>
  );
};

export default MessagePreview;
