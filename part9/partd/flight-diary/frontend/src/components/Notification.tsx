interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
