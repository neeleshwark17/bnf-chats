import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversavtions from "./Conversavtions";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>
              <strong>Conversations</strong>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>
              <strong>Contacts</strong>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="
        square border-end
        overflow-auto
         flex-grow-1"
        >
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversavtions />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <div className="p-2 square border-top square border-end">
        <span className="mr-4">
          <b>ID:-</b>
          {id}
        </span>
        <Button className="btn btn-dark m-2 " onClick={logOut}>
          LogOut
        </Button>
      </div>

      <Button onClick={() => setModalOpen(true)} className="rounded-0">
        New {conversationsOpen ? "Conversation" : "Contact"}
      </Button>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
