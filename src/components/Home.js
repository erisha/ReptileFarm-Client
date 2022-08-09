import ReptilesIndex from './reptiles/ReptilesIndex'	


const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props
	return (
		<>
			<h2>Welcome to the Reptile Farm !</h2>
			<ReptilesIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
