import {useContext, useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState';
import file from '../assets/file.png';
import directory from '../assets/folder.png';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	btn: {
		marginBottom: theme.spacing(2),
	},
	content: {
		display: 'flex',
	},
	file: {
		fontSize: theme.spacing(2.5),
		padding: theme.spacing(10),
		margin: 'auto',
	},
	directory: {
		cursor: 'pointer',
		padding: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '5px',
		'&:hover': {
			background: '#ececec',
			borderRadius: theme.spacing(0.5),
		},
	},
	img: {
		height: theme.spacing(10),
		width: theme.spacing(10),
	},
	title: {
		display: 'block',
	},
}));

const Content = () => {
	const classes = useStyles();

	const {
		content,
		location,
		addToLocation,
		getContent,
		popFromLocation,
	} = useContext(GlobalContext);

	useEffect(() => {
		getContent();
	}, [getContent]);

	return (
		<div>
			{location.length > 1 && (
				<Button
					variant='contained'
					onClick={() => popFromLocation()}
					className={classes.btn}>
					Back
				</Button>
			)}
			<div className={classes.content}>
				{content.length === 0 ? (
					<div className={classes.file}>{`THIS IS FILE: ${
						location[location.length - 1]
					}`}</div>
				) : (
					content.map((con, idx) => (
						<div
							key={idx}
							className={classes.directory}
							onClick={() => addToLocation(con.name)}>
							<img
								src={con.type === '&#34;dir&#34;' ? directory : file}
								alt={`${con.name}`}
								className={classes.img}
							/>
							<span className={classes.title}>{con.name}</span>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Content;
