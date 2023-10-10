import { Fragment } from 'react'
import classes from './styles.module.scss'
import classNames from 'classnames'

const homepage = () => {
	return (
		<Fragment>
			<section className={classes.intro}>
				<div className={classes.intro__imgs}>
					<div className={classes.img__box1}>
						<img src='/assets/images/download.jpg' alt='' />
					</div>
					<div className={classes.img__box2}>
						<img src='/assets/images/images1.jpg' alt='' />
					</div>
				</div>
				<div className={classes.intro__text}>
					<h2>
						Giới thiệu <br /> clb lập trình DEVER
					</h2>
					<p>
						<span>Câu lạc bộ Lập Trình DEVER</span> (Programming DEVER), tên viết tắt là DEVER được thành
						lập ngày 9/10/2011. Với phương châm hoạt động "Chia sẻ để cùng nhau phát triển", câu lạc bộ là
						nơi giao lưu, đào tạo các môn lập trình và các môn học trong trường, tạo điều kiện để sinh viên
						trong Học viện có môi trường học tập năng động sáng tạo
					</p>
					<p>Slogan: Lập Trình DEVER - Lập trình từ trái tim</p>
				</div>
			</section>
			<section className={classes.intro__video}>
				<h2>VIDEO GIỚI THIỆU</h2>
				<iframe
					width='860'
					height='488'
					src='https://www.youtube.com/embed/frsEJWz4Ii4?si=fov9meu8eQUrGgf9'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				></iframe>
			</section>
			<section className={classes.learning__roadmap}>
				<h2>LỘ TRÌNH HỌC TẬP TẠI CLB</h2>
				<div className={classes.boxes}>
					<div className={classNames(classes.box__type1, classes.box__type)}>
						<div className={classes.number}>01</div>
						<div className={classes.box__type__header}>
							<h3>training</h3>
							<img src='' alt='' />
						</div>
						<p>
							Trong quá trình training, các bạn sẽ được đào tạo và sử dụng thành thạo về ngôn ngữ C. Ngôn
							ngữ C là một ngôn ngữ phổ biến, cú pháp tường minh, dễ sử dụng đối với những người bắt đầu
							với lập trình. Và điều đặc biệt cho các DEVERER là ngôn ngữ C sẽ được học vào kỳ 2 năm nhất,
							cho nên bạn sẽ có lợi thế khi mà tham gia khoá training này.
						</p>
					</div>
					<div></div>
					<div className={classNames(classes.box__type2)}></div>
					<div className={classNames(classes.box__type)}>
						<div className={classes.number}>02</div>
						<div className={classes.box__type__header}>
							<h3>kì i năm nhất</h3>
							<img src='' alt='' />
						</div>
						<p>
							Ngôn ngữ C++ đóng một vai trò quan trọng trong việc học lập trình. Nắm bắt được tầm quan
							trọng đó Câu lạc bộ đã xây dựng lên khóa học Lập trình với C++ để cung cấp một lượng kiến
							thức về ngôn ngữ C++ nói riêng, và các khái niệm khác trong lập trình nói chung cho các
							thành viên trong CLB.
						</p>
					</div>
					<div className={classNames(classes.box__type1, classes.box__type)}>
						<div className={classes.number}>03</div>
						<div className={classes.box__type__header}>
							<h3>kì ii năm nhất</h3>
							<img src='' alt='' />
						</div>
						<p>
							Trong kì II năm nhất, các thành viên học thêm về cấu trúc dữ liệu và giải thuật. Khóa học
							kéo dài trong hai tháng bao gồm các vấn đề như: Sắp xếp và tìm kiếm, các phương pháp sinh,
							chia để trị, quy hoạch động, đồ thị,... sẽ trang bị cho thành viên Câu lạc bộ những kiến
							thức cơ bản và nâng cao trong bộ môn cấu trúc dữ liệu và giải thuật.
						</p>
					</div>
					<div></div>
					<div className={classNames(classes.box__type2)}></div>
					<div className={classNames(classes.box__type)}>
						<div className={classes.number}>04</div>
						<div className={classes.box__type__header}>
							<h3>kì i năm hai</h3>
							<img src='' alt='' />
						</div>
						<p>
							Trong vòng 1 tháng các thành viên sẽ được làm quen với lập trình hướng đối tượng sử dụng
							ngôn ngữ C++. Khóa học kết thúc bằng cuộc thi làm Game, trong cuộc thi này các thành viên sẽ
							vận dụng kiến thức mình tích luỹ được để làm project đầu tiên trong sự nghiệp làm lập trình
							viên của mình.
						</p>
					</div>
					<div className={classNames(classes.box__type1, classes.box__type)}>
						<div className={classes.number}>05</div>
						<div className={classes.box__type__header}>
							<h3>kì ii năm hai</h3>
							<img src='' alt='' />
						</div>
						<p>
							Khóa học kéo dài trong 1 tháng sẽ giúp mọi người có được tư duy lập trình hướng đối tượng.
							Bên cạnh đó mọi người còn học ngôn ngữ Java, một ngôn ngữ lập trình hướng đối tượng, để có
							thể tự viết cho mình một ứng dụng bằng Java đơn giản qua cuộc thi ProGAPP.
						</p>
					</div>
					<div></div>
					<div className={classNames(classes.box__type3)}></div>
					<div className={classNames(classes.box__type)}>
						<div className={classes.number}>06</div>
						<div className={classes.box__type__header}>
							<h3>team dự án</h3>
							<img src='' alt='' />
						</div>
						<p>
							Trong CLB, có các team dự án như: Team AI, Team Mobile, Team Web, Team Game,... Mỗi team dự
							án có một hướng phát triển và học tập riêng về mảng team hướng đến. Với phương châm "Chia sẻ
							để cùng nhau phát triển", team dự án sẽ luôn gắn bó cùng nhau ở cả hiện tại cũng như tương
							lai sau này.
						</p>
					</div>
				</div>
			</section>
			<section className={classes.prizes}>
				<h2>Giải thưởng</h2>
				<p>
					Qua từng năm, các thành viên đã cùng nhau mang về nhiều giải thưởng danh giá cho Phòng Truyền Thống
					của CLB.
				</p>
				<div>
					<img src='/assets/images/download.jpg' alt='' />
					<img src='/assets/images/images.jpg' alt='' />
					<img src='/assets/images/images1.jpg' alt='' />
				</div>
			</section>
			<section className={classes.project__types}>
				<h2>Team dự án</h2>
				<div>
					<div className={classes.project__box}>
						<div>
							<img src='/images/cards/ai.png' alt='' />
						</div>
						<p>AI</p>
					</div>
					<div className={classes.project__box}>
						<div>
							<img src='/images/cards/mobile.png' alt='' />
						</div>
						<p>Mobile</p>
					</div>
					<div className={classes.project__box}>
						<div>
							<img src='/images/cards/webIcon.jpeg' alt='' />
						</div>
						<p>Web</p>
					</div>
					<div className={classes.project__box}>
						<div>
							<img src='/images/cards/unity.jpeg' alt='' />
						</div>
						<p>Game</p>
					</div>
				</div>
			</section>
			<section className=''></section>
			<footer className=''></footer>
		</Fragment>
	)
}

export default homepage
