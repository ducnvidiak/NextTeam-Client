import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'

const createData = (index, avatar, name, point) => {
  return { index, avatar, name, point }
}

const rows = [
  createData(
    1,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  ),
  createData(
    2,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  ),
  createData(
    3,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  ),
  createData(
    4,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  ),
  createData(
    5,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  ),
  createData(
    6,
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5',
    'Câu lạc bộ lập trình',
    892
  )
]

function Ranking() {
  return (
    <>
      <Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
        <Stack marginBottom={8}>
          <Typography variant='h5' textAlign={'center'} marginY={2}>
            TOP 5 CÂU LẠC BỘ XUẤT SẮC
          </Typography>
          <Stack direction={'row'} gap={4}>
            {[0, 1, 2, 3, 4].map((clb, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  paddingTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid transparent',
                  '&:hover': {
                    border: '1px solid #ddd'
                  }
                }}
              >
                <img
                  src='https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273767560_1006324376624523_56798993667723437_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_Im1ev6PhHYAX9x7w7T&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCDEoFgPf2BKMdUyx79UR_cyjtNmIlTU1EkxIgQHegQKA&oe=650F1AD5'
                  alt=''
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                ></img>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h5' fontWeight={700} textAlign={'center'}>
                    FU-DEVER
                  </Typography>
                  <Typography variant='h7' textAlign={'center'}>
                    892 Điểm
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
        <TableContainer component={Paper} sx={{ width: 800, marginX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' width={'120px'}>
                  Xếp hạng
                </TableCell>
                <TableCell align='center' width={'60px'}></TableCell>
                <TableCell align='left'>Tên câu lạc bộ</TableCell>
                <TableCell align='center' width={'150px'}>
                  Điểm hoạt động
                </TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 
                  <TableCell align='center'>{row.index}</TableCell>
                  <TableCell align='left'>
                    <img src={row.avatar} alt='' style={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='center'>{row.point}</TableCell>
                  <TableCell align='center'>
                    <Link passHref href='/clubs/ffr32r'>
                      <Button variant='outlined' sx={{ display: 'flex', alignItems: 'center', marginX: 'auto' }}>
                        <Typography variant='body1'>Truy cập</Typography>
                        <NavigateNextIcon></NavigateNextIcon>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Ranking
