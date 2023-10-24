import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'
import StadiumIcon from '@mui/icons-material/Stadium'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import { Stack, Typography } from '@mui/material'

function ClubCategory({ categoryId }) {
	return (
		<>
			<Stack direction={'row'} gap={2}>
				{categoryId == '1' ? (
					<>
						<AutoStoriesIcon></AutoStoriesIcon>
						<Typography variant='body1'>Học thuật</Typography>
					</>
				) : categoryId == '2' ? (
					<>
						<StadiumIcon></StadiumIcon>
						<Typography variant='body1'>Tài Nẵng</Typography>
					</>
				) : categoryId == '3' ? (
					<>
						<StadiumIcon></StadiumIcon>
						<Typography variant='body1'>Thể thao</Typography>
					</>
				) : (
					<>
						<Diversity2Icon></Diversity2Icon>
						<Typography variant='body1'>Cộng đồng</Typography>
					</>
				)}
			</Stack>
		</>
	)
}

export default ClubCategory
