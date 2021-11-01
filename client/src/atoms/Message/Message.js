import './Message.css';

export default function Message (props) {
  return (
    <div className="message">
        <span className="message__badge icon-ios-circle-filled"></span>
        <span className="message__from">{props.from}:</span>
        <span className="message__content">{props.message.content}</span>
    </div>
  );
}