import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversactionsProvider";

export default function Conversavtions() {
  const { conversations ,selectConversationIndex} = useConversations();

  return (
    <ListGroup className="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index}
        action
        onClick={()=>{selectConversationIndex(index)}}
        active={conversation.selected}>
          {conversation.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
