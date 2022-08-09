import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const ReptileForm = (props) => {
    const { reptile, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is your reptile's name?"
                    name="name"
                    id="name"
                    value={ reptile.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="What kind of reptile is this?"
                    name="type"
                    id="type"
                    value={ reptile.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="color">Age</Form.Label>
                <Form.Control
                    placeholder="What color is your reptile?"
                    type="color"
                    name="color"
                    id="color"
                    value={ reptile.age }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this reptile beginner friendly?"
                    name="begginerFriendly"
                    defaultChecked={ reptile.begginerFriendly  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ReptileForm