// import Hero from "../../components/pages/home/Hero";
// import Category from "../../components/pages/home/Category";
import Hero from 'src/components/pages/home/Hero'
import styles from './style.module.scss'
import Categories from 'src/components/pages/home/Categories'

function Home() {
	const testAPI = async () => {
		try {
			// const res = await fetch('http://localhost:8080/javaweb_api_testing/EmployeeServlet', {
			//   method: 'GET', // or 'PUT'
			// })
			// console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	testAPI()

	return (
		<>
			<section className={styles['hero']}>
				<Hero></Hero>
				<Categories></Categories>
			</section>
		</>
	)
}

export default Home
