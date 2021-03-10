import React, { FC } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import headerImage from '../../../assets/img/doc-award.png'

const EmailComplete: FC = () => {
	const history = useHistory()

	return (
		<div className="space-y-5">
			<Typography variant="h5">Thank You</Typography>
			<Grid container dir="row">
				<Grid item xs={4}>
					<img src={headerImage} />
				</Grid>
				<Grid item xs={8}>
					Your document has been emailed to you
				</Grid>
			</Grid>
			<Grid container justify="center">
				<Button
					variant="contained"
					size="large"
					color="secondary"
					onClick={() => {
						history.push('/preview')
					}}
				>
					Done
				</Button>
			</Grid>
		</div>
	)
}

export default EmailComplete