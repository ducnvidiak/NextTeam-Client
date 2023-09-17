import styles from './style.module.scss'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'
import StadiumIcon from '@mui/icons-material/Stadium'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import { Box, Card, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'

const categories = [
  {
    icon: <AutoStoriesIcon fontSize='large'></AutoStoriesIcon>,
    category: 'Học thuật'
  },
  {
    icon: <SportsMartialArtsIcon fontSize='large'></SportsMartialArtsIcon>,
    category: 'Thể thao'
  },
  {
    icon: <StadiumIcon fontSize='large'></StadiumIcon>,
    category: 'Tài năng'
  },
  {
    icon: <Diversity2Icon fontSize='large'></Diversity2Icon>,
    category: 'Cộng đồng'
  }
]

function Categories() {
  return (
    <>
      <section className={styles["category"]}>
        <div className="container">
          <h3>MUÔN VÀN CÂU LẠC BỘ</h3>
          <ul>
            {categories.map((item, index) => (
              <li key={index}>
                {
                  item.icon
                }
                <p>{item.category}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
    </>
  )
}

export default Categories
