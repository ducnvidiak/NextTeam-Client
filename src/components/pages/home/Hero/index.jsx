import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const extraActivities = [
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451197/ynwn19fbfellx5un72vu.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451197/ynwn19fbfellx5un72vu.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451288/xqbljaqlnlfxrljtjcdf.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451288/xqbljaqlnlfxrljtjcdf.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451336/pigmetrzwskayo1tl5dq.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451336/pigmetrzwskayo1tl5dq.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451405/i7tuwytgngctkgrtjfuz.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451405/i7tuwytgngctkgrtjfuz.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451437/w0dx9yvrnm8qi94tvd0p.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451437/w0dx9yvrnm8qi94tvd0p.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451471/a0vff4kfmnu4hytw3hul.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451471/a0vff4kfmnu4hytw3hul.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451498/kfzgi08s3lhfws1gknga.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451498/kfzgi08s3lhfws1gknga.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451537/kt4xjel2bupgozwyoxnq.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451537/kt4xjel2bupgozwyoxnq.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451575/s3xq08k1wopx3fcpv4d7.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451575/s3xq08k1wopx3fcpv4d7.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451604/hfvkefyklrh7woxufqc5.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694451604/hfvkefyklrh7woxufqc5.png",
  },
  {
    original:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694490524/ldegnymgffx6v6nxngbx.png",
    thumbnail:
      "http://res.cloudinary.com/de41uvd76/image/upload/v1694490524/ldegnymgffx6v6nxngbx.png",
  },
];

function Hero() {
  return (
    <>
      <ImageGallery lazyLoad={true} items={extraActivities}></ImageGallery>
    </>
  );
}

export default Hero;
