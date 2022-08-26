import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const SnackForm = (props) => {
  const { snack, handleChange, handleSubmit, heading } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          placeholder="What is the snack's name?"
          name="name"
          id="name"
          value={snack.name}
          onChange={handleChange}
        />
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control
          placeholder="What kind of snack is this?"
          name="description"
          id="description"
          value={snack.description}
          onChange={handleChange}
        />
        <Form.Check
          label="Is it squeaky?"
          name="isSqueaky"
          defaultChecked={snack.isSqueaky}
          onChange={handleChange}
        />
        <Form.Select
          aria-label="snack condition"
          name="condition"
          defaultValue={snack.condition}
          onChange={handleChange}
        >
          <option>Open this select menu</option>
          <option value="new">new</option>
          <option value="used">used</option>
          <option value="disgusting">disgusting</option>
        </Form.Select>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default SnackForm;
