import QRCodeStyling from 'qr-code-styling'

export function createQrCode() {
	let qrCode
	if (typeof window !== 'undefined')
		qrCode = new QRCodeStyling({
			width: 300,
			height: 300,
			image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
			dotsOptions: {
				color: '#4267b2',
				type: 'rounded'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			}
		})

	return qrCode
}
