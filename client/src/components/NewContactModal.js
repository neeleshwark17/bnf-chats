import { Modal, Form, Button } from "react-bootstrap";
import React, { useRef } from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" ref={idRef} required />
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Button type="sumbit">Create</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </>
  );
}
