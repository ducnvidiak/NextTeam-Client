import { Fragment } from 'react'
import classes from './styles.module.scss'
import { VscTools } from 'react-icons/vsc'
import { RiDeleteBinLine } from 'react-icons/ri'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function ActivityProposals() {
	const [open, setOpen] = useState(false)

	function handleChange() {
		setOpen(true)
	}
	function handleClose(event) {
		event.preventDefault()
		setOpen(false)
	}

	function handleSubmit(event) {
		event.preventDefault()
		console.log('Submitted!')
	}

	function handleDelete() {}

	return (
		<Fragment>
			<h1>Các bản đề xuất kế hoạch, ý tưởng</h1>
			<div className={classes.box}>
				<button className={classes.btn__primary}>Add new proposal +</button>
				<div className={classes.box__list}>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>DEVER</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>Mục tiêu: Tạo một môi trường thú vị và thân thiện cho mọi người yêu thích âm nhạc.</p>
						</div>
						<div className={classes.box__list__item__footer}>
							<div className={classes.approved}>Approved</div>
							{/* <div className={classes.refused}>Refused</div>
							<div className={classes.pending}>Pending</div> */}
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>GDSC</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>
								Hoạt động: Tổ chức buổi biểu diễn, sự kiện âm nhạc, hội thảo và khám phá đa dạng các thể
								loại âm nhạc.
							</p>
						</div>
						<div className={classes.box__list__item__footer}>
							{/* <div className={classes.approved}>Approved</div> */}
							{/* <div className={classes.refused}>Refused</div> */}
							<div className={classes.pending}>Pending</div>
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>FRM</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>
								Cơ hội: Đem đến cơ hội cho các thành viên thể hiện tài năng, trình diễn và chia sẻ đam
								mê âm nhạc của mình.
							</p>
						</div>
						<div className={classes.box__list__item__footer}>
							<div className={classes.approved}>Approved</div>
							{/* <div className={classes.refused}>Refused</div>
							<div className={classes.pending}>Pending</div> */}
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>FTW</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>
								Hợp tác: Xây dựng mối quan hệ hợp tác với các nghệ sĩ, ban nhạc và những người đam mê âm
								nhạc khác.
							</p>
						</div>
						<div className={classes.box__list__item__footer}>
							{/* <div className={classes.approved}>Approved</div> */}
							<div className={classes.refused}>Refused</div>
							{/* <div className={classes.pending}>Pending</div> */}
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>GDSC</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>
								Học hỏi: Tổ chức các khóa học, buổi thảo luận và chia sẻ kiến thức về sáng tác, biểu
								diễn và công nghệ âm nhạc.
							</p>
						</div>
						<div className={classes.box__list__item__footer}>
							{/* <div className={classes.approved}>Approved</div> */}
							{/* <div className={classes.refused}>Refused</div> */}
							<div className={classes.pending}>Pending</div>
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
					<div className={classes.box__list__item}>
						<div className={classes.clubtag}>DEVER</div>
						<div className={classes.box__list__item__header}>
							<p className={classes.hashtag}>
								<span className={classes.hash}>#</span>id-12
							</p>
						</div>
						<div className={classes.box__list__item__content}>
							<h4>Đề xuất phương án</h4>
							<p>
								Tình nguyện: Tham gia vào các hoạt động tình nguyện liên quan đến âm nhạc, như tổ chức
								buổi biểu diễn tại trung tâm dưỡng lão hoặc trại trẻ mồ côi.
							</p>
						</div>
						<div className={classes.box__list__item__footer}>
							<div className={classes.approved}>Approved</div>
							{/* <div className={classes.refused}>Refused</div>
							<div className={classes.pending}>Pending</div> */}
							<div className={classes.tools}>
								<button className={classes.changeBtn} onClick={handleChange}>
									<VscTools />
								</button>
								<button className={classes.deleteBtn} onClick={handleDelete}>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<p className={classes.timemark}>Updated at: 2023-09-27</p>
					</div>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<div className={classes.modal}>
					<form>
						<div className={classes.editform__header}>
							<h2>Thêm đề xuất mới</h2>
						</div>
						<div className={classes.editform__main}>
							<div className={classes.form__control}>
								<label htmlFor='title'>Tiêu đề</label>
								<input type='text' name='title' id='title' />
							</div>
							<div className={classes.form__control}>
								<label htmlFor='content'>Nội dung</label>

								<textarea name='content' id='content' rows='10'></textarea>
							</div>
							<div className={classes.form__control}>
								<label htmlFor='sentTo'>Gửi tới</label>

								<select name='sendTo' id='sendTo'>
									<option value='dever'>DEVER</option>
									<option value='gdsc'>GDSC</option>
								</select>
							</div>
						</div>
						<div className={classes.editform__footer}>
							<button onClick={handleSubmit}>Lưu thay đổi</button>
							<button onClick={handleClose}>Bỏ thay đổi</button>
						</div>
					</form>
				</div>
			</Modal>
		</Fragment>
	)
}

export default ActivityProposals

// clubid, title, content, sendBy, isApproved
