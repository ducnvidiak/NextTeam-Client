import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const extraActivities = [
	{
		original: '/assets/images/gallery/original/gallery1.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery1.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery2.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery2.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery3.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery3.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery4.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery4.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery5.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery5.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery6.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery6.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery7.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery7.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery8.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery8.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery9.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery9.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery10.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery10.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery11.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery11.webp'
	},
	{
		original: '/assets/images/gallery/original/gallery12.webp',
		thumbnail: '/assets/images/gallery/thumbnail/gallery12.webp'
	}
]

function Hero() {
	return (
		<>
			<ImageGallery lazyLoad={true} items={extraActivities}></ImageGallery>
		</>
	)
}

export default Hero
