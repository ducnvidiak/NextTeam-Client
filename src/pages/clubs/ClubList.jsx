import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Groups2Icon from '@mui/icons-material/Groups2'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'
import StadiumIcon from '@mui/icons-material/Stadium'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import CakeIcon from '@mui/icons-material/Cake'
import Link from 'next/link'

function ClubItem() {
 

  return (
    <Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
      <Stack direction={'column'} width={'5%'}>
        <Typography variant='h5'>1.</Typography>
      </Stack>
      <Card sx={{ width: '95%', display: 'flex' }} marginBottom={10}>
        <img
          src='http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png'
          alt=''
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'cover'
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant='h7' sx={{ opacity: 0.7 }}>
            FU-DEVER
          </Typography>
          <Typography variant='h5' fontWeight={700} sx={{}}>
            CÂU LẠC BỘ LẬP TRÌNH
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, marginBottom: 4 }}>
            <AutoStoriesIcon></AutoStoriesIcon>
            <Typography variant='body1'>Học thuật</Typography>
          </Box>
          <Typography variant='body1' sx={{ flex: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat architecto ducimus soluta veritatis
            molestias praesentium aperiam non nihil, voluptas fugit iste quo quidem corrupti sunt eius. Quaerat nulla
            maxime facilis?
          </Typography>
          <Stack direction={'row'} gap={12}>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Groups2Icon></Groups2Icon>
              <Typography variant='body1'>23 thành viên</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <CakeIcon></CakeIcon>
              <Typography variant='body1'>23/10/2018</Typography>
            </Box>
          </Stack>

          <Stack direction={'row'} gap={4}>
            <Link href={`http://localhost:3000/clubs/${"fu-dever"}`} passHref>
              <Button variant='contained' sx={{ marginTop: 4, width: '50%' }}>
                Xem chi tiết
              </Button>
            </Link>
            <Button variant='outlined' sx={{ marginTop: 4, width: '50%' }}>
              Đăng ký tham gia
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

function ClubList() {
  return (
    <>
      <Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((event, index) => (
          <ClubItem key={index}></ClubItem>
        ))}
      </Container>
    </>
  )
}

export default ClubList
