import * as Yup from "yup";

export const EventCreatorSchema = Yup.object().shape({
    name: Yup.string()
    .required("Vui lòng nhập tên sự kiện"),
    description: Yup.string()
    .required("Vui lòng nhập mô tả cho sự kiện"),
    startTime: Yup.string()
    .required("Vui lòng điền đầy đủ ngày giờ tổ chức"),
    endTime: Yup.string()
    .required("Vui lòng điền đầy đủ ngày giờ tổ chức"),
    type: Yup.string()
    .required("Vui lòng chọn loại hình tổ chức"),
    bannerUrl: Yup.string()
    .required("Vui lòng tải lên ảnh bìa cho sự kiện"),
    
    // planUrl: Yup.string()
    // .required("Vui lòng tải lên tệp kế hoạch sự kiện"),
    locationId: Yup.string()
    .required("Vui lòng chọn địa điểm tổ chức"),
});